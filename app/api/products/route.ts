import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

export async function GET(request: NextRequest) {
  const auth = getAuthUser(request);
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const restauranteId = searchParams.get("restauranteId");
    const categoriaId = searchParams.get("categoriaId");

    // Build query dynamically based on optional filters
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
      ORDER BY p.es_popular DESC, p.id_producto
    `;

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json(
      { error: "InternalServerError", message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
