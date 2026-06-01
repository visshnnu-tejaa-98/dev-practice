// import z from "zod";
// import type { ZodType } from "zod";
// import type { Request, Response, NextFunction, RequestHandler } from "express";
// import { ValidationError } from "./api-error";

// export const validate = (schema: ZodType): RequestHandler => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const result = await schema.safeParseAsync(req.body);
//     if (!result.success) {
//       throw new ValidationError();
//       next();
//     }
//   };
// };
