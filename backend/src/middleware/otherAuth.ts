import { Response, NextFunction } from "express";
import { JwtPayload } from "../utils/jwt";
import { Request } from "express";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authorize =
  (...allowedRoles: number[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized: user info missing",
      });
    }

    if (!allowedRoles.includes(req.user.roleId)) {
      return res.status(403).json({
        statusCode: 403,
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
