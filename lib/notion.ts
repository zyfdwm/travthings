import { Client } from "@notionhq/client";
import { optimizeImageUrl } from "./utils";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    date: string;
    author: string;
    description: string;
    cover: string;
    category: string;
    tags: string[];
    status: string;
    isFeatured: boolean;
}

export interface DestinationItem {
    id: string;
    title: string;
    location: string;
    category: string;
    badge?: string;
    duration: string;
    activityType: string;
    price: string;
    description: string;
    image: string;
    url: string;
}

function getFileUrl(prop: any) {
    if (!prop) return undefined;
    
    // 1. If it's a simple URL property
    if (prop.type === "url" && prop.url) return prop.url;
    
    // 2. If it's a Files & Media property
    if (prop.type === "files" && prop.files && prop.files.length > 0) {
        const file = prop.files[0];
        return file.external?.url || file.file?.url;
    }

    // 3. Fallback: If it's a Rich Text property containing a URL
    if (prop.type === "rich_text" && prop.rich_text?.[0]) {
        const text = prop.rich_text[0].plain_text;
        if (text && (text.startsWith("http://") || text.startsWith("https://"))) {
            return text.trim();
        }
    }
    
    return undefined;
}

function transformPost(page: any): BlogPost {
    const props = page.properties;
    
    const getText = (prop: any) => {
        if (!prop) return "";
        return prop.rich_text?.[0]?.plain_text || prop.title?.[0]?.plain_text || "";
    };

    const getSelect = (prop: any) => prop?.select?.name || "";
    const getMultiSelect = (prop: any) => prop?.multi_select?.map((s: any) => s.name) || [];

    // Robust cover lookup
    const rawCover = getFileUrl(props.Cover) || 
                     getFileUrl(props.cover) || 
                     page.cover?.external?.url || 
                     page.cover?.file?.url || 
                     "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop";

    return {
        id: page.id,
        title: getText(props.Title),
        slug: getText(props.Slug),
        date: props.Date?.date?.start || page.created_time,
        author: getSelect(props.Author) || "Anonymous",
        description: getText(props.Description),
        cover: rawCover,
        category: getSelect(props.Category),
        tags: getMultiSelect(props.Tags),
        status: getSelect(props.Status),
        isFeatured: props.Featured?.checkbox || false,
    };
}

function transformDestination(page: any): DestinationItem {
    const props = page.properties;
    
    const getText = (prop: any) => {
        if (!prop) return "";
        return prop.rich_text?.[0]?.plain_text || prop.title?.[0]?.plain_text || "";
    };

    const getSelect = (prop: any) => prop?.select?.name || "";
    const getMultiSelect = (prop: any) => prop?.multi_select?.map((s: any) => s.name) || [];
    const getNumber = (prop: any) => {
        if (!prop || prop.number === null || prop.number === undefined) return 0;
        return prop.number;
    };

    const categoryName = getSelect(props.Category);
    
    // Robust image lookup (Image, Cover, Thumbnail, etc)
    const rawImage = getFileUrl(props.Image) || 
                     getFileUrl(props.image) || 
                     getFileUrl(props.Cover) || 
                     getFileUrl(props.cover) || 
                     getFileUrl(props.Thumbnail) || 
                     getFileUrl(props.thumbnail) || 
                     getFileUrl(props.Hero) || 
                     getFileUrl(props.hero) || 
                     page.cover?.external?.url || 
                     page.cover?.file?.url || 
                     "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop";

    const priceValue = getNumber(props.Price);

    return {
        id: page.id,
        title: getText(props.Title),
        location: getMultiSelect(props.Location).join(", ") || categoryName,
        category: categoryName || "Uncategorized",
        badge: categoryName?.toUpperCase(),
        duration: "", // Optional, as requested to remove
        activityType: "", // Optional
        price: priceValue ? priceValue.toFixed(2) : "",
        description: getText(props.Description),
        image: rawImage,
        url: props.URL?.url || props.Url?.url || props.url?.url || "#",
    };
}

export async function getBlogPosts() {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_BLOG_DB_ID!,
            filter: {
                property: "Status",
                select: {
                    equals: "Published"
                }
            },
            sorts: [{ property: "Date", direction: "descending" }],
        });
        
        return response.results.map(transformPost);
    } catch (error) {
        console.error("Error fetching blog posts from Notion:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_BLOG_DB_ID!,
            filter: {
                property: "Slug",
                rich_text: {
                    equals: slug,
                },
            },
        });

        if (response.results.length === 0) return null;
        return transformPost(response.results[0]);
    } catch (error) {
        console.error(`Error fetching post by slug (${slug}):`, error);
        return null;
    }
}

export async function getPageBlocks(pageId: string) {
    try {
        const blocks: any[] = [];
        let cursor: string | undefined = undefined;

        while (true) {
            const { results, next_cursor }: any = await notion.blocks.children.list({
                block_id: pageId,
                start_cursor: cursor,
            });
            blocks.push(...results);
            if (!next_cursor) break;
            cursor = next_cursor;
        }

        // Fetch children for tables and toggles
        const childRequests = blocks.map(async (block) => {
            if (block.has_children && (block.type === "table" || block.type === "toggle")) {
                block[block.type].children = await getPageBlocks(block.id);
            }
        });
        await Promise.all(childRequests);

        return blocks;
    } catch (error) {
        console.error(`Error fetching page blocks (${pageId}):`, error);
        return [];
    }
}

export async function getMoreInsightPosts(excludeId: string, limit: number = 3) {
    const allPosts = await getBlogPosts();
    const otherPosts = allPosts.filter(post => post.id !== excludeId);
    
    // Shuffle and pick
    return otherPosts
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);
}

export async function getDestinations() {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DESTINATIONS_DB_ID!,
            filter: {
                property: "Status",
                select: { equals: "Published" },
            },
        });

        return response.results.map(page => transformDestination(page));
    } catch (error) {
        console.error("Error fetching destinations from Notion:", error);
        return [];
    }
}