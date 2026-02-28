import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

export async function GET(request: NextRequest) {
    const auth = getAuthUser(request);
    if ("error" in auth) return auth.error;

    try {
        const rows = await sql`
      SELECT
        id_usuario    AS id,
        nombre,
        codigo_institucional AS "codigoInstitucional",
        carrera       AS "programaAcademico",
        foto_url      AS "fotoPerfilUrl"
      FROM public.usuarios
      WHERE id_usuario = ${auth.user.userId}
      LIMIT 1
    `;

        if (!rows[0]) {
            return NextResponse.json(
                { error: "NotFound", message: "Usuario no encontrado" },
                { status: 404 }
            );
        }
        const user = rows[0];
        return NextResponse.json({
            nombre: user.nombre,
            codigoInstitucional: user.codigoInstitucional,
            programaAcademico: user.programaAcademico,
            fotoPerfilUrl: user.fotoPerfilUrl
        }, { status: 200 });
    } catch (error) {
        console.error("[GET /api/me]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
