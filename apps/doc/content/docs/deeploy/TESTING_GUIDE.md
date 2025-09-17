# Authentication Sync Testing Guide

This guide will help you test the authentication synchronization between your web app and browser extension.

## Prerequisites

1. **Start the development servers:**
   ```bash
   # From project root
   bun dev
   ```
   This will start:
   - Server on `http://localhost:3000`
   - Web app on `http://localhost:3001`

2. **Build and load the extension:**
   ```bash
   cd apps/extension
   bun run build
   ```

3. **Load extension in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked"
   - Select the `apps/extension/dist/chrome-mv3` folder

## Test Scenarios

### 🧪 **Test 1: Web App to Extension Sync**

1. **Open web app** at `http://localhost:3001`
2. **Open extension popup** (click extension icon in toolbar)
3. **Verify initial state**: Both should show "not authenticated"
4. **Sign in on web app**:
   - Go to `/login` page
   - Enter credentials and sign in
5. **Check extension popup**: Should automatically show logged-in state
6. **Verify user data**: Extension should display user name, email, etc.

### 🧪 **Test 2: Extension to Web App Sync**

1. **Sign out from web app** (if logged in)
2. **Open extension popup**
3. **Sign in via extension**:
   - Use the sign-in form in extension popup
   - Enter valid credentials
4. **Check web app**: Refresh the page, should show logged-in state
5. **Navigate to `/profile`**: Should display user information

### 🧪 **Test 3: Sign Out Sync**

1. **Ensure both are logged in**
2. **Sign out from extension**
3. **Check web app**: Should automatically show logged-out state
4. **Try reverse**: Sign out from web app, check extension

### 🧪 **Test 4: Background Sync**

1. **Sign in on web app**
2. **Close extension popup**
3. **Wait 5+ minutes** (or trigger manual sync)
4. **Open extension popup**: Should still show logged-in state
5. **Check sync status**: Should show recent sync timestamp

### 🧪 **Test 5: Cross-Tab Sync**

1. **Open web app in two tabs**
2. **Sign in on first tab**
3. **Check second tab**: Should sync automatically
4. **Open extension**: Should also be synced

## Debugging Tools

### **Extension DevTools**
- Right-click extension popup → "Inspect"
- Check Console for sync messages
- Go to Application → Storage → Local Storage to see auth state

### **Background Script Console**
- Go to `chrome://extensions/`
- Find your extension → "Inspect views: background page"
- Check console for background sync logs

### **Network Tab**
- Monitor API calls to `http://localhost:3000`
- Verify auth requests are successful
- Check for CORS issues

### **Web App DevTools**
- Check browser console for extension sync messages
- Monitor localStorage for sync events
- Verify Better Auth session data

## Expected Behavior

### ✅ **What Should Work**
- Instant sync when signing in/out on either platform
- Persistent auth state after browser restart
- Automatic background sync every 5 minutes
- Manual sync button in extension
- Cross-tab synchronization
- User profile data display in extension

### ❌ **Common Issues**

#### **Extension not syncing with web app**
- **Check**: Extension permissions in `chrome://extensions/`
- **Check**: Content script loading on web app pages
- **Fix**: Reload extension and refresh web app

#### **CORS errors**
- **Check**: Server running on port 3000
- **Check**: `trustedOrigins` in server auth config
- **Fix**: Verify extension host permissions

#### **Auth state not persisting**
- **Check**: Chrome storage in extension DevTools
- **Check**: Extension background script console
- **Fix**: Clear extension storage and re-authenticate

#### **Manual sync not working**
- **Check**: Network requests in extension DevTools
- **Check**: Server accessibility from extension
- **Fix**: Verify server CORS and extension permissions

## Test Data

Use these test credentials for testing:

```
Email: test@example.com
Password: testpassword123
Name: Test User
```

Or create new accounts using the sign-up forms.

## Success Criteria

The authentication sync is working correctly if:

1. ✅ Signing in on web app immediately updates extension
2. ✅ Signing in on extension immediately updates web app
3. ✅ Sign out syncs in both directions
4. ✅ Auth state persists after browser restart
5. ✅ Background sync maintains consistency
6. ✅ Manual sync button works in extension
7. ✅ User profile data displays correctly in both platforms
8. ✅ No console errors related to auth or CORS

## Performance Metrics

Monitor these for optimal performance:

- **Sync latency**: < 1 second for immediate sync
- **Background sync**: Every 5 minutes
- **Storage size**: < 10KB for auth data
- **Network requests**: Minimal, only when necessary

## Next Steps

Once testing is complete:

1. **Update production URLs** in extension manifest
2. **Configure production CORS** settings
3. **Add proper extension ID** to server trusted origins
4. **Enable secure cookies** for HTTPS
5. **Implement error handling** for network failures
6. **Add analytics** for sync events (optional)

## Troubleshooting Commands

```bash
# Restart development servers
bun dev

# Rebuild extension
cd apps/extension && bun run build

# Check server logs
cd apps/server && bun run dev

# Type check all apps
bun check-types

# Lint all code
bun check
```