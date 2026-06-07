# Vercel Deployment Guide

## 📋 Overview

This application has two separate deployments:
- **Frontend**: React + Vite (Vercel)
- **Backend**: Node.js + Express (Heroku, Railway, or Render)

---

## 🚀 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
```bash
# Install dependencies
npm install

# Test build locally
npm run build

# Preview the build
npm run preview
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
cd d:\athlete-nutrition-app
vercel
```

#### Option B: Using GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Vercel auto-detects Vite configuration
6. Set environment variables (see below)
7. Click "Deploy"

### Step 3: Set Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_API_URL = https://your-backend.herokuapp.com/api
```

---

## 🔧 Backend Deployment Options

### Option 1: Heroku (Recommended for Small Apps)

#### Step 1: Create Heroku App
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add buildpack for Node.js
heroku buildpacks:add heroku/nodejs
```

#### Step 2: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
heroku config:set SUPABASE_URL=your_supabase_url
heroku config:set SUPABASE_ANON_KEY=your_anon_key
heroku config:set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
heroku config:set SUPABASE_JWT_SECRET=your_jwt_secret
heroku config:set JWT_SECRET=your_jwt_secret
```

#### Step 3: Deploy
```bash
cd backend
git push heroku main
```

#### Step 4: View Logs
```bash
heroku logs --tail
```

---

### Option 2: Railway (Easy Deployment)

#### Step 1: Sign Up
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub"
3. Select your repository
4. Railway auto-detects Node.js

#### Step 3: Add Variables
In Railway Dashboard → Variables:
- `NODE_ENV`: production
- `PORT`: 5000
- `FRONTEND_URL`: https://your-frontend.vercel.app
- All Supabase credentials

#### Step 4: Deploy
- Select `backend` directory
- Click "Deploy"

---

### Option 3: Render (Free Tier Available)

#### Step 1: Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

#### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Select root directory: `backend`

#### Step 3: Configure
- **Name**: athlete-nutrition-backend
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### Step 4: Add Environment Variables
Same as Heroku/Railway setup

#### Step 5: Deploy
- Click "Deploy"

---

## 🔗 Update Frontend for Production

After deploying backend, update your environment variable:

In Vercel Dashboard:
```
VITE_API_URL = https://your-backend-domain.com/api
```

This will be automatically picked up by your frontend on redeploy.

---

## 🧪 Test Everything Works

After deployment:

### Test Frontend
```bash
# Frontend should load at https://your-app.vercel.app
# Test:
# 1. Can you sign up?
# 2. Can you login?
# 3. Are you redirected to dashboard?
```

### Test Backend API
```bash
# Test registration
curl -X POST https://your-backend.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Test login
curl -X POST https://your-backend.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🔐 Security Checklist

- [ ] All sensitive data is in environment variables (NOT in code)
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] JWT_SECRET is different from SUPABASE_JWT_SECRET
- [ ] CORS is configured for your frontend domain
- [ ] HTTPS is enabled (Vercel/Heroku/Railway all support this)
- [ ] Database RLS policies are enabled
- [ ] No debug logs expose user data

---

## 📊 Monitoring

### Vercel
- Dashboard shows deployment status
- Analytics tab shows performance metrics
- Logs tab shows build/runtime errors

### Heroku
```bash
heroku logs --tail
heroku metrics
```

### Railway
- Dashboard shows real-time metrics
- Deployments tab shows history

### Render
- Dashboard shows metrics
- Logs section shows errors

---

## 🚨 Troubleshooting

### Frontend won't load
1. Check Vercel logs
2. Verify build is working: `npm run build`
3. Check VITE_API_URL is set correctly

### API calls returning 404/500
1. Check backend logs
2. Verify environment variables are set
3. Check Supabase connection
4. Test endpoint with curl

### CORS errors
```
Access-Control-Allow-Origin error
```
Solution: Update backend CORS configuration with your Vercel domain

### Database connection failing
1. Verify Supabase credentials in env
2. Check database is not paused (Supabase free tier pauses inactive projects)
3. Run `backend/supabase_schema.sql` if tables don't exist

---

## 📈 Custom Domain

### Vercel
1. Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records

### Heroku
```bash
heroku domains:add yourdomain.com
# Then update DNS records
```

---

## 💰 Pricing

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Vercel | ✅ 100GB bandwidth | Generous free tier |
| Heroku | ⚠️ Paid only now | $7/month minimum |
| Railway | ✅ $5/month credit | Great for small apps |
| Render | ✅ Free tier | Sleeps after 15min inactivity |
| Supabase | ✅ Free tier | 500MB database storage |

---

## 🎯 Production Checklist

Before going live:

- [ ] Frontend builds without errors
- [ ] Backend starts without errors
- [ ] Environment variables are set
- [ ] Database schema is created
- [ ] Can signup/login/logout
- [ ] Protected routes work
- [ ] API endpoints respond correctly
- [ ] Errors are handled gracefully
- [ ] No console errors/warnings
- [ ] Performance is acceptable (< 3s load time)

---

## 📞 Support

If you encounter issues:

1. **Vercel Issues** → [Vercel Docs](https://vercel.com/docs)
2. **Heroku Issues** → [Heroku Docs](https://devcenter.heroku.com)
3. **Railway Issues** → [Railway Docs](https://docs.railway.app)
4. **Render Issues** → [Render Docs](https://render.com/docs)
5. **Supabase Issues** → [Supabase Docs](https://supabase.com/docs)

---

**Happy Deploying! 🚀**
