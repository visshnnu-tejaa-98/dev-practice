import type { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

const authenticate = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return next();
    if (!authHeader?.startsWith("Bearer")) {
      throw new UnauthorizedError("Invalid Authorization header format");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Token not provided");
    }
    const userId = verifyAccessToken(token);
    if (!userId) {
      throw new UnauthorizedError("Invalid or expired token");
    }
    req.user = userId;
    next();
  };
};

const restrictToAuthenticatedUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new UnauthorizedError("Authentication Required");
    return next();
  };
};

export { authenticate, restrictToAuthenticatedUser };
