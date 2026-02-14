import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const COOKIE_NAME = process.env.COOKIE_NAME || "fintrack_auth";

async function getUser(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (e) {
        return null;
    }
}

export async function GET(req: NextRequest) {
    const user = await getUser(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await db.execute({
            sql: "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC",
            args: [user.userId],
        });

        return NextResponse.json({ data: result.rows });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const user = await getUser(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { amount, description, recipientEmail } = await req.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // basic transaction logic
        // 1. Check balance
        const balanceResult = await db.execute({
            sql: "SELECT balance FROM users WHERE id = ?",
            args: [user.userId]
        });

        const currentBalance = balanceResult.rows[0].balance as number;

        if (currentBalance < amount) {
            return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
        }

        // 2. Deduct from sender
        await db.execute({
            sql: "UPDATE users SET balance = balance - ? WHERE id = ?",
            args: [amount, user.userId]
        });

        // 3. Record transaction for sender
        await db.execute({
            sql: "INSERT INTO transactions (id, user_id, amount, type, description, category, status) VALUES (?, ?, ?, 'debit', ?, 'Transfer', 'completed')",
            args: ["tx_" + Math.random().toString(36).substr(2, 9), user.userId, -amount, description || `Transfer to ${recipientEmail}`]
        });

        // 4. If recipient exists and is local, credit them
        if (recipientEmail) {
            const recipientResult = await db.execute({
                sql: "SELECT id FROM users WHERE email = ?",
                args: [recipientEmail]
            });

            if (recipientResult.rows.length > 0) {
                const recipientId = recipientResult.rows[0].id;
                await db.execute({
                    sql: "UPDATE users SET balance = balance + ? WHERE id = ?",
                    args: [amount, recipientId]
                });

                await db.execute({
                    sql: "INSERT INTO transactions (id, user_id, amount, type, description, category, status) VALUES (?, ?, ?, 'credit', ?, 'Transfer', 'completed')",
                    args: ["tx_" + Math.random().toString(36).substr(2, 9), recipientId, amount, `Received from ${user.email}`]
                });
            }
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Transaction error:", error);
        return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
    }
}
