import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors';

interface ValidationSchemas {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

/**
 * Validate `req.body`, `req.params`, and/or `req.query` against the provided
 * Zod schemas.  Returns a 400 with per-field error messages on failure.
 *
 * @example
 * router.post('/', validate({ body: createUserSchema }), handler);
 */
export function validate(schemas: ValidationSchemas): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const errors: Record<string, string[]> = {};

    for (const [source, schema] of Object.entries(schemas) as Array<
      [keyof ValidationSchemas, ZodSchema]
    >) {
      if (!schema) continue;

      const result = schema.safeParse(req[source]);

      if (!result.success) {
        for (const issue of (result.error as ZodError).issues) {
          const path = issue.path.join('.') || '_root';
          if (!errors[path]) errors[path] = [];
          errors[path].push(issue.message);
        }
      } else {
        // Replace the source with the parsed & transformed value
        req[source] = result.data;
      }
    }

    if (Object.keys(errors).length > 0) {
      next(new ValidationError('Validation failed', errors));
      return;
    }

    next();
  };
}
