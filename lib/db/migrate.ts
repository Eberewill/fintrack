import { db } from "./client";
import fs from "fs";
import path from "path";

async function migrate() {
    try {
        const schemaPath = path.join(process.cwd(), "lib/db/schema.sql");
        const schema = fs.readFileSync(schemaPath, "utf-8");

        // Split by semicolon to execute multiple statements
        const statements = schema
            .split(";")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        for (const statement of statements) {
            await db.execute(statement);
        }

        console.log("Migration completed successfully.");
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

migrate();
