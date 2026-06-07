# 📋 Backend & Auth Setup Checklist

Complete checklist to set up your authentication system. Follow these steps in order.

## Phase 1: Preparation (5 minutes)

### ☐ 1.1 Supabase Project Setup
- [ ] Create account at [supabase.com](https://supabase.com)
- [ ] Create new Supabase project
- [ ] Wait for project to initialize
- [ ] Go to **Settings → API**
- [ ] Copy **Project URL** (save it)
- [ ] Copy **Anon Key** (save it)
- [ ] Copy **Service Role Key** (save it)
- [ ] Go to **Settings → Auth → JWT Secret** and copy it

### ☐ 1.2 Google OAuth (Optional)
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Create new project
- [ ] Enable **Google+ API**
- [ ] Go to **Credentials → Create OAuth 2.0 Client ID**
- [ ] Select "Web application"
- [ ] Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
- [ ] Copy **Client ID** (save it)
- [ ] Copy **Client Secret** (save it)

## Phase 2: Backend Setup (5 minutes)

### ☐ 2.1 Environment Configuration
```bash
cd backend
cp .env.example .env.local
```
- [ ] Open `.env.local` in editor
- [ ] Fill in `SUPABASE_URL` (from 1.1)
- [ ] Fill in `SUPABASE_ANON_KEY` (from 1.1)
- [ ] Fill in `SUPABASE_SERVICE_ROLE_KEY` (from 1.1)
- [ ] Fill in `SUPABASE_JWT_SECRET` (from 1.1)
- [ ] Fill in `GOOGLE_CLIENT_ID` (from 1.2, optional)
- [ ] Fill in `GOOGLE_CLIENT_SECRET` (from 1.2, optional)
- [ ] Generate strong `JWT_SECRET`:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  Copy the output and paste it as `JWT_SECRET`
- [ ] Save `.env.local`

### ☐ 2.2 Install Dependencies
```bash
npm install
```
- [ ] Wait for installation to complete
- [ ] Check for any warnings/errors

### ☐ 2.3 Verify Backend Runs
```bash
npm run dev
```
- [ ] Terminal shows: "✅ Backend server running on http://localhost:5000"
- [ ] Keep this terminal open
- [ ] Open new terminal window for next steps

## Phase 3: Database Setup (2 minutes)

### ☐ 3.1 Create Tables
- [ ] Go to Supabase Dashboard
- [ ] Navigate to **SQL Editor**
- [ ] Click **New Query**
- [ ] Open file: `backend/supabase_schema.sql`
- [ ] Copy entire content
- [ ] Paste into Supabase SQL editor
- [ ] Click **Run**
- [ ] Wait for completion message (should show ✅)

### ☐ 3.2 Verify Tables Created
- [ ] In Supabase, go to **Table Editor**
- [ ] Verify you see these tables:
  - [ ] `users`
  - [ ] `meal_plans`
  - [ ] `meals`
  - [ ] `hydration_logs`
  - [ ] `training_logs`

## Phase 4: Frontend Setup (2 minutes)

### ☐ 4.1 Install Frontend Dependencies
```bash
# Go back to root directory
cd ..
npm install
```
- [ ] Wait for installation
- [ ] Check for warnings

### ☐ 4.2 Create Frontend Environment (Optional)
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```
- [ ] File created: `.env.local`
- [ ] Content: `VITE_API_URL=http://localhost:5000/api`

### ☐ 4.3 Start Frontend
```bash
npm run dev
```
- [ ] Terminal shows: `VITE v... ready in ... ms`
- [ ] Shows: `Local: http://localhost:5173/`

## Phase 5: Testing (2 minutes)

### ☐ 5.1 Test Backend is Running
- [ ] Open browser
- [ ] Go to `http://localhost:5000/health`
- [ ] Should see JSON response with `"success": true`

### ☐ 5.2 Test Frontend is Running
- [ ] Open new browser tab
- [ ] Go to `http://localhost:5173`
- [ ] Should see your app home page

### ☐ 5.3 Test Signup
- [ ] Click "Sign Up" (or navigate to `/signup`)
- [ ] Fill in form:
  - [ ] First Name: Test
  - [ ] Last Name: User
  - [ ] Email: test@example.com
  - [ ] Password: TestPassword123
  - [ ] Confirm Password: TestPassword123
- [ ] Click "Create Account"
- [ ] Should be redirected to `/dashboard`
- [ ] Should see "Welcome, Test!" (or similar)

### ☐ 5.4 Test Login
- [ ] Click "Logout" button
- [ ] Should be redirected to `/login`
- [ ] Enter email: test@example.com
- [ ] Enter password: TestPassword123
- [ ] Click "Sign In"
- [ ] Should be redirected to `/dashboard`

### ☐ 5.5 Test Protected Routes
- [ ] While logged in, go to `/dashboard`
- [ ] Should load successfully
- [ ] Open browser Dev Tools → Application → localStorage
- [ ] Should see `accessToken` and `refreshToken`

### ☐ 5.6 Test Token Persistence
- [ ] Refresh page (Ctrl+R or Cmd+R)
- [ ] Should still be logged in (not redirected to login)
- [ ] User should still be visible

### ☐ 5.7 Test Logout
- [ ] Click "Logout" button
- [ ] Should be redirected to `/login`
- [ ] Open localStorage
- [ ] `accessToken` should be cleared

### ☐ 5.8 Test Unauthorized Access
- [ ] Go to `http://localhost:5173/dashboard` (without logging in)
- [ ] Should be redirected to `/login`

## Phase 6: API Testing (2 minutes, Optional)

### ☐ 6.1 Test with cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"curl@example.com","password":"pass123","firstName":"Curl","lastName":"Test"}'
```
- [ ] Should return `"success": true` with tokens

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"curl@example.com","password":"pass123"}'
```
- [ ] Should return tokens

**Get Current User (replace TOKEN):**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```
- [ ] Should return user profile

## Phase 7: Google OAuth Setup (Optional, 5 minutes)

### ☐ 7.1 Configure Google Provider in Supabase
- [ ] Go to Supabase Dashboard
- [ ] Navigate to **Authentication → Providers**
- [ ] Find **Google** provider
- [ ] Click **Enable**
- [ ] Paste your **Google Client ID**
- [ ] Paste your **Google Client Secret**
- [ ] Save

### ☐ 7.2 Test Google Login
- [ ] Go to `http://localhost:5173/login`
- [ ] Click "Sign in with Google"
- [ ] Complete Google authentication
- [ ] Should be redirected to dashboard

## Phase 8: Production Checklist (For Later)

### Before Deploying to Production:

- [ ] Change `NODE_ENV=production` in backend `.env`
- [ ] Set `FRONTEND_URL` to your production domain
- [ ] Generate strong `JWT_SECRET` (don't reuse local)
- [ ] Update Supabase credentials to production project
- [ ] Enable HTTPS/SSL certificate
- [ ] Set up database backups
- [ ] Configure custom domain
- [ ] Set up monitoring/logging
- [ ] Enable email verification (optional)
- [ ] Set up password reset flow (optional)
- [ ] Review security settings
- [ ] Test all auth flows in production
- [ ] Set up CI/CD pipeline

## 🐛 Troubleshooting

### Backend won't start
**Problem:** `Error: Missing Supabase configuration`
**Solution:**
- [ ] Check `.env.local` exists in backend folder
- [ ] Verify all SUPABASE_* variables are filled
- [ ] Restart: `npm run dev`

### CORS error in frontend
**Problem:** `Access to XMLHttpRequest blocked by CORS policy`
**Solution:**
- [ ] Check `FRONTEND_URL` in backend `.env.local` matches your frontend URL
- [ ] Make sure backend is running on port 5000
- [ ] Try clearing browser cache
- [ ] Restart both backend and frontend

### Login fails with 401
**Problem:** `Invalid email or password`
**Solution:**
- [ ] Double-check email and password are correct
- [ ] Verify database tables were created (Phase 3)
- [ ] Check Supabase project is the correct one
- [ ] Try registering a new account

### Tokens not saving
**Problem:** localStorage is empty after login
**Solution:**
- [ ] Check browser localStorage is enabled
- [ ] Check browser is not in Private/Incognito mode
- [ ] Check browser console for errors
- [ ] Clear browser cache and try again

### Google OAuth fails
**Problem:** Redirect loop or blank page
**Solution:**
- [ ] Verify Google Client ID is correct in `.env.local`
- [ ] Verify Google Client Secret is correct
- [ ] Check redirect URI in Google Cloud Console matches exactly
- [ ] Make sure Google+ API is enabled

## 📞 Support & Resources

- **Backend Docs:** See `backend/README.md`
- **Setup Guide:** See `BACKEND_SETUP.md`
- **Frontend Guide:** See `FRONTEND_INTEGRATION.md`
- **Architecture:** See `ARCHITECTURE.md`
- **Supabase Docs:** https://supabase.com/docs
- **Express Docs:** https://expressjs.com

## ✅ Completion Checklist

After completing all phases, verify:

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can sign up new user
- [ ] Can login with email/password
- [ ] Can logout
- [ ] Protected routes work
- [ ] Tokens persist after refresh
- [ ] Google OAuth works (optional)
- [ ] API endpoints respond correctly
- [ ] Database tables exist
- [ ] RLS policies active

## 🎉 You're Ready!

Once all checkboxes are complete:

1. ✅ Backend authentication is working
2. ✅ Database is properly configured
3. ✅ Frontend is integrated with backend
4. ✅ Auth flows are tested
5. ✅ Protected routes are working

**Next Steps:**
- Start building app features
- Add meal planning functionality
- Add nutrition tracking
- Add progress analytics
- Deploy to production

---

**Estimated Total Time:** 15-20 minutes  
**Date Completed:** _______________  
**Notes:** _______________________
