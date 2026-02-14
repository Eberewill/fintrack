import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const COOKIE_NAME = process.env.COOKIE_NAME || "fintrack_auth";

export async function GET(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME)?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (e) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const result = await db.execute({
            sql: "SELECT id, email, name, balance, created_at FROM users WHERE id = ?",
            args: [decoded.userId],
        });

        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            data: {
                ...user,
                has_pin: !!user.transaction_pin,
                transaction_pin: undefined // Ensure we don't leak the hash/pin
            },
        });
    } catch (error) {
        console.error("Profile error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
