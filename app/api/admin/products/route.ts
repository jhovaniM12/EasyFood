import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAdminUser } from "@/lib/adminMiddleware";

/**
 * GET /api/admin/products
 * Returns all products belonging to the admin's restaurant.
 * Admin users (without restaurant) see ALL products.
 */
export async function GET(request: NextRequest) {
    const auth = getAdminUser(request);
    if ("error" in auth) return auth.error;

    const { user } = auth;

    try {
        const rows = await sql`
      SELECT
        p.id_producto        AS id,
        p.nombre,
        p.descripcion,
        p.precio::text       AS precio,
        p.tiempo_espera      AS "tiempoEspera",
        p.imagen_url         AS "imagenUrl",
        p.es_popular         AS "esPopular",
        p.disponible,
        p.stock,
        p.id_categoria       AS "categoriaId",
        c.nombre             AS categoria
      FROM public.productos p
      LEFT JOIN public.categorias c ON c.id_categoria = p.id_categoria
      WHERE (${user.restauranteId ?? null}::integer IS NULL OR p.id_restaurante = ${user.restauranteId ?? null}::integer)
      ORDER BY p.disponible DESC, p.nombre
    `;

        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error) {
        console.error("[GET /api/admin/products]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/admin/products
 * Creates a new product for the admin's restaurant.
 */
export async function POST(request: NextRequest) {
    const auth = getAdminUser(request);
    if ("error" in auth) return auth.error;

    const { user } = auth;

    if (!user.restauranteId) {
        return NextResponse.json(
            { error: "BadRequest", message: "El usuario no tiene un restaurante asignado." },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();
        const { nombre, descripcion, precio, tiempoEspera, imagenUrl, categoriaId, stock } = body;

        if (!nombre || !precio) {
            return NextResponse.json(
                { error: "BadRequest", message: "Nombre y precio son obligatorios." },
                { status: 400 }
            );
        }

        const rows = await sql`
      INSERT INTO public.productos (nombre, descripcion, precio, tiempo_espera, imagen_url, id_restaurante, id_categoria, stock, disponible, es_popular)
      VALUES (${nombre}, ${descripcion ?? null}, ${precio}, ${tiempoEspera ?? null}, ${imagenUrl ?? null}, ${user.restauranteId}, ${categoriaId ?? null}, ${stock ?? 0}, true, false)
      RETURNING id_producto AS id, nombre, precio::text AS precio, disponible, stock
    `;

        return NextResponse.json({ data: rows[0] }, { status: 201 });
    } catch (error) {
        console.error("[POST /api/admin/products]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
