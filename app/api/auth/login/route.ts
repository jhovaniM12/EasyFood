import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { signToken } from "@/lib/auth";

// --- Input schema (Zod) ---
const loginSchema = z.object({
    codigoInstitucional: z.string().min(1, "El código institucional es requerido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = loginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "BadRequest", message: "Datos de entrada inválidos", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { codigoInstitucional, password } = parsed.data;

        // Fetch user by institutional code
        const rows = await sql`
      SELECT id_usuario, nombre, codigo_institucional,carrera, contrasena, rol
      FROM public.usuarios
      WHERE codigo_institucional = ${codigoInstitucional}
      LIMIT 1
    `;

        const user = rows[0];

        // Validate credentials (plain text comparison — password is stored as-is in the seed)
        if (!user || user.contrasena !== password) {
            return NextResponse.json(
                { error: "Unauthorized", message: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        const token = signToken({
            userId: user.id_usuario,
            codigoInstitucional: user.codigo_institucional,
            rol: user.rol,
        });

        return NextResponse.json({
            token, user: {
                nombre: user.nombre,
                carrera: user.carrera,
                codigoInstitucional: user.codigo_institucional,
                rol: user.rol,
            }
        }, { status: 200 });
    } catch (error) {
        console.error("[POST /api/auth/login]", error);
        return NextResponse.json(
            { error: "InternalServerError", message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
