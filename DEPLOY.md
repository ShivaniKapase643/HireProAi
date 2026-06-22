# 🚀 SmartHire AI — Deployment Guide

Complete step-by-step guide to deploy SmartHire AI to production.

---

## 📋 Prerequisites

Before deploying, set up these free accounts:

1. **MongoDB Atlas** (Database) — [Sign up](https://www.mongodb.com/cloud/atlas/register)
2. **Render** (Backend hosting) — [Sign up](https://render.com)
3. **Netlify** or **Vercel** (Frontend hosting) — [Netlify](https://netlify.com) | [Vercel](https://vercel.com)
4. **Google AI Studio** (Optional - for Gemini AI) — [Get API Key](https://aistudio.google.com/apikey)
5. **GitHub** account with this repo pushed

---

## 🗄️ Step 1: Set up MongoDB Atlas (Database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register) and sign up
2. Click **"Build a Database"** → Choose **M0 FREE** tier
3. Pick a region (closest to your users — e.g., Mumbai for India)
4. Click **"Create"**

### Create Database User
1. Go to **Database Access** → **"Add New Database User"**
2. Username: `smarthire`
3. Password: Click **"Autogenerate"** and **copy it somewhere safe**
4. Role: **"Read and write to any database"**
5. Click **"Add User"**

### Allow Network Access
1. Go to **Network Access** → **"Add IP Address"**
2. Click **"ALLOW ACCESS FROM ANYWHERE"** (`0.0.0.0/0`)
3. Click **"Confirm"**

### Get Connection String
1. Go to **Database** → Click **"Connect"** on your cluster
2. Choose **"Drivers"** → Select **Node.js** driver
3. Copy the connection string. It looks like:
   ```
   mongodb+srv://smarthire:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name `smarthire-ai` before the `?`:
   ```
   mongodb+srv://smarthire:YourPass123@cluster0.xxxxx.mongodb.net/smarthire-ai?retryWrites=true&w=majority
   ```

**Save this URI — you'll need it in Step 2.**

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Push Code to GitHub

```bash
cd c:\HireProAi
git add .
git commit -m "Production-ready deployment"
git push origin main
```

### 2.2 Create Web Service on Render

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"+ New"** → **"Web Service"**
3. Connect your GitHub account & select **HireProAi** repository
4. Configure:

| Field | Value |
|-------|-------|
| **Name** | `smarthire-backend` |
| **Region** | Oregon (or closest to MongoDB region) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** for each:

```env
NODE_ENV=production
JWT_SECRET=bb38080da468457903ee86ce8e001fd81a36186f061c73a144f058cee7aeca13
JWT_EXPIRE=7d
MONGODB_URI=mongodb+srv://smarthire:YourPass@cluster0.xxxxx.mongodb.net/smarthire-ai?retryWrites=true&w=majority
CLIENT_URL=*
```

> **Important:** Do NOT set `PORT` — Render assigns it automatically.

### 2.4 Optional Variables (Add as needed)

```env
GEMINI_API_KEY=your-key-from-aistudio.google.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2.5 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for the first deploy
3. Once it shows **"Live"** with a green dot, copy the URL:
   ```
   https://smarthire-backend.onrender.com
   ```
4. Test it: visit `https://smarthire-backend.onrender.com/api/health`
   You should see:
   ```json
   { "status": "ok", "timestamp": "...", "uptime": 5.2 }
   ```

---

## 🌐 Step 3: Deploy Frontend to Netlify

### 3.1 Push to GitHub (already done in Step 2)

### 3.2 Create New Site on Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → Select **HireProAi** repo

### 3.3 Configure Build Settings

| Field | Value |
|-------|-------|
| **Branch** | `main` |
| **Base directory** | `frontend` |
| **Build command** | `npm install && npm run build` |
| **Publish directory** | `frontend/dist` |

### 3.4 Add Environment Variables

Before clicking deploy, click **"Add environment variables"**:

```env
VITE_API_URL=https://smarthire-backend.onrender.com/api/v1
VITE_SOCKET_URL=https://smarthire-backend.onrender.com
NODE_VERSION=20
```

> Replace `smarthire-backend.onrender.com` with **your actual Render URL** from Step 2.5.

### 3.5 Deploy

1. Click **"Deploy site"**
2. Wait 2-3 minutes
3. Copy your Netlify URL (e.g., `https://amazing-name-12345.netlify.app`)
4. (Optional) Change site name: **Site settings** → **Change site name** → `smarthire-ai`

---

## 🔁 Step 4: Update Backend CORS

Now that you have your frontend URL, update Render:

1. Go to your Render service → **Environment**
2. Edit `CLIENT_URL`:
   ```
   CLIENT_URL=https://smarthire-ai.netlify.app
   ```
3. Save — Render will auto-redeploy

---

## ✅ Step 5: Verify Deployment

### Test Backend
```bash
curl https://smarthire-backend.onrender.com/api/health
```
Should return: `{"status":"ok",...}`

### Test Frontend
1. Open `https://smarthire-ai.netlify.app`
2. Click **"Create Account"**
3. Register with any email/password
4. You should be redirected to the dashboard

### Test Full Flow
- ✅ Register → Login → Dashboard works
- ✅ Profile edit & save works
- ✅ Mock Interview generates questions
- ✅ Resume analyzer accepts uploads
- ✅ Job tracker adds applications

---

## 🚨 Common Issues & Fixes

### Issue 1: Backend "Exited with status 1" on Render

**Cause:** Usually missing/wrong env variables or Winston trying to write to `logs/` directory.

**Fix:**
- Make sure `NODE_ENV=production` is set
- Make sure `JWT_SECRET` is at least 32 characters
- Check Render logs for the exact error
- Verify MongoDB URI is correct (test connection in MongoDB Compass)

### Issue 2: Frontend shows "Network Error"

**Cause:** Wrong `VITE_API_URL` or backend not running.

**Fix:**
- Visit your backend URL directly — does `/api/health` work?
- Check `VITE_API_URL` in Netlify includes `/api/v1` at the end
- Make sure backend `CLIENT_URL` matches your Netlify URL

### Issue 3: CORS errors in browser console

**Cause:** Backend doesn't allow your frontend origin.

**Fix:**
- Set `CLIENT_URL=*` temporarily on Render (allows all origins)
- Once working, change to your actual Netlify URL for security

### Issue 4: MongoDB connection timeout

**Cause:** IP whitelist doesn't include Render's IPs.

**Fix:**
- Go to MongoDB Atlas → Network Access
- Verify `0.0.0.0/0` is in the IP whitelist

### Issue 5: Render free tier spins down

**Cause:** Free tier sleeps after 15 mins of inactivity. First request takes 50+ seconds.

**Fix:**
- This is normal for free tier
- For production, upgrade to **Starter ($7/mo)** for always-on
- Or use [uptimerobot.com](https://uptimerobot.com) to ping your service every 5 mins (workaround)

### Issue 6: Tests fail locally

**Fix:**
```bash
cd backend
npm install
npm test
```

---

## 🐳 Alternative: Deploy with Docker

### Local Docker
```bash
docker-compose up --build
```

### Deploy with Docker on Render
1. Add a `Dockerfile` to `backend/` (already configured)
2. In Render, select **"Docker"** runtime instead of Node
3. Build Command: leave empty
4. Start Command: leave empty (uses CMD from Dockerfile)

---

## 📊 Production Checklist

Before going live, verify:

- [ ] MongoDB Atlas backup enabled
- [ ] `JWT_SECRET` is unique and 32+ chars (not the example one)
- [ ] `CLIENT_URL` set to actual frontend URL (not `*`)
- [ ] All API endpoints return correct status codes
- [ ] Frontend builds without errors
- [ ] Custom domain set up (optional)
- [ ] HTTPS enabled (automatic on Render/Netlify)
- [ ] Error monitoring set up (Sentry, LogRocket)
- [ ] Analytics added (Google Analytics, Plausible)

---

## 🔐 Generate New JWT Secret

For production, generate a fresh JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🌍 Custom Domain Setup

### On Render (Backend)
1. **Settings** → **Custom Domain**
2. Add `api.smarthireai.com`
3. Update your DNS with the CNAME record Render provides

### On Netlify (Frontend)
1. **Domain settings** → **Add custom domain**
2. Add `smarthireai.com`
3. Update your DNS with the records Netlify provides

After custom domains:
- Update `VITE_API_URL=https://api.smarthireai.com/api/v1`
- Update `CLIENT_URL=https://smarthireai.com`

---

## 📞 Support

If deployment still fails after following this guide:
- Check Render logs: **Dashboard** → Your Service → **Logs**
- Check Netlify build logs: **Deploys** → Click latest deploy
- Review the GitHub Actions output if using CI/CD

---

## 🎉 You're Live!

After successful deployment:

- 🌐 **Frontend:** https://smarthire-ai.netlify.app
- 🔧 **Backend API:** https://smarthire-backend.onrender.com
- 📊 **Health Check:** https://smarthire-backend.onrender.com/api/health
- 📚 **API Docs:** https://smarthire-backend.onrender.com/api/v1

**Made with ❤️ by Team TwinTech**
