import { db } from "./client";

async function checkUser() {
    try {
        const result = await db.execute("SELECT * FROM users");
        console.log("Users in DB:", result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

checkUser();
