import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAdminUser } from "@/lib/adminMiddleware";

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/products/[id]
 * Updates a product's details (availability, price, stock, etc.).
 * Only the admin/collaborator who owns the restaurant can update its products.
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    const auth = getAdminUser(request);
    if ("error" in auth) return auth.error;

    const { user } = auth;
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
        return NextResponse.json(
            { error: "BadRequest", message: "ID de producto inválido." },
            { status: 400 }
        );
    }

    try {
        // Verify the product belongs to the admin's restaurant
        const existing = await sql`
      SELECT id_producto, id_restaurante FROM public.productos WHERE id_producto = ${productId}
    `;

        if (existing.length === 0) {
            return NextResponse.json(
                { error: "NotFound", message: "Producto no encontrado." },
                { status: 404 }
            );
        }

        if (user.restauranteId && existing[0].id_restaurante !== user.restauranteId) {
            return NextResponse.json(
                { error: "Forbidden", message: "No tienes permiso para modificar este producto." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { nombre, descripcion, precio, tiempoEspera, imagenUrl, disponible, stock, categoriaId } = body;

        const rows = await sql`
      UPDATE public.productos
      SET
        nombre       = COALESCE(${nombre ?? null}, nombre),
        descripcion  = COALESCE(${descripcion ?? null}, descripcion),
        precio       = COALESCE(${precio ?? null}::numeric, precio),
        tiempo_espera = COALESCE(${tiempoEspera ?? null}, tiempo_espera),
        imagen_url   = COALESCE(${imagenUrl ?? null}, imagen_url),
        disponible   = COALESCE(${disponible ?? null}::boolean, disponible),
        stock        = COALESCE(${stock ?? null}::integer, stock),
        id_categoria = COALESCE(${categoriaId ?? null}::integer, id_categoria)
      WHERE id_producto = ${productId}
      RETURNING
        id_producto AS id,
        nombre,
        precio::text AS precio,
        disponible,
        stock,
        imagen_url AS "imagenUrl"
    `;

        return NextResponse.json({ data: rows[0] }, { status: 200 });
    } catch (error) {
        console.error("[PATCH /api/admin/products/[id]]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
