# System Architecture & Flow Diagrams

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
├─────────────────────────────────────────────────────────────────┤
│                   Athlete Nutrition App                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  React 19 + Vite                                         │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Routes (Router)                                 │   │  │
│  │  │  ├─ /login        (PublicRoute)                  │   │  │
│  │  │  ├─ /signup       (PublicRoute)                  │   │  │
│  │  │  ├─ /dashboard    (ProtectedRoute)               │   │  │
│  │  │  └─ /profile      (ProtectedRoute)               │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                        ↓                                  │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Zustand Store (authStore)                       │   │  │
│  │  │  ├─ user                                         │   │  │
│  │  │  ├─ accessToken / refreshToken                  │   │  │
│  │  │  ├─ isLoading / error                           │   │  │
│  │  │  └─ Actions (login, logout, register, etc)      │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                        ↓                                  │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  API Client (apiClient.js)                       │   │  │
│  │  │  ├─ localStorage management                      │   │  │
│  │  │  ├─ JWT token injection                          │   │  │
│  │  │  └─ HTTP request handling                        │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  localStorage: {accessToken, refreshToken}                     │
└──────────────────┬────────────────────────────────────────────┘
                   │ HTTP/HTTPS with JWT
                   ↓
┌──────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                                │
│              Express.js on Port 5000                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Routes (Express Router)                                   │ │
│  │  ├─ POST   /api/auth/register                             │ │
│  │  ├─ POST   /api/auth/login                                │ │
│  │  ├─ POST   /api/auth/logout                               │ │
│  │  ├─ POST   /api/auth/refresh-token                        │ │
│  │  ├─ GET    /api/auth/me          (+ authMiddleware)       │ │
│  │  ├─ GET    /api/auth/google                               │ │
│  │  ├─ GET    /api/auth/google/callback                      │ │
│  │  ├─ GET    /api/users/profile    (+ authMiddleware)       │ │
│  │  ├─ PUT    /api/users/profile    (+ authMiddleware)       │ │
│  │  ├─ POST   /api/users/change-password (+ authMiddleware)  │ │
│  │  └─ DELETE /api/users/account    (+ authMiddleware)       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Controllers (Business Logic)                              │ │
│  │  ├─ authController.js                                     │ │
│  │  │  └─ register, login, logout, refresh, getCurrentUser  │ │
│  │  └─ userController.js                                     │ │
│  │     └─ getProfile, updateProfile, changePassword, delete  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Middleware                                                │ │
│  │  ├─ authMiddleware    - Verify JWT tokens                 │ │
│  │  ├─ errorHandler      - Global error handling             │ │
│  │  ├─ cors              - Cross-origin requests              │ │
│  │  └─ express.json()    - Parse JSON body                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Utilities                                                 │ │
│  │  ├─ jwt.js         - Generate & verify tokens             │ │
│  │  └─ errors.js      - Custom error classes                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Supabase Client (SDK)                                     │ │
│  │  ├─ Authentication (with Google OAuth)                     │ │
│  │  ├─ Database queries                                      │ │
│  │  └─ Real-time subscriptions (optional)                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────┬────────────────────────────────────────────┘
                   │ HTTPS REST API
                   ↓
┌──────────────────────────────────────────────────────────────────┐
│                   SUPABASE CLOUD                                 │
│        (Backend-as-a-Service + PostgreSQL Database)              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Supabase Auth (Built-in)                                  │ │
│  │  ├─ User registration & verification                       │ │
│  │  ├─ Password hashing                                       │ │
│  │  ├─ Google OAuth provider                                  │ │
│  │  └─ Session management                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  PostgreSQL Database                                       │ │
│  │  ├─ users table          (RLS enabled)                     │ │
│  │  ├─ meal_plans table     (RLS enabled)                     │ │
│  │  ├─ meals table          (RLS enabled)                     │ │
│  │  ├─ hydration_logs table (RLS enabled)                     │ │
│  │  ├─ training_logs table  (RLS enabled)                     │ │
│  │  └─ user_sessions table  (optional)                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ├─ All tables have RLS policies                               │
│  ├─ Users can only access their own data                       │
│  ├─ Automatic timestamp triggers                               │
│  └─ Efficient indexes for performance                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## 🔄 Authentication Flow

### Registration Flow

```
User fills signup form
        ↓
Frontend validates input
        ↓
POST /api/auth/register (email, password, firstName, lastName)
        ↓
Backend validates email format & password strength
        ↓
Check if user already exists in database
        ↓
Hash password with bcryptjs (10 rounds)
        ↓
Create user in Supabase Auth
        ↓
Create user profile in database
        ↓
Generate JWT tokens (Access + Refresh)
        ↓
Return tokens to frontend
        ↓
Frontend stores tokens in localStorage
        ↓
Frontend redirects to /dashboard
        ↓
User is now authenticated ✅
```

### Login Flow

```
User fills login form
        ↓
Frontend validates input
        ↓
POST /api/auth/login (email, password)
        ↓
Backend looks up user in Supabase
        ↓
Verify password against hash
        ↓
Password matches? YES → Continue | NO → Return 401 error
        ↓
Fetch full user profile from database
        ↓
Generate JWT tokens (Access + Refresh)
        ↓
Return tokens + user data to frontend
        ↓
Frontend stores tokens in localStorage
        ↓
Frontend redirects to /dashboard
        ↓
User is now authenticated ✅
```

### Google OAuth Flow

```
User clicks "Sign in with Google"
        ↓
Frontend redirects to GET /api/auth/google
        ↓
Backend initiates Supabase OAuth with Google provider
        ↓
Backend redirects to Google login page
        ↓
User completes Google authentication
        ↓
Google redirects to /api/auth/google/callback with auth code
        ↓
Backend exchanges code for Supabase session
        ↓
Check if user profile exists in database
        ↓
If NOT exists → Create new user profile
        ↓
Generate JWT tokens
        ↓
Backend redirects to frontend with tokens in URL
        ↓
Frontend extracts tokens from URL
        ↓
Frontend stores tokens in localStorage
        ↓
Frontend redirects to /dashboard
        ↓
User is now authenticated ✅
```

### Protected API Request Flow

```
Frontend has accessToken from login/auth
        ↓
Frontend makes API request (GET /api/users/profile)
        ↓
apiClient adds Authorization header:
   Authorization: Bearer {accessToken}
        ↓
Request sent to backend
        ↓
Backend middleware: authMiddleware
   ↓
   Extract token from Authorization header
   ↓
   Verify token signature using JWT_SECRET
   ↓
   Token valid? YES → Continue | NO → Return 401
   ↓
   Add decoded user info to req.user
        ↓
Controller executes business logic with authenticated user
        ↓
Query database (with RLS filtering user's own data)
        ↓
Return response to frontend
        ↓
Frontend receives data
        ↓
Success ✅
```

### Token Refresh Flow

```
AccessToken is about to expire (frontend checks)
        ↓
Frontend has refreshToken in localStorage
        ↓
Frontend calls POST /api/auth/refresh-token
   Request body: { refreshToken: "..." }
        ↓
Backend verifies refreshToken
        ↓
Token valid? YES → Continue | NO → Return 401
        ↓
Generate NEW JWT tokens
        ↓
Return new tokens to frontend
        ↓
Frontend updates localStorage with new tokens
        ↓
Continue making requests with new accessToken
        ↓
Success ✅
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Layer 1: Frontend Validation                          │
│  └─ Email format, password strength validation         │
│                                                         │
│  Layer 2: HTTPS/TLS                                    │
│  └─ Encrypted data in transit                          │
│                                                         │
│  Layer 3: CORS                                         │
│  └─ Only allow requests from frontend domain           │
│                                                         │
│  Layer 4: Input Validation                             │
│  └─ Sanitize and validate all inputs                   │
│                                                         │
│  Layer 5: JWT Token Verification                       │
│  └─ Verify token signature & expiration                │
│                                                         │
│  Layer 6: Password Hashing                             │
│  └─ bcryptjs with 10 salt rounds                       │
│                                                         │
│  Layer 7: Row Level Security (RLS)                     │
│  └─ Database policies prevent unauthorized access      │
│                                                         │
│  Layer 8: Error Handling                               │
│  └─ Never expose sensitive info in error messages      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 📊 Database Schema Relationships

```
┌────────────────┐
│     USERS      │◄────────────┐
├────────────────┤             │
│ id (PK)        │             │
│ email          │             │
│ first_name     │             │
│ last_name      │             │
│ auth_method    │             │
│ created_at     │             │
│ updated_at     │             │
└────────────────┘             │
        ▲                       │
        │ (1:N relationship)    │
        │                       │
┌───────┴──────────┐            │
│  MEAL_PLANS      │            │
├──────────────────┤            │
│ id (PK)          │            │
│ user_id (FK)  ───┼───────────┘
│ date             │
│ total_calories   │
│ total_protein    │
│ total_carbs      │
│ total_fat        │
│ created_at       │
│ updated_at       │
└──────────────────┘
        ▲
        │ (1:N relationship)
        │
┌───────┴──────────┐
│      MEALS       │
├──────────────────┤
│ id (PK)          │
│ meal_plan_id (FK)│
│ user_id (FK)     │
│ meal_type        │
│ food_name        │
│ calories         │
│ protein          │
│ carbs            │
│ fat              │
│ quantity         │
│ unit             │
│ created_at       │
│ updated_at       │
└──────────────────┘

┌────────────────────────┐
│ HYDRATION_LOGS        │
├────────────────────────┤
│ id (PK)                │
│ user_id (FK) ─────────►│ USERS
│ date                   │
│ amount_ml              │
│ created_at             │
└────────────────────────┘

┌────────────────────────┐
│ TRAINING_LOGS         │
├────────────────────────┤
│ id (PK)                │
│ user_id (FK) ─────────►│ USERS
│ date                   │
│ activity_type          │
│ duration_minutes       │
│ intensity              │
│ calories_burned        │
│ notes                  │
│ created_at             │
│ updated_at             │
└────────────────────────┘
```

## 🔄 Data Flow Examples

### Sign Up Flow
```
User inputs: email, password, name
    ↓
Frontend validates
    ↓
POST /api/auth/register
    ↓
Backend Controller:
  • Validate inputs
  • Check email exists
  • Hash password
  • Create Supabase user
  • Create DB profile
  • Generate tokens
    ↓
Return { accessToken, refreshToken, userId, email }
    ↓
Frontend stores in localStorage
    ↓
Frontend redirects to /dashboard
```

### Load Dashboard
```
User visits /dashboard
    ↓
Route checks if token exists
    ↓
Token exists? YES → Load component | NO → Redirect to /login
    ↓
Component mounts
    ↓
useCurrentUser() hook gets user from store
    ↓
Display user's data
```

### Make Protected Request
```
Component needs user data
    ↓
Call API: GET /api/users/profile
    ↓
apiClient adds Authorization header with token
    ↓
Backend authMiddleware verifies token
    ↓
Valid? YES → Continue | NO → Return 401 (frontend redirects to login)
    ↓
Controller fetches from database with RLS filtering
    ↓
Return user's data
    ↓
Frontend updates UI
```

## 📈 Scaling Considerations

```
Current Setup (Single Region)
├─ Frontend: Vite + React
├─ Backend: Express.js (vertical scaling)
└─ Database: Supabase (managed by Supabase)

Production Setup (Multi-Region)
├─ Frontend: CDN + Static Hosting (Vercel, Netlify)
├─ Backend: Load balanced servers (Heroku, AWS ECS)
├─ Database: Supabase with read replicas
└─ Cache: Redis for session management

Cache Strategy
├─ Frontend: Browser localStorage for tokens
├─ Backend: Redis for session tokens (future)
└─ Database: Supabase query optimization
```

## 🎯 Component Relationship

```
App.jsx
├─ useAuthPersistence()      [Load tokens from storage]
├─ useTokenRefresh()         [Auto refresh tokens]
├─ useGoogleLoginHandler()   [Handle OAuth callback]
│
├─ Router
│   ├─ PublicRoute (/login, /signup)
│   │   └─ Uses: useAuthStore (login, register)
│   │
│   └─ ProtectedRoute (/dashboard, etc)
│       ├─ Checks: isAuthenticated()
│       └─ Uses: useCurrentUser(), useLogout()
│
└─ Navbar (optional)
    └─ Shows: User info if authenticated
```

---

This comprehensive architecture ensures:
✅ Security at multiple layers  
✅ Scalability for growth  
✅ Maintainability of code  
✅ Clear data flow  
✅ Protected routes  
✅ Proper separation of concerns  
