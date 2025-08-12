import { z } from "zod";

// Common validation schemas that can be reused across apps

export const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .min(1, "Email is required");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const idSchema = z.string().uuid("Invalid ID format");

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export const timestampSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Common response schemas
export const successResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
});

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string().optional(),
});
