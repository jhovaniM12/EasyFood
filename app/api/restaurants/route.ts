import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

export async function GET(request: NextRequest) {
    const auth = getAuthUser(request);
    if ("error" in auth) return auth.error;

    try {
        const rows = await sql`
      SELECT
        id_restaurante AS id,
        nombre,
        ubicacion,
        imagen_url     AS "imagenUrl"
      FROM public.restaurantes
      ORDER BY id_restaurante
    `;

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("[GET /api/restaurants]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
