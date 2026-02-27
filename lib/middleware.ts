import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JwtPayload } from "./auth";

/**
 * Extracts and verifies the Bearer token from the Authorization header.
 * Returns the decoded payload on success, or a 401 NextResponse on failure.
 */
export function getAuthUser(
    request: NextRequest
): { user: JwtPayload } | { error: NextResponse } {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
            error: NextResponse.json(
                { error: "Unauthorized", message: "Missing or malformed Authorization header" },
                { status: 401 }
            ),
        };
    }

    const token = authHeader.slice(7); // Remove "Bearer " prefix

    try {
        const user = verifyToken(token);
        return { user };
    } catch {
        return {
            error: NextResponse.json(
                { error: "Unauthorized", message: "Invalid or expired token" },
                { status: 401 }
            ),
        };
    }
}
