import type { ZodType } from "zod";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { ValidationError } from "../utils/api-error";

export const validate = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      next(new ValidationError(result.error.flatten().fieldErrors));
      return;
    }
    req.body = result.data;
    next();
  };
};
