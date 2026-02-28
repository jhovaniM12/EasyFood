import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export async function GET(request: NextRequest) {
  const auth = getAuthUser(request);
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);

    // --- Filter params ---
    const restauranteId = searchParams.get("restauranteId");
    const categoriaId = searchParams.get("categoriaId");
    const search = searchParams.get("search")?.trim() ?? null;

    // --- Pagination params ---
    const page = Math.max(1, parseInt(searchParams.get("page") ?? String(DEFAULT_PAGE), 10) || DEFAULT_PAGE);
    const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(searchParams.get("limit") ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT));
    const offset = (page - 1) * limit;

    // Wrap search term for ILIKE pattern matching
    const searchPattern = search ? `%${search}%` : null;

    // 1. Count total matching rows (for pagination metadata)
    const countResult = await sql`
      SELECT COUNT(*)::int AS total
      FROM public.productos p
      WHERE p.disponible = true
        AND (${restauranteId}::integer IS NULL OR p.id_restaurante = ${restauranteId}::integer)
        AND (${categoriaId}::integer IS NULL OR p.id_categoria = ${categoriaId}::integer)
        AND (${searchPattern}::text IS NULL OR p.nombre ILIKE ${searchPattern}::text)
    `;

    const total: number = countResult[0]?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    // 2. Fetch the page of products
    const rows = await sql`
      SELECT
        p.id_producto          AS id,
        p.nombre,
        p.descripcion,
        p.precio::text         AS precio,
        p.tiempo_espera        AS "tiempoEspera",
        p.imagen_url           AS "imagenUrl",
        p.es_popular           AS "esPopular",
        p.stock,
        r.nombre               AS restaurante,
        c.nombre               AS categoria
      FROM public.productos p
      JOIN public.restaurantes r ON r.id_restaurante = p.id_restaurante
      LEFT JOIN public.categorias c ON c.id_categoria = p.id_categoria
      WHERE p.disponible = true
        AND (${restauranteId}::integer IS NULL OR p.id_restaurante = ${restauranteId}::integer)
        AND (${categoriaId}::integer IS NULL OR p.id_categoria = ${categoriaId}::integer)
        AND (${searchPattern}::text IS NULL OR p.nombre ILIKE ${searchPattern}::text)
      ORDER BY p.es_popular DESC, p.id_producto
      LIMIT ${limit} OFFSET ${offset}
    `;

    return NextResponse.json(
      {
        data: rows,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json(
      { error: "InternalServerError", message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
