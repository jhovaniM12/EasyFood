import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "8h";

export interface JwtPayload {
    userId: number;
    codigoInstitucional: string;
    rol: string;
}

/** Signs a JWT with the user payload. Expires in 8 hours. */
export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/** Verifies a JWT string and returns the decoded payload. Throws on invalid/expired tokens. */
export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
