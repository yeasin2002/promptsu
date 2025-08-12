import { z } from "zod";

// Utility functions for validation

/**
 * Creates a safe parser that returns a result object instead of throwing
 */
export const createSafeParser = <T extends z.ZodType>(schema: T) => {
  return (data: unknown) => {
    const result = schema.safeParse(data);
    return {
      success: result.success,
      data: result.success ? result.data : null,
      error: result.success ? null : result.error.format(),
    };
  };
};

/**
 * Validates data and throws formatted error if invalid
 */
export const validateOrThrow = <T extends z.ZodType>(
  schema: T,
  data: unknown,
  errorMessage?: string
): z.infer<T> => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedError = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(errorMessage || `Validation failed: ${formattedError}`);
    }
    throw error;
  }
};

/**
 * Creates a middleware function for validating request bodies
 */
export const createValidationMiddleware = <T extends z.ZodType>(schema: T) => {
  return (data: unknown) => {
    return validateOrThrow(schema, data);
  };
};
