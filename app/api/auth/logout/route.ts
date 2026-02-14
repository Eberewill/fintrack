import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

const COOKIE_NAME = process.env.COOKIE_NAME || "fintrack_auth";

export async function POST(req: NextRequest) {
    const serializedCookie = serialize(COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", serializedCookie);
    return response;
}
