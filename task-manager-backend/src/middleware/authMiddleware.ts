import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "defaultsecret";

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing." });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;

    if (typeof decoded === "string" || !decoded || !("id" in decoded) || !("email" in decoded)) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = {
      id: (decoded as JwtPayload).id as string,
      email: (decoded as JwtPayload).email as string,
    };

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};
