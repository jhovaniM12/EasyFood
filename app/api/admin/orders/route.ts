import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAdminUser } from "@/lib/adminMiddleware";

/**
 * GET /api/admin/orders
 * Returns all orders that contain products from the admin's restaurant.
 * Admin users (without restaurant) see ALL orders.
 * Supports ?status= filter for order status.
 */
export async function GET(request: NextRequest) {
  const auth = getAdminUser(request);
  if ("error" in auth) return auth.error;

  const { user } = auth;
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status");

  try {
    // Get order IDs that contain products from this restaurant
    const orders = await sql`
      SELECT
        p.id_pedido             AS "orderId",
        p.codigo_visual         AS "codigoVisual",
        p.estado::text          AS estado,
        p.metodo_pago           AS "metodoPago",
        p.total_compra::text    AS "totalCompra",
        p.fecha_pedido          AS "fechaPedido",
        u.nombre                AS "cliente",
        u.codigo_institucional  AS "codigoCliente"
      FROM public.pedidos p
      JOIN public.usuarios u ON u.id_usuario = p.id_usuario
      WHERE p.id_pedido IN (
        SELECT DISTINCT dp.id_pedido
        FROM public.detalle_pedido dp
        JOIN public.productos pr ON pr.id_producto = dp.id_producto
        WHERE (${user.restauranteId ?? null}::integer IS NULL OR pr.id_restaurante = ${user.restauranteId ?? null}::integer)
      )
        AND (${statusFilter}::text IS NULL OR p.estado::text = ${statusFilter}::text)
      ORDER BY
        CASE p.estado
          WHEN 'recibido' THEN 1
          WHEN 'confirmado' THEN 2
          WHEN 'en_preparacion' THEN 3
          WHEN 'listo' THEN 4
          WHEN 'entregado' THEN 5
          WHEN 'cancelado' THEN 6
        END,
        p.fecha_pedido DESC
    `;

    // Fetch items for each order
    const orderIds = orders.map((o: any) => o.orderId);

    if (orderIds.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const items = await sql`
      SELECT
        dp.id_pedido      AS "orderId",
        pr.nombre,
        dp.cantidad       AS quantity,
        pr.imagen_url     AS image,
        pr.precio::text   AS precio
      FROM public.detalle_pedido dp
      JOIN public.productos pr ON pr.id_producto = dp.id_producto
      WHERE dp.id_pedido = ANY(${orderIds}::integer[])
    `;

    // Group items by orderId
    const itemsByOrder: Record<number, any[]> = {};
    for (const item of items) {
      if (!itemsByOrder[item.orderId]) itemsByOrder[item.orderId] = [];
      itemsByOrder[item.orderId].push({
        name: item.nombre,
        quantity: item.quantity,
        image: item.image,
        precio: item.precio,
      });
    }

    const data = orders.map((o: any) => ({
      ...o,
      items: itemsByOrder[o.orderId] ?? [],
    }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/admin/orders]", error);
    return NextResponse.json(
      { error: "InternalServerError", message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
