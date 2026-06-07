# Frontend Integration Guide

Complete guide for integrating the backend authentication with your React frontend.

## 🚀 Quick Start

### 1. Environment Setup

Create `.env.local` in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Update App Component

```javascript
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthPersistence, useTokenRefresh, useGoogleLoginHandler } from './hooks/useAuth';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  // Persist auth state from localStorage
  useAuthPersistence();

  // Automatically refresh token before expiration
  useTokenRefresh();

  // Handle Google OAuth callback
  useGoogleLoginHandler();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Add more protected routes here */}

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 3. Using Auth in Components

#### Login Component Example

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

#### Dashboard Component Example

```javascript
import { useCurrentUser, useLogout } from '../hooks/useAuth';

export default function Dashboard() {
  const user = useCurrentUser();
  const logout = useLogout();

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

#### Navbar Component Example

```javascript
import { useIsAuthenticated, useCurrentUser, useLogout } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isAuthenticated = useIsAuthenticated();
  const user = useCurrentUser();
  const logout = useLogout();

  return (
    <nav>
      <div className="navbar-brand">
        <Link to="/">Athlete Nutrition</Link>
      </div>

      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/meal-plan">Meal Plan</Link>
            <Link to="/training">Training</Link>
            <div className="user-menu">
              <span>{user?.firstName}</span>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
```

## 📦 Available Hooks

### `useAuthPersistence()`
Loads auth state from localStorage on app mount.
```javascript
useAuthPersistence();
```

### `useTokenRefresh()`
Automatically refreshes access token every 5 minutes.
```javascript
useTokenRefresh();
```

### `useIsAuthenticated()`
Returns boolean indicating if user is logged in.
```javascript
const isAuth = useIsAuthenticated();
```

### `useCurrentUser()`
Returns current user object.
```javascript
const user = useCurrentUser();
// { userId, email, firstName, lastName }
```

### `useLogout()`
Returns logout function.
```javascript
const logout = useLogout();
logout();
```

### `useGoogleLoginHandler()`
Handles Google OAuth callback redirect.
```javascript
useGoogleLoginHandler();
```

## 🛡️ Protected Routes

### Basic Protected Route

```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Public Route (redirects if authenticated)

```javascript
<Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>
```

## 🔌 API Client Usage

Direct API client usage for advanced scenarios:

```javascript
import apiClient from '../services/apiClient';

// Login
const response = await apiClient.login('user@example.com', 'password');
console.log(response.data.accessToken);

// Get current user
const user = await apiClient.getCurrentUser();

// Update profile
await apiClient.updateUserProfile('John', 'Doe');

// Change password
await apiClient.changePassword('oldPass', 'newPass');

// Logout
await apiClient.logout();
```

## 📝 Error Handling

### In Components

```javascript
const [error, setError] = useState('');
const { login } = useAuthStore();

const handleLogin = async () => {
  try {
    await login(email, password);
    navigate('/dashboard');
  } catch (error) {
    setError(error.message);
  }
};
```

### Global Error Handler

```javascript
// In App.js or main entry point
const { error, clearError } = useAuthStore();

useEffect(() => {
  if (error) {
    // Show error toast/notification
    console.error('Auth Error:', error);

    // Clear error after 5 seconds
    const timeout = setTimeout(() => clearError(), 5000);
    return () => clearTimeout(timeout);
  }
}, [error, clearError]);
```

## 🧪 Testing Authentication

### Manual Testing

1. **Test Registration**
   - Go to `/signup`
   - Fill form with test data
   - Click "Create Account"
   - Should be redirected to dashboard

2. **Test Login**
   - Go to `/login`
   - Enter credentials
   - Click "Sign In"
   - Should be redirected to dashboard

3. **Test Protected Routes**
   - Logout
   - Try to access `/dashboard`
   - Should be redirected to `/login`

4. **Test Token Refresh**
   - Login
   - Wait 5+ minutes
   - Make any API request
   - Should automatically refresh token

5. **Test Google OAuth**
   - Click "Sign in with Google" button
   - Complete Google login
   - Should be redirected to dashboard

### With Postman/Insomnia

```javascript
// 1. Register
POST http://localhost:5000/api/auth/register
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}

// 2. Copy accessToken from response

// 3. Use token in subsequent requests
GET http://localhost:5000/api/auth/me
Headers: Authorization: Bearer {accessToken}
```

## 🔐 Security Best Practices

1. **Never store sensitive data in localStorage**
   - Only store tokens, not passwords

2. **Use HTTPS in production**
   - JWT tokens should only be sent over HTTPS

3. **Set secure JWT secret**
   - Use strong, randomly generated secret
   - Never commit real secret to repository

4. **Validate input on frontend and backend**
   - Both layers should validate user input

5. **Implement token expiration**
   - Access tokens expire quickly (7 days)
   - Refresh tokens last longer (30 days)
   - Implement auto-refresh before expiration

6. **Use secure cookies for refresh tokens (optional)**
   ```javascript
   // In backend, set refresh token as httpOnly cookie
   res.cookie('refreshToken', token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'strict'
   });
   ```

7. **Implement CSRF protection**
   - In production, implement CSRF tokens

8. **Rate limiting on login attempts**
   - Prevent brute force attacks
   - Lock account after N failed attempts

## 🚀 Production Deployment

### Update Environment Variables

1. Set `VITE_API_URL` to production backend URL
   ```env
   VITE_API_URL=https://api.yourdomain.com/api
   ```

2. Update backend `.env.local`
   ```env
   NODE_ENV=production
   FRONTEND_URL=https://yourdomain.com
   ```

### Build Frontend

```bash
npm run build
# Creates dist/ folder ready for deployment
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy to Other Platforms

- **Netlify**: Connect GitHub repo and auto-deploy
- **GitHub Pages**: Configure for SPA
- **AWS S3 + CloudFront**: For static hosting
- **Docker**: Containerize entire app

## 📚 Additional Resources

- [Auth Store Source](../src/stores/authStore.js)
- [API Client Source](../src/services/apiClient.js)
- [Auth Hooks Source](../src/hooks/useAuth.js)
- [Backend Documentation](../backend/README.md)

## 🐛 Troubleshooting

### Tokens not persisting after refresh
- Check localStorage is enabled in browser
- Verify `useAuthPersistence()` is called in App
- Clear cache and localStorage, try again

### CORS errors
- Verify backend FRONTEND_URL matches your frontend URL
- Check backend server is running
- Allow credentials in CORS settings

### Google login not working
- Verify Google credentials in `.env.local`
- Check redirect URI in Google Cloud Console
- Make sure backend is running
- Clear cookies and try again

### "Token invalid" errors
- Token may have expired
- Use refresh token to get new access token
- Auto-refresh hook should handle this
- If still fails, user needs to login again

### API requests returning 401
- Check token is being sent in Authorization header
- Verify token hasn't expired
- Check JWT_SECRET matches between server restarts
- Try logging out and logging back in

---

**Last Updated:** 2024  
**Version:** 1.0.0
