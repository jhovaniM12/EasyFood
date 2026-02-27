import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

export async function GET(request: NextRequest) {
    const auth = getAuthUser(request);
    if ("error" in auth) return auth.error;

    try {
        const rows = await sql`
      SELECT
        id_categoria AS id,
        nombre
      FROM public.categorias
      ORDER BY id_categoria
    `;

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("[GET /api/categories]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
