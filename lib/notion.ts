import { Client } from "@notionhq/client";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export async function getBlogPosts() {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_BLOG_DB_ID!,
        filter: {
            property: "Status",
            select: { equals: "Published" },
        },
        sorts: [{ property: "Date", direction: "descending" }],
    });
    return response.results;
}

export async function getDestinations() {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DESTINATIONS_DB_ID!,
        filter: {
            property: "Status",
            select: { equals: "Published" },
        },
    });
    return response.results;
}