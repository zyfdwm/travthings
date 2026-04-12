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

function transformPost(page: any): BlogPost {
    const props = page.properties;
    
    const getText = (prop: any) => {
        if (!prop) return "";
        return prop.rich_text?.[0]?.plain_text || prop.title?.[0]?.plain_text || "";
    };

    const getSelect = (prop: any) => prop?.select?.name || "";
    const getMultiSelect = (prop: any) => prop?.multi_select?.map((s: any) => s.name) || [];

    const rawCover = props.Cover?.url || page.cover?.external?.url || page.cover?.file?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop";

    return {
        id: page.id,
        title: getText(props.Title),
        slug: getText(props.Slug),
        date: props.Date?.date?.start || page.created_time,
        author: getSelect(props.Author) || "Anonymous",
        description: getText(props.Description),
        cover: optimizeImageUrl(rawCover, 1200),
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
    const getUrl = (prop: any) => prop?.url || "";

    const categoryName = getSelect(props.Category);
    const rawImage = getUrl(props.Image) || page.cover?.external?.url || page.cover?.file?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop";

    return {
        id: page.id,
        title: getText(props.Title),
        location: getMultiSelect(props.Location).join(", ") || categoryName,
        category: categoryName || "Uncategorized",
        badge: categoryName?.toUpperCase(),
        duration: "", // Optional, as requested to remove
        activityType: "", // Optional
        price: getText(props.Price),
        description: getText(props.Description),
        image: optimizeImageUrl(rawImage, 1200),
        url: getUrl(props.URL) || "#",
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
}

export async function getPageBlocks(pageId: string) {
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