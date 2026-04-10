const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = "33ed2a6ece7380c8af63fff4d4374dd4";

async function exploreDB() {
    try {
        const response = await notion.databases.retrieve({ database_id: databaseId });
        console.log("Database Properties:");
        console.log(JSON.stringify(response.properties, null, 2));
    } catch (error) {
        console.error("Error retrieving database:", error.message);
    }
}

exploreDB();
