# Athlete Nutrition App - Setup Instructions

## 🎯 Project Structure

```
athlete-nutrition-app/
├── src/                      # React frontend (Vite)
│   ├── pages/
│   │   ├── Login.jsx        # Login page
│   │   └── Signup.jsx       # Signup page
│   ├── stores/
│   │   ├── authStore.js     # Zustand auth store
│   │   └── ...other stores
│   ├── services/
│   │   └── apiClient.js     # API client for backend
│   └── ...
├── backend/                  # Express.js backend
│   ├── src/
│   │   ├── server.js        # Main server file
│   │   ├── config/          # Configuration files
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Middleware
│   │   └── utils/           # Utility functions
│   ├── package.json
│   ├── .env.example
│   ├── .env.local           # Your local environment variables
│   ├── supabase_schema.sql  # Database schema
│   └── README.md            # Backend documentation
├── package.json
└── ...
```

## 🚀 Quick Setup

### 1. Setup Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **Anon Key** → `SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`
4. Go to **Settings → Auth → JWT Secret** and copy it → `SUPABASE_JWT_SECRET`

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Copy and edit environment file
cp .env.example .env.local

# Install dependencies
npm install

# Setup database - Run the SQL from supabase_schema.sql
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Click "New Query"
# 3. Copy-paste contents of supabase_schema.sql
# 4. Click "Run"

# Start backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
# Navigate to root directory
cd ../

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Test Authentication

1. Open [http://localhost:5173](http://localhost:5173)
2. Click on "Login" or "Sign Up"
3. Create an account or login
4. You should be authenticated and can access protected routes

## 🔑 Google OAuth Setup (Optional)

### Get Google Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable **Google+ API**:
   - Click "Enable APIs and Services"
   - Search "Google+ API"
   - Click "Enable"
4. Create OAuth credentials:
   - Go to **Credentials** → **Create Credentials** → **OAuth Client ID**
   - Select **Web Application**
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
     - `http://localhost:5173` (frontend)
   - Copy **Client ID** and **Client Secret**

### Configure Backend

Add to `backend/.env.local`:
```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

## 📝 Environment Variables

### Backend (`backend/.env.local`)

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Supabase (Get from Project Settings → API)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdnZ0c3Z1Yndmbmx0cW5panViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTg4NzUsImV4cCI6MjA5NjM5NDg3NX0.VoWBlLEcO2yKoIv7WzAwUgfhuwesccCkZDNP4hqtaaw
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_JWT_SECRET=secret-key

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=7d
REFRESH_TOKEN_EXPIRATION=30d
```

### Frontend (Create `.env.local` in root if needed)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🔐 Authentication Flow

### Email/Password Login

```
User → Frontend Login Form
    ↓
Frontend sends POST /api/auth/login
    ↓
Backend validates credentials with Supabase
    ↓
Backend generates JWT tokens
    ↓
Frontend stores tokens in localStorage
    ↓
Frontend redirects to dashboard
```

### Google OAuth Login

```
User → Frontend Google Button
    ↓
Frontend redirects to GET /api/auth/google
    ↓
Backend redirects to Google login
    ↓
Google redirects to /api/auth/google/callback
    ↓
Backend exchanges code for tokens
    ↓
Backend creates/updates user profile
    ↓
Backend generates JWT tokens
    ↓
Backend redirects to frontend with tokens
    ↓
Frontend stores tokens and redirects to dashboard
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback

### User Profile
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `POST /api/users/change-password` - Change password (protected)
- `DELETE /api/users/account` - Delete account (protected)

## 🧪 Testing API Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get current user (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman/Insomnia

1. Import the API endpoints
2. Set variables:
   - `BASE_URL` = `http://localhost:5000/api`
   - `TOKEN` = access token from login response
3. Test each endpoint

## 🐛 Troubleshooting

### Backend won't start
```
Error: Missing Supabase configuration
```
- Check `backend/.env.local` exists
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are filled
- Restart: `npm run dev`

### CORS error when login fails
- Check FRONTEND_URL in `backend/.env.local` matches your frontend URL
- Verify backend server is running on correct port

### "Invalid token" error
- Access token may have expired
- Use refresh token endpoint to get new token
- Clear localStorage and login again: `localStorage.clear()`

### Database errors when running SQL
- Make sure you're in correct Supabase project
- Check SQL syntax in supabase_schema.sql
- Run each SQL section separately if one fails

### Google OAuth doesn't work
- Verify Google credentials in `.env.local`
- Check redirect URI matches in Google Cloud Console
- Make sure Google+ API is enabled

## 📱 Frontend Usage

### Using Auth Store

```javascript
import { useAuthStore } from '../stores/authStore';

function MyComponent() {
  const { login, logout, user, isAuthenticated } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      // Automatically redirected after login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (isAuthenticated()) {
    return <div>Welcome, {user.firstName}!</div>;
  }

  return <button onClick={handleLogin}>Login</button>;
}
```

### Protected Routes

```javascript
import { useAuthStore } from '../stores/authStore';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

## 📦 Dependencies

### Backend
- `express` - Web framework
- `@supabase/supabase-js` - Supabase client
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing
- `cors` - CORS middleware
- `dotenv` - Environment variables

### Frontend
- `react` - UI framework
- `zustand` - State management
- `react-router-dom` - Routing
- `tailwindcss` - Styling

## 🚀 Next Steps

1. ✅ Backend setup complete
2. ✅ Database schema configured
3. ✅ Authentication implemented
4. 📝 Add meal planning features
5. 📝 Add nutrition tracking
6. 📝 Add training logs
7. 📝 Deploy to production

## 📞 Support

For issues:
1. Check this guide first
2. Review backend logs: check terminal where `npm run dev` is running
3. Check browser console for frontend errors
4. Check Supabase logs in dashboard

## 🎉 You're Ready!

Your full-stack authentication system is now ready. Start building your meal tracking and nutrition features!

Happy coding! 🚀
