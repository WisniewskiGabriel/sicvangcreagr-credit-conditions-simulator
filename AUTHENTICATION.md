# 🔐 Authentication System Documentation

## Overview

This document describes the complete authentication system implemented for the SICVANGCREAGR Credit Conditions Simulator. The system provides secure user authentication with JWT tokens, automatic refresh, and seamless integration with the existing PrimeReact theme.

## Architecture

### Tech Stack
- **Frontend**: Next.js 14+ with App Router
- **UI Components**: PrimeReact with Lara-Blue theme
- **Styling**: Tailwind CSS
- **Authentication**: JWT tokens with automatic refresh
- **Cookie Management**: js-cookie library
- **Backend API**: NestJS at http://localhost:8080

## API Endpoints

### Base URL
```
http://localhost:8080
```

### Authentication Endpoints

#### 1. Login
- **Endpoint**: `POST /user-authentication/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com"
    },
    "access_token": "jwt_token",
    "refresh_token": "refresh_jwt_token",
    "expires_in": 3600
  }
  ```

#### 2. Signup
- **Endpoint**: `POST /user-authentication/signup`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "user_metadata": {} // optional
  }
  ```

#### 3. Refresh Token
- **Endpoint**: `POST /user-authentication/refresh-token`
- **Request Body**:
  ```json
  {
    "refreshToken": "refresh_jwt_token"
  }
  ```

#### 4. Logout
- **Endpoint**: `POST /user-authentication/logout`
- **Headers**: `Authorization: Bearer {access_token}`

#### 5. Get Current User
- **Endpoint**: `GET /user-authentication/me`
- **Headers**: `Authorization: Bearer {access_token}`

## Implementation Components

### 1. Authentication Context (`app/context/AuthContext.tsx`)

The core authentication state management using React Context API.

**Features:**
- User state management
- Login/logout functionality
- Automatic token refresh
- Cookie-based token storage
- API request wrapper with auto-retry on 401

**Key Functions:**
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  getUser: () => Promise<User | null>;
}
```

### 2. Middleware (`middleware.ts`)

Route protection at the Next.js level using middleware.

**Protected Routes:**
- `/dashboard` - Requires authentication
- `/profile` - Requires authentication

**Public Routes:**
- `/` - Home page (credit simulator)
- `/login` - Login page

**Auth Routes (redirect when authenticated):**
- `/login` - Redirects to `/dashboard`

**Features:**
- Automatic redirect with callback URL
- Token validation
- Theme preservation during redirects

### 3. Higher-Order Component (`app/hoc/withAuth.tsx`)

Component-level authentication protection with loading states.

**Usage:**
```typescript
// Protect a component (requires authentication)
export default withAuth(MyComponent);

// Public component (no authentication required)
export default withAuth(MyComponent, { requireAuth: false });
```

**Features:**
- PrimeReact ProgressSpinner during authentication check
- Automatic redirects
- Callback URL preservation

### 4. Login Page (`app/login/page.tsx`)

Responsive login form using PrimeReact components.

**Components Used:**
- `Card` - Container
- `InputText` - Email input with validation
- `Password` - Password input with toggle mask
- `Button` - Submit and demo login
- `Message` - Error display
- `Divider` - Visual separation

**Features:**
- Email validation
- Demo login functionality
- Responsive design
- Theme-consistent styling
- Error handling with user feedback
- Callback URL support

### 5. Dashboard Page (`app/dashboard/page.tsx`)

Protected dashboard with user-specific content.

**Features:**
- Welcome message with user info
- Statistics cards
- Quick action buttons
- Recent activities timeline
- System status indicators
- Responsive grid layout

### 6. Profile Page (`app/profile/page.tsx`)

User profile management with settings.

**Features:**
- User information display
- Profile update form
- Password change functionality
- Account statistics
- Account actions (export, deactivate, delete)

### 7. Updated TopBar (`app/components/ui/Topbar.tsx`)

Navigation component with authentication integration.

**Features:**
- Conditional rendering based on auth state
- User avatar with initials
- Dropdown menu with navigation options
- Logout confirmation dialog
- Responsive design

## Security Features

### 1. Token Management
- **Access Token**: Short-lived (1 hour), stored in secure cookies
- **Refresh Token**: Long-lived (7 days), used for automatic renewal
- **Automatic Refresh**: Tokens refresh every 50 minutes
- **Secure Cookies**: SameSite=Strict, Secure in production

### 2. API Security
- **Bearer Token Authentication**: All protected endpoints require valid JWT
- **Automatic Retry**: 401 responses trigger token refresh and retry
- **Request Interceptor**: Seamless token attachment to requests

### 3. Route Protection
- **Middleware-level**: Server-side route protection
- **Component-level**: Client-side protection with HOC
- **Redirect Preservation**: Callback URLs maintain user navigation intent

## User Experience Features

### 1. Loading States
- PrimeReact ProgressSpinner during authentication checks
- Button loading states during API calls
- Skeleton loading for better perceived performance

### 2. Error Handling
- User-friendly error messages
- Network error detection
- Graceful fallbacks

### 3. Theme Integration
- Consistent with existing Lara-Blue theme
- Dark/light mode support
- Responsive design patterns

### 4. Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

## Installation & Setup

### 1. Install Dependencies
```bash
npm install js-cookie @types/js-cookie
```

### 2. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=development
```

### 3. Backend Requirements
Ensure your NestJS backend has the following endpoints configured:
- User authentication module
- JWT token handling
- CORS configuration for frontend domain

## Usage Examples

### 1. Protecting a Page
```typescript
import withAuth from "../hoc/withAuth";

const MyProtectedPage = () => {
  return <div>Protected content</div>;
};

export default withAuth(MyProtectedPage);
```

### 2. Using Authentication Context
```typescript
import { useAuth } from "../context/AuthContext";

const MyComponent = () => {
  const { user, login, logout, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;
  
  return <div>Welcome, {user.email}!</div>;
};
```

### 3. Making Authenticated API Calls
The AuthContext provides an `apiRequest` wrapper that automatically handles tokens:

```typescript
// This is handled internally, but you can extend it for custom API calls
const response = await apiRequest('/api/my-endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

## Testing

### 1. Manual Testing Flow
1. Start the application: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Try accessing `/dashboard` (should redirect to login)
4. Use the demo login on `/login`
5. Verify redirect to dashboard
6. Test navigation between protected routes
7. Test logout functionality

### 2. Demo Credentials
The login page includes a "Demo Login" button that fills:
- Email: `demo@sicvangcreagr.com`
- Password: `demo123`

### 3. Testing Scenarios
- ✅ Unauthenticated access to protected routes
- ✅ Authenticated access to auth routes (login)
- ✅ Token expiration and refresh
- ✅ Logout and session cleanup
- ✅ Navigation preservation with callback URLs
- ✅ Component-level protection
- ✅ Theme consistency across auth flow

## Troubleshooting

### Common Issues

1. **Cookie Issues in Development**
   - Ensure cookies are not blocked in browser
   - Check SameSite settings for localhost

2. **CORS Errors**
   - Configure backend CORS for `http://localhost:3000`
   - Enable credentials in CORS configuration

3. **Token Refresh Loops**
   - Check token expiration times
   - Verify refresh endpoint response format

4. **Middleware Infinite Redirects**
   - Check route matching patterns
   - Verify public route configurations

### Debug Mode
Add environment variable for additional logging:
```env
NEXT_PUBLIC_DEBUG_AUTH=true
```

## Future Enhancements

1. **Multi-Factor Authentication (MFA)**
2. **Social Login Integration**
3. **Password Reset Flow**
4. **Session Management Dashboard**
5. **Audit Logging**
6. **Role-Based Access Control (RBAC)**

## Conclusion

This authentication system provides a robust, secure, and user-friendly solution for the SICVANGCREAGR application. It maintains consistency with the existing design language while adding enterprise-grade security features.

The implementation follows Next.js best practices and provides a seamless experience for users while maintaining strong security standards.