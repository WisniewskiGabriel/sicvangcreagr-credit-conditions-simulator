# 🔧 Consolidated Environment Configuration

## Configuration Summary

✅ **Single Environment File**: Using only `.env` (removed `.env.local`)

✅ **Real API Mode**: `NEXT_PUBLIC_USE_MOCK_API=false`

✅ **Debug Enabled**: `NEXT_PUBLIC_DEBUG_AUTH=true` for troubleshooting

## Current Configuration

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_DEBUG_AUTH=true
```

## What Changed

### 1. **Environment Consolidation**
- Merged `.env.local` into `.env`
- Removed duplicate configurations
- Single source of truth for all environment variables

### 2. **API Mode Switch**
- Now using **Real API** at `http://localhost:8080`
- Mock service disabled
- Debug logging enabled for troubleshooting

### 3. **Login Page Updates**
- Shows "API Real Conectada" badge instead of "Modo Demonstração"
- Hides demo login button when using real API
- Updated help text for real credentials

### 4. **Enhanced Debugging**
- Console logging for API calls when `NEXT_PUBLIC_DEBUG_AUTH=true`
- Request/response logging
- Error details in console

## Testing Your Real API

### 1. **Check Browser Console**
With debug mode enabled, you'll see:
```
🔧 Auth Debug Info: { API_BASE_URL: "http://localhost:8080", USE_MOCK_API: false, DEBUG_AUTH: true }
🔑 Attempting login with real API: http://localhost:8080/user-authentication/login
🔑 Login response: { status: 200, statusText: "OK", ok: true }
🔑 Login successful: { user: {...} }
```

### 2. **Expected API Endpoints**
Your NestJS backend should have:
- `POST http://localhost:8080/user-authentication/login`
- `POST http://localhost:8080/user-authentication/logout`
- `POST http://localhost:8080/user-authentication/refresh-token`
- `GET http://localhost:8080/user-authentication/me`

### 3. **CORS Configuration**
Ensure your NestJS backend allows:
- Origin: `http://localhost:3000`
- Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Headers: `Content-Type, Authorization`
- Credentials: `true`

## Troubleshooting

### Common Issues & Solutions

1. **CORS Errors**
   ```typescript
   // In your NestJS main.ts
   app.enableCors({
     origin: 'http://localhost:3000',
     credentials: true,
   });
   ```

2. **Wrong API URL**
   - Check if your API is at `/api` path: update `NEXT_PUBLIC_API_URL=http://localhost:8080/api`

3. **Authentication Failed**
   - Check console for detailed error messages
   - Verify endpoint responses match expected format

4. **Network Errors**
   - Ensure NestJS backend is running on port 8080
   - Check firewall/antivirus blocking connections

## Switch Back to Mock (if needed)

If you need to test with mock data:
```env
NEXT_PUBLIC_USE_MOCK_API=true
```

Then restart: `npm run dev`

---

🚀 **Your application is now configured to use your real API!** 

Visit `http://localhost:3000/login` to test with your actual backend credentials.