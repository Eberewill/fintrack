import { db } from "./client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@fintra.com";
        const password = "Password123!"; // Default password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = "user_" + Math.random().toString(36).substr(2, 9);

        // Check if user exists
        const existingResult = await db.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: [adminEmail]
        });

        if (existingResult.rows.length > 0) {
            console.log("Admin user already exists.");

            // Update balance for demo purposes
            await db.execute({
                sql: "UPDATE users SET balance = 125400.50 WHERE email = ?",
                args: [adminEmail]
            });
            console.log("Updated admin balance.");
            return;
        }

        await db.execute({
            sql: "INSERT INTO users (id, email, password_hash, name, balance) VALUES (?, ?, ?, ?, ?)",
            args: [userId, adminEmail, hashedPassword, "Admin User", 125400.50],
        });

        console.log(`Seeded admin user: ${adminEmail} / ${password}`);

        // Add some mock transactions
        const transactions = [
            { amount: -150.00, type: 'debit', description: 'Amazon', category: 'Shopping' },
            { amount: 3500.00, type: 'credit', description: 'Paystack Salary', category: 'Income' },
            { amount: -45.50, type: 'debit', description: 'Uber', category: 'Transport' },
        ];

        for (const tx of transactions) {
            await db.execute({
                sql: "INSERT INTO transactions (id, user_id, amount, type, description, category) VALUES (?, ?, ?, ?, ?, ?)",
                args: ["tx_" + Math.random().toString(36).substr(2, 9), userId, tx.amount, tx.type, tx.description, tx.category]
            });
        }
        console.log("Seeded transactions.");

    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
}

seed();
