import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

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

export async function POST(req: NextRequest) {
    const user = await getUser(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { pin } = await req.json();

        if (!pin || pin.length < 4) {
            return NextResponse.json(
                { error: "PIN must be at least 4 characters" },
                { status: 400 }
            );
        }

        // Hash the PIN for security (treat it like a password)
        const pinHash = await bcrypt.hash(pin, 10);

        await db.execute({
            sql: "UPDATE users SET transaction_pin = ? WHERE id = ?",
            args: [pinHash, user.userId],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Set PIN error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
