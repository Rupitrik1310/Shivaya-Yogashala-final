# ⚡ Quick Netlify Deployment Checklist

**Fast-track deployment guide - 10 minutes total**

---

## ✅ Pre-Deployment (2 min)

- [ ] GitHub account created
- [ ] Netlify account created (netlify.com)
- [ ] Code ready (you have it!)

---

## 🚀 Deployment Steps

### 1️⃣ Push to GitHub (3 min)

```bash
# In your project folder:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/shivaya-yogashala.git
git push -u origin main
```

**Replace YOUR_USERNAME with your GitHub username!**

---

### 2️⃣ Deploy on Netlify (5 min)

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"**
4. Select **`shivaya-yogashala`** repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**
7. Wait 3-5 minutes ⏳

---

### 3️⃣ Customize (1 min)

1. Click **"Site settings"** → **"Change site name"**
2. Enter: `shivaya-yogashala`
3. Click **"Save"**

**Your URL:** `https://shivaya-yogashala.netlify.app`

---

### 4️⃣ Seed Data (5 min)

1. Visit: `https://shivaya-yogashala.netlify.app?admin=true`
2. Click **"Seed 3 Teachers"** ✅
3. Click **"Seed 4 Courses"** ✅
4. Click **"Seed 50 Asanas"** ✅

---

## 🎉 Done! Your site is LIVE!

**Main Site:**
```
https://shivaya-yogashala.netlify.app
```

**Admin Panel:**
```
https://shivaya-yogashala.netlify.app?admin=true
```

---

## 🧪 Quick Test

- [ ] Homepage loads
- [ ] Navigate to all 5 pages
- [ ] Submit test enrollment form
- [ ] Test WhatsApp button
- [ ] Open on mobile

---

## 🔄 Future Updates

```bash
# Make changes, then:
git add .
git commit -m "Update content"
git push

# Netlify automatically deploys! 🚀
```

---

## 📚 Detailed Guide

Need more help? See: **`/NETLIFY_DEPLOYMENT_GUIDE.md`**

---

**ॐ नमः शिवाय** (Om Namah Shivaya)

**Total Time:** 10-15 minutes  
**Difficulty:** Easy  
**Cost:** FREE

---
