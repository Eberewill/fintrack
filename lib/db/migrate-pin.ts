import { db } from "./client";

async function addPinColumn() {
    try {
        await db.execute("ALTER TABLE users ADD COLUMN transaction_pin TEXT");
        console.log("Added transaction_pin column.");
    } catch (error) {
        console.log("Column might already exist or error:", error);
    }
}

addPinColumn();
