import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthUser } from "@/lib/middleware";

export async function GET(request: NextRequest) {
  const auth = getAuthUser(request);
  if ("error" in auth) return auth.error;

  try {
    const rows = await sql`
      SELECT
        p.id_pedido             AS "orderId",
        p.codigo_visual         AS "codigoVisual",
        p.estado,
        p.metodo_pago           AS "metodoPago",
        p.total_compra::text    AS "totalCompra",
        p.fecha_pedido          AS "fechaPedido",
        COALESCE(
          json_agg(
            json_build_object(
              'nombre',        pr.nombre,
              'cantidad',      dp.cantidad,
              'imagenUrl',     pr.imagen_url
            )
          ) FILTER (WHERE dp.id_detalle IS NOT NULL),
          '[]'
        ) AS items
      FROM public.pedidos p
      LEFT JOIN public.detalle_pedido dp ON dp.id_pedido = p.id_pedido
      LEFT JOIN public.productos pr     ON pr.id_producto = dp.id_producto
      WHERE p.id_usuario = ${auth.user.userId}
        AND p.estado IN ('recibido', 'confirmado', 'en_preparacion')
      GROUP BY p.id_pedido
      ORDER BY p.fecha_pedido DESC
    `;

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("[GET /api/orders/active]", error);
    return NextResponse.json(
      { error: "InternalServerError", message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
