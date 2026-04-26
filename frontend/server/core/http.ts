import type { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
  status: number;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function errorHandler(err: any, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);
  const status = err?.status || err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";
  if (status >= 500) console.error("Internal Server Error:", err);
  return res.status(status).json(err?.data || { detail: message, message });
}
