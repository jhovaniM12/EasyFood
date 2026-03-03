import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "./middleware";
import { JwtPayload } from "./auth";

/**
 * Extracts the authenticated admin/collaborator user.
 * Returns the user payload if the role is admin or colaborador,
 * otherwise returns a 403 Forbidden response.
 */
export function getAdminUser(
    request: NextRequest
): { user: JwtPayload } | { error: NextResponse } {
    const auth = getAuthUser(request);
    if ("error" in auth) return auth;

    if (auth.user.rol !== "admin" && auth.user.rol !== "colaborador") {
        return {
            error: NextResponse.json(
                { error: "Forbidden", message: "Acceso denegado. Se requiere rol de administrador o colaborador." },
                { status: 403 }
            ),
        };
    }

    return auth;
}
