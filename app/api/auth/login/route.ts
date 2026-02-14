import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const COOKIE_NAME = process.env.COOKIE_NAME || "fintrack_auth";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const result = await db.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: [email],
        });

        const user = result.rows[0];

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash as string
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Create cookie
        const serializedCookie = serialize(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        const response = NextResponse.json({
            data: {
                token, // Optional: return token if client needs it for Authorization header
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            },
        });

        response.headers.set("Set-Cookie", serializedCookie);

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
