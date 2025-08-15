import { z } from 'zod';
import { emailSchema, idSchema, timestampSchema } from './common';

// User related schemas

export const userSchema = z
  .object({
    id: idSchema,
    email: emailSchema,
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    avatar: z.string().url().optional(),
    isEmailVerified: z.boolean().default(false),
    role: z.enum(['user', 'admin']).default('user'),
  })
  .merge(timestampSchema);

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = userSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const userProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  avatar: z.string().url().optional(),
});

// Types
export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserProfileInput = z.infer<typeof userProfileSchema>;
