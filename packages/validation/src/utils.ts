import type { z } from "zod";

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
