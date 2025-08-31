# Fix for "INVALID_ORIGIN" Error

## 🚨 Problem
Getting `403 Forbidden` with error message `"INVALID_ORIGIN"` when trying to register from the web app.

## 🔧 Step-by-Step Fix

### Step 1: Stop All Running Servers
```bash
# Stop any running servers (Ctrl+C in terminals)
# Make sure ports 3000 and 3001 are free
```

### Step 2: Update Database Configuration
Update your `apps/server/.env` file with your actual PostgreSQL credentials:

```env
# apps/server/.env
CORS_ORIGIN=http://localhost:3001
BETTER_AUTH_SECRET=super-secret-key-for-development-change-in-production
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/your_database_name
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key
```

**Important**: Replace `your_username`, `your_password`, and `your_database_name` with your actual PostgreSQL credentials.

### Step 3: Ensure Database is Running and Accessible
```bash
# Test your database connection
psql -h localhost -U your_username -d your_database_name -c "SELECT 1;"
```

### Step 4: Run Database Migrations
```bash
# Navigate to server directory
cd apps/server

# Generate and run migrations
bun db:generate
bun db:push
```

### Step 5: Test Server Configuration
```bash
# From project root, run the test script
node test-auth.js
```

This should show:
- ✅ Health check successful
- ✅ Auth configuration loaded
- Server response for sign-up attempt

### Step 6: Start Servers in Correct Order
```bash
# Terminal 1: Start server first
bun dev:server

# Wait for "🚀 Startup checks completed successfully"
# Then in Terminal 2: Start web app
bun dev:web
```

### Step 7: Test Registration
1. Go to `http://localhost:3001/register`
2. Fill out the form with valid data
3. Submit the form
4. Should now work without 403 error

## 🔍 If Still Getting Errors

### Check Server Logs
Look for these messages in the server console:
```
🔍 Performing startup checks...
📊 Checking database connection...
✅ Database connection successful
🔐 Checking auth configuration...
✅ Auth configuration loaded
🚀 Startup checks completed successfully
```

### Check Network Requests
In browser dev tools (F12), Network tab:
1. Look for the request to `http://localhost:3000/api/auth/sign-up/email`
2. Check request headers include `Origin: http://localhost:3001`
3. Check response for detailed error message

### Common Issues and Solutions

#### Issue 1: Database Connection Failed
```bash
# Check if PostgreSQL is running
pg_ctl status

# Start PostgreSQL if not running
pg_ctl start
```

#### Issue 2: Port Already in Use
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Kill the process if needed (replace PID)
taskkill /PID <process_id> /F
```

#### Issue 3: Environment Variables Not Loading
```bash
# Verify environment variables are loaded
cd apps/server
node -e "require('dotenv').config(); console.log(process.env.BETTER_AUTH_SECRET)"
```

#### Issue 4: CORS Still Failing
Try this temporary fix in `apps/server/src/index.ts`:
```typescript
// Temporarily allow all origins for testing
app.use(
  cors({
    origin: '*', // ONLY FOR TESTING - REMOVE IN PRODUCTION
    credentials: true,
  })
);
```

## 🧪 Manual Testing

### Test 1: Server Health
```bash
curl http://localhost:3000/health
```
Should return: `{"status":"ok","timestamp":"..."}`

### Test 2: Auth Configuration
```bash
curl -H "Origin: http://localhost:3001" http://localhost:3000/api/auth/test
```
Should return auth configuration details.

### Test 3: Manual Registration
```bash
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3001" \
  --data '{"email":"test@example.com","password":"testpass123","name":"Test User"}'
```

## 🎯 Expected Behavior After Fix

1. **Server starts** with successful startup checks
2. **Registration form** submits without 403 error
3. **User is created** in database
4. **Success message** appears in web app
5. **Extension sync** works automatically

## 📞 If You Still Need Help

If the issue persists after following all steps:

1. **Share the exact error message** from browser console
2. **Share server console output** during startup
3. **Confirm database connection** works independently
4. **Verify environment variables** are loaded correctly

The key is ensuring:
- ✅ Database is connected and accessible
- ✅ Environment variables are properly set
- ✅ Servers start in correct order
- ✅ CORS origins match exactly