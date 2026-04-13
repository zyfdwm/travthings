import { notion } from "../lib/notion";

async function testConnection() {
    try {
        console.log("Testing connection...");
        const response = await notion.databases.retrieve({
            database_id: process.env.NOTION_BLOG_DB_ID!
        });
        
        // Typeguard to ensure response isn't partial
        if ('title' in response) {
            console.log("Connection successful! Database Title:", response.title[0]?.plain_text);
        } else {
            console.log("Connection successful, but database details are partial.");
        }
    } catch (error: any) {
        console.error("Connection failed!");
        console.error("Error Code:", error?.code);
        console.error("Error Message:", error?.message);
    }
}

testConnection();
