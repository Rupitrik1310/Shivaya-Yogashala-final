# 🚀 Netlify Deployment Guide - Shivaya Yogashala

**Complete step-by-step guide to deploy your website to Netlify**

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ GitHub account (or GitLab/Bitbucket)
- ✅ Netlify account (free - sign up at netlify.com)
- ✅ Your website code ready (you have it!)
- ✅ Supabase project configured (you have it!)

**Time Required:** 10-15 minutes

---

## 🎯 Deployment Method

We'll use **Method 1** (Recommended): Deploy via Git (GitHub)

**Benefits:**
- Automatic deployments on code changes
- Version control
- Easy rollbacks
- Free SSL certificate
- Free hosting

---

## 📝 Step-by-Step Instructions

### **Step 1: Prepare Your Code** (2 minutes)

#### 1.1 Verify Configuration Files ✅

You already have these files created:
- ✅ `/netlify.toml` - Netlify configuration
- ✅ `/public/_redirects` - SPA routing

#### 1.2 Check package.json

Make sure your `package.json` has these scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Note:** If you don't have a package.json, Netlify will auto-detect the build settings.

---

### **Step 2: Push to GitHub** (3 minutes)

#### 2.1 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **"+"** icon (top right)
3. Select **"New repository"**
4. Name it: `shivaya-yogashala`
5. Keep it **Public** (or Private if you prefer)
6. Click **"Create repository"**

#### 2.2 Initialize Git (if not already done)

Open terminal in your project folder and run:

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Shivaya Yogashala website"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/shivaya-yogashala.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

#### 2.3 Verify on GitHub

- Go to your repository on GitHub
- You should see all your files uploaded
- Verify the files are there: App.tsx, components/, styles/, etc.

---

### **Step 3: Connect Netlify to GitHub** (5 minutes)

#### 3.1 Login to Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Click **"Sign up"** (or "Log in" if you have an account)
3. Choose **"Sign up with GitHub"** (recommended)
4. Authorize Netlify to access your GitHub account

#### 3.2 Create New Site

1. Click **"Add new site"** button (or "Sites" → "Add new site")
2. Select **"Import an existing project"**
3. Choose **"Deploy with GitHub"**

#### 3.3 Authorize Netlify

1. Click **"Authorize Netlify"** if prompted
2. You may need to enter your GitHub password
3. Grant Netlify access to your repositories

#### 3.4 Select Repository

1. Find and click on **`shivaya-yogashala`** repository
2. If you don't see it, click **"Configure Netlify on GitHub"**
3. Grant access to the repository
4. Return to Netlify and select it

---

### **Step 4: Configure Build Settings** (2 minutes)

Netlify will show build settings. Configure as follows:

#### Build Settings:

**Branch to deploy:**
```
main
```

**Build command:**
```
npm run build
```

**Publish directory:**
```
dist
```

**Advanced settings (optional - skip for now):**
- Environment variables: None needed (Supabase info already in code)

#### Click "Deploy site"

Netlify will now:
1. ✅ Clone your repository
2. ✅ Install dependencies
3. ✅ Build your site
4. ✅ Deploy to CDN
5. ✅ Generate SSL certificate

**This takes 2-5 minutes.**

---

### **Step 5: Wait for Deployment** (3-5 minutes)

#### 5.1 Monitor Build Process

You'll see:
```
Building...
├── Cloning repository
├── Installing dependencies
├── Building production bundle
├── Optimizing assets
└── Deploying to CDN
```

#### 5.2 Deployment Success

When complete, you'll see:
```
✅ Site is live!
```

Your site URL will look like:
```
https://random-name-123456.netlify.app
```

---

### **Step 6: Customize Your Domain** (1 minute)

#### 6.1 Change Site Name

1. Go to **Site settings**
2. Click **"Change site name"**
3. Enter: `shivaya-yogashala` (or your preferred name)
4. Click **"Save"**

Your new URL:
```
https://shivaya-yogashala.netlify.app
```

#### 6.2 (Optional) Add Custom Domain

If you have a custom domain (e.g., shivayayogashala.com):

1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Netlify will auto-configure SSL

---

### **Step 7: Verify Deployment** (2 minutes)

#### 7.1 Test Your Live Site

Visit your Netlify URL and verify:

- [ ] ✅ Homepage loads correctly
- [ ] ✅ Navigation works (all 5 pages)
- [ ] ✅ Images display properly
- [ ] ✅ Rotating Mandala Menu opens
- [ ] ✅ Forms work
- [ ] ✅ Supabase connection works
- [ ] ✅ WhatsApp button functions
- [ ] ✅ Mobile responsive
- [ ] ✅ SSL certificate active (https://)

#### 7.2 Test Admin Panel

Visit:
```
https://your-site.netlify.app?admin=true
```

Verify admin panel opens correctly.

---

### **Step 8: Seed Initial Data** (5 minutes)

**IMPORTANT:** You need to add initial data!

1. Visit: `https://your-site.netlify.app?admin=true`
2. Click **"Seed 3 Teachers"**
3. Wait for success message
4. Click **"Seed 4 Courses"**
5. Wait for success message
6. Click **"Seed 50 Asanas"**
7. Wait for success message

**Now your site has content!**

#### Verify Data Loaded:

1. Visit homepage
2. Scroll to "Explore Our Courses" section
3. You should see 3 course cards
4. Click "View All Courses"
5. You should see all 4 courses
6. Visit "About Us" → Should show teachers
7. Visit "Asana Library" → Should show asanas

---

## 🎉 Congratulations! Your Site is Live!

### Your Live URLs:

**Main Site:**
```
https://shivaya-yogashala.netlify.app
```

**Admin Panel:**
```
https://shivaya-yogashala.netlify.app?admin=true
```

---

## 🔄 Automatic Deployments

**From now on:**
- Every time you push to GitHub → Netlify automatically deploys
- No manual steps needed
- Build takes 2-5 minutes
- You get email notifications

### To Update Your Site:

```bash
# Make your changes
# Then commit and push:

git add .
git commit -m "Update website content"
git push

# Netlify automatically deploys!
```

---

## 📊 Netlify Dashboard Features

### What You Can Do:

1. **Deploys** - View deployment history
2. **Functions** - (Not used currently)
3. **Forms** - Monitor form submissions
4. **Analytics** - View traffic (paid feature)
5. **Domain** - Manage custom domains
6. **Build & deploy** - Configure settings
7. **Environment variables** - Add secrets
8. **Notifications** - Email/Slack alerts

---

## 🐛 Troubleshooting

### Issue 1: Build Failed

**Error:** "Command failed with exit code 1"

**Solution:**
1. Check build logs in Netlify
2. Verify package.json has correct scripts
3. Try building locally: `npm run build`
4. Check for missing dependencies

### Issue 2: 404 on Page Refresh

**Error:** Page not found when refreshing on /about, /courses, etc.

**Solution:**
✅ Already fixed! The `_redirects` file handles this.

If still happening:
1. Verify `/public/_redirects` file exists
2. Check `netlify.toml` has redirect rules

### Issue 3: Images Not Loading

**Error:** Images show broken icons

**Solution:**
1. Check browser console for errors
2. Verify image paths are correct
3. Check Figma assets are accessible
4. Try clearing Netlify cache: Site settings → Build & deploy → Clear cache

### Issue 4: Supabase Connection Failed

**Error:** "Failed to fetch data"

**Solution:**
1. Check browser console for errors
2. Verify Supabase project is active
3. Check `/utils/supabase/info.tsx` has correct credentials
4. Test Supabase connection in Supabase dashboard
5. Verify Supabase Edge Functions are deployed

### Issue 5: Environment Variables

**Error:** API keys not working

**Solution:**
Your Supabase credentials are in the code, so no env vars needed.

But if you want to move them to environment variables:

1. Go to Site settings → Build & deploy → Environment
2. Click "Edit variables"
3. Add:
   - `VITE_SUPABASE_PROJECT_ID` = your project ID
   - `VITE_SUPABASE_ANON_KEY` = your anon key
4. Update code to use: `import.meta.env.VITE_SUPABASE_PROJECT_ID`
5. Redeploy

---

## 🔧 Advanced Configuration

### Custom Build Commands

Edit `netlify.toml` to customize:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  
# Add custom headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Custom-Header = "Shivaya Yogashala"
```

### Deploy Previews

Netlify automatically creates preview deployments for:
- Pull requests
- Branch deployments

Access them at:
```
https://deploy-preview-123--shivaya-yogashala.netlify.app
```

### Rollback to Previous Version

If something breaks:

1. Go to **Deploys**
2. Find the working version
3. Click **"Publish deploy"**
4. Confirm rollback

Your site instantly reverts!

---

## 📱 Mobile Testing

After deployment, test on:

- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad
- [ ] Different screen sizes

Use Chrome DevTools:
- Right-click → Inspect
- Toggle device toolbar
- Test all breakpoints

---

## 🎯 Performance Optimization

### Netlify Automatically Provides:

✅ **CDN Distribution** - Fast loading worldwide
✅ **Gzip Compression** - Smaller file sizes  
✅ **HTTP/2** - Faster connections
✅ **Asset Optimization** - Images optimized
✅ **SSL Certificate** - Free HTTPS
✅ **DDoS Protection** - Security

### Additional Optimizations:

1. **Enable Asset Optimization:**
   - Site settings → Build & deploy → Post processing
   - Enable "Bundle CSS"
   - Enable "Minify CSS"
   - Enable "Minify JS"
   - Enable "Pretty URLs"

2. **Add Analytics:**
   - Site settings → Analytics
   - Choose plan
   - Monitor traffic

---

## 📧 Email Configuration (Optional)

Your enrollment form works, but to enable email notifications:

1. Follow: `/QUICK_EMAIL_SETUP.md`
2. Get EmailJS credentials
3. Update `ContactPage.tsx` with your IDs
4. Commit and push
5. Netlify auto-deploys

---

## 🔐 Security Best Practices

### Already Implemented:

✅ HTTPS enabled by default
✅ Security headers configured
✅ XSS protection enabled
✅ Content Security Policy

### Additional Steps:

1. **Enable 2FA on Netlify:**
   - User settings → Security
   - Enable two-factor auth

2. **Restrict Admin Panel:**
   - Consider adding password protection
   - Use Netlify Identity (optional)

3. **Monitor Logs:**
   - Check deployment logs regularly
   - Watch for errors

---

## 📈 Post-Deployment Checklist

### Immediate (Today):

- [ ] ✅ Site deployed successfully
- [ ] ✅ Custom domain configured (or Netlify URL)
- [ ] ✅ All pages load correctly
- [ ] ✅ Data seeded (teachers, courses, asanas)
- [ ] ✅ Forms working
- [ ] ✅ WhatsApp integration tested
- [ ] ✅ Mobile responsive verified
- [ ] ✅ SSL certificate active

### Short-term (This Week):

- [ ] Configure email notifications
- [ ] Add real teacher photos
- [ ] Update course descriptions
- [ ] Test on multiple devices
- [ ] Share with friends for feedback
- [ ] Set up custom domain (optional)
- [ ] Enable Netlify forms (optional)

### Ongoing:

- [ ] Monitor form submissions
- [ ] Update course batch dates
- [ ] Add new asanas
- [ ] Update testimonials
- [ ] Track analytics
- [ ] Respond to inquiries

---

## 🆘 Getting Help

### Netlify Support:

- **Community:** https://answers.netlify.com
- **Documentation:** https://docs.netlify.com
- **Status:** https://www.netlifystatus.com
- **Twitter:** @Netlify

### Build Logs:

If deployment fails:
1. Go to Deploys
2. Click failed deploy
3. View detailed logs
4. Copy error message
5. Search Netlify docs or community

---

## 🎓 Learning Resources

### Netlify Docs:

- [Getting Started](https://docs.netlify.com/get-started/)
- [Deploy React App](https://docs.netlify.com/frameworks/react/)
- [Custom Domains](https://docs.netlify.com/domains-https/)
- [Continuous Deployment](https://docs.netlify.com/site-deploys/)

### Video Tutorials:

Search YouTube for:
- "Deploy React app to Netlify"
- "Netlify deployment tutorial"
- "Connect GitHub to Netlify"

---

## 💡 Pro Tips

### Tip 1: Branch Previews
Create a `dev` branch for testing:
```bash
git checkout -b dev
# Make changes
git push origin dev
# Netlify creates preview at: dev--shivaya-yogashala.netlify.app
```

### Tip 2: Deploy Contexts
Configure different builds for production vs preview in `netlify.toml`:
```toml
[context.production]
  command = "npm run build"
  
[context.deploy-preview]
  command = "npm run build:preview"
```

### Tip 3: Netlify CLI
Install for local testing:
```bash
npm install -g netlify-cli
netlify dev  # Test locally with Netlify environment
netlify deploy --prod  # Deploy from command line
```

### Tip 4: Status Badge
Add to your GitHub README:
```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/shivaya-yogashala/deploys)
```

---

## 🎉 Success!

You now have:
- ✅ Live yoga website
- ✅ Automatic deployments
- ✅ Free SSL certificate
- ✅ Global CDN hosting
- ✅ Version control with Git
- ✅ Easy updates via Git push

**Your website is live and ready to accept students!**

---

## 🙏 Next Steps

1. **Share Your Site:**
   - Post on social media
   - Send to friends
   - Add to business cards

2. **Gather Feedback:**
   - Ask users for input
   - Monitor form submissions
   - Track popular pages

3. **Keep Improving:**
   - Add more courses
   - Update teacher bios
   - Add student testimonials
   - Expand asana library

---

## 📞 Your Live Website

**Main Site:**
```
https://shivaya-yogashala.netlify.app
```

**Share this URL with the world!**

---

**Deployment Guide Created By:** AI Assistant  
**Last Updated:** November 4, 2025  
**Status:** Ready to Deploy

---

## 🕉️ Blessing

**ॐ नमः शिवाय**  
*(Om Namah Shivaya)*

May your website reach thousands of students  
and guide them on their journey to enlightenment.

**Namaste** 🙏

---

**Ready to deploy? Follow Step 1 above!** 🚀
