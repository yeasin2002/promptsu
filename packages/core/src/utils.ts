// Common utility functions shared across apps

/**
 * Environment utilities
 */
export const env = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  get: (key: string, defaultValue = ''): string => {
    return process.env[key] ?? defaultValue;
  },

  require: (key: string): string => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value;
  },
};

/**
 * API Response utilities
 */
export const apiResponse = {
  success: <T>(data: T, message?: string) => ({
    success: true as const,
    data,
    message,
  }),

  error: (error: string, code?: string) => ({
    success: false as const,
    error,
    code,
  }),

  paginated: <T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message?: string
  ) => ({
    success: true as const,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
    message,
  }),
};

/**
 * String utilities
 */
export const stringUtils = {
  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  truncate: (text: string, length: number, suffix = '...'): string => {
    if (text.length <= length) return text;
    return text.slice(0, length) + suffix;
  },

  generateId: (length = 8): string => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
};

/**
 * Type utilities
 */
export type ApiSuccessResponse<T> = ReturnType<typeof apiResponse.success<T>>;
export type ApiErrorResponse = ReturnType<typeof apiResponse.error>;
export type ApiPaginatedResponse<T> = ReturnType<
  typeof apiResponse.paginated<T>
>;
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
