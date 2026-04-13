import { notion } from "../lib/notion";

async function testConnection() {
    try {
        console.log("Testing connection...");
        const response = await notion.databases.retrieve({
            database_id: process.env.NOTION_BLOG_DB_ID!
        });
        console.log("Connection successful! Database Title:", response.title[0]?.plain_text);
    } catch (error: any) {
        console.error("Connection failed!");
        console.error("Error Code:", error?.code);
        console.error("Error Message:", error?.message);
    }
}

testConnection();
