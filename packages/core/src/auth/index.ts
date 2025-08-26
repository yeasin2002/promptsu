export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export interface AuthContext {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    isEmailVerified: boolean;
  } | null;
  session: {
    id: string;
    expiresAt: Date;
  } | null;
}

export const authUtils = {
  isAuthenticated: (context: AuthContext): boolean => {
    return !!context.user && !!context.session;
  },

  isAdmin: (context: AuthContext): boolean => {
    return context.user?.role === 'admin';
  },

  hasRole: (context: AuthContext, role: string): boolean => {
    return context.user?.role === role;
  },

  isEmailVerified: (context: AuthContext): boolean => {
    return context.user?.isEmailVerified === true;
  },

  isSessionValid: (context: AuthContext): boolean => {
    if (!context.session) return false;
    return context.session.expiresAt > new Date();
  },
};
