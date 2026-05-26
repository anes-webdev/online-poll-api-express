import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formatted = result.error.format();
      const flatErrors = Object.values(formatted)
        .flat()
        .filter(Boolean)
        .map((err) => (err as { _errors: string[] })._errors)
        .flat();

      return res.status(400).json({ message: flatErrors[0] });
    }
    next();
  };
};
