import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAdminUser } from "@/lib/adminMiddleware";

/**
 * GET /api/admin/profile
 * Returns the authenticated admin/collaborator profile with their restaurant info.
 */
export async function GET(request: NextRequest) {
    const auth = getAdminUser(request);
    if ("error" in auth) return auth.error;

    const { user } = auth;

    try {
        const rows = await sql`
      SELECT
        u.id_usuario        AS "userId",
        u.nombre,
        u.codigo_institucional AS "codigoInstitucional",
        u.correo,
        u.foto_url          AS "fotoUrl",
        u.rol,
        r.id_restaurante    AS "restauranteId",
        r.nombre            AS "restauranteNombre",
        r.ubicacion         AS "restauranteUbicacion"
      FROM public.usuarios u
      LEFT JOIN public.restaurantes r ON r.id_restaurante = u.id_restaurante
      WHERE u.id_usuario = ${user.userId}
    `;

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "NotFound", message: "Usuario no encontrado." },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: rows[0] }, { status: 200 });
    } catch (error) {
        console.error("[GET /api/admin/profile]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
