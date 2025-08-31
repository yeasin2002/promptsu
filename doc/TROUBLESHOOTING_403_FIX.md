# 403 Forbidden Error Fix Guide

## 🐛 Problem
When trying to register from the web app (`apps/web/src/app/(auth)/register/page.tsx`), you were getting a **403 Forbidden** error.

## 🔍 Root Causes Identified

### 1. **Incorrect Auth Route Mounting**
The Better Auth handler was not properly mounted in the Hono server.

**Before:**
```typescript
app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));
```

**After:**
```typescript
app.route('/api/auth', auth.handler);
```

### 2. **CORS Configuration Issues**
The CORS configuration was too permissive and not properly handling credentials.

**Fixed:**
- Added specific allowed origins
- Proper headers configuration
- Enabled credentials properly
- Added maxAge for preflight caching

### 3. **Missing Environment Variables**
The server and web app were missing proper environment configuration.

**Added:**
- `apps/server/.env` with proper defaults
- `apps/web/.env.local` with server URL

### 4. **Better Auth Configuration**
Enhanced the Better Auth configuration with proper defaults and session settings.

## ✅ What Was Fixed

### 1. **Server Configuration** (`apps/server/src/index.ts`)

```typescript
// ✅ Fixed CORS configuration
app.use(
  cors({
    origin: (origin) => {
      const allowedOrigins = [
        process.env.CORS_ORIGIN,
        'http://localhost:3001', // Development web app
        'http://localhost:3000', // Development server
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        return origin || '*';
      }
      return false;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
      'Pragma'
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

// ✅ Fixed auth route mounting
app.route('/api/auth', auth.handler);
```

### 2. **Better Auth Configuration** (`apps/server/src/lib/auth.ts`)

```typescript
export const auth = betterAuth({
  // ... existing config
  trustedOrigins: [
    process.env.CORS_ORIGIN || 'http://localhost:3001',
    'http://localhost:3001', // Development web app
    'http://localhost:3000', // Development server
    'my-better-t-app://', // Mobile app
  ],
  secret: process.env.BETTER_AUTH_SECRET || 'fallback-secret-for-development',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  // ... rest of config
});
```

### 3. **Web App Auth Client** (`apps/web/src/lib/auth-client.ts`)

```typescript
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  fetchOptions: {
    credentials: 'include', // ✅ Important for cookies
  },
});
```

### 4. **Enhanced Error Handling**

Updated both login and register pages with:
- Better error logging
- Extension sync integration
- Improved user feedback

### 5. **Environment Configuration**

**Server** (`apps/server/.env`):
```env
CORS_ORIGIN=http://localhost:3001
BETTER_AUTH_SECRET=your-super-secret-key-change-this-in-production
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

**Web App** (`apps/web/.env.local`):
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## 🚀 How to Test the Fix

### 1. **Update Environment Variables**
Make sure you have the correct values in your `.env` files:

```bash
# In apps/server/.env
CORS_ORIGIN=http://localhost:3001
BETTER_AUTH_SECRET=your-actual-secret-key
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=your-actual-database-url

# In apps/web/.env.local  
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 2. **Restart Your Servers**
```bash
# Stop all servers and restart
bun dev:server  # Terminal 1
bun dev:web     # Terminal 2
```

### 3. **Test Registration**
1. Go to `http://localhost:3001/register`
2. Fill out the registration form
3. Submit the form
4. Should now work without 403 error

### 4. **Test Login**
1. Go to `http://localhost:3001/login`
2. Use the credentials you just registered
3. Should login successfully

## 🔧 Additional Debugging

If you still encounter issues:

### 1. **Check Server Logs**
Look for any errors in the server console when making requests.

### 2. **Check Network Tab**
In browser dev tools, check:
- Request URL is correct (`http://localhost:3000/api/auth/sign-up`)
- Request headers include proper CORS headers
- Response status and error messages

### 3. **Verify Database Connection**
Make sure your PostgreSQL database is running and accessible with the provided `DATABASE_URL`.

### 4. **Test API Endpoints Directly**
```bash
# Test server health
curl http://localhost:3000/health

# Test auth endpoint (should return method not allowed for GET)
curl http://localhost:3000/api/auth/session
```

## 🎯 Key Takeaways

1. **Proper Route Mounting**: Use `app.route()` instead of `app.on()` for Better Auth
2. **CORS Configuration**: Be specific about allowed origins and headers
3. **Environment Variables**: Always provide fallback values for development
4. **Credentials**: Include credentials in fetch requests for cookie-based auth
5. **Error Handling**: Always log errors for debugging

The registration should now work properly without the 403 Forbidden error!