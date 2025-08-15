import { z } from 'zod';

// Base context interface - extend this in your apps
export interface BaseTRPCContext {
  user?: {
    id: string;
    email: string;
    role: string;
  } | null;
}

// Common input schemas for pagination, etc.
export const paginationInput = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export const idInput = z.object({
  id: z.string().uuid(),
});

// Helper to create paginated response
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
}

// Types
export type PaginationInput = z.infer<typeof paginationInput>;
export type IdInput = z.infer<typeof idInput>;
export type PaginatedResponse<T> = ReturnType<
  typeof createPaginatedResponse<T>
>;
