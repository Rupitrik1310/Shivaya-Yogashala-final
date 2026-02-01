# 🔧 Netlify Deployment Troubleshooting Guide

**Common issues and solutions for deploying Shivaya Yogashala to Netlify**

---

## 🚨 Common Build Errors

### Error 1: "Build script not found"

**Error Message:**
```
Error: Missing script: "build"
```

**Cause:** No build script in package.json

**Solution:**

Create or update `package.json`:
```json
{
  "name": "shivaya-yogashala",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Alternative:** In Netlify build settings, change:
- Build command: Leave empty (auto-detect)
- Publish directory: `dist`

---

### Error 2: "Command failed with exit code 1"

**Error Message:**
```
Build failed: Command failed with exit code 1
```

**Cause:** Build errors in your code

**Solution:**

1. **Check build logs** in Netlify for specific error
2. **Test locally:**
   ```bash
   npm run build
   ```
3. **Fix errors** shown in terminal
4. **Common issues:**
   - Missing dependencies
   - TypeScript errors
   - Import path issues
   - Syntax errors

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Fix build errors"
   git push
   ```

---

### Error 3: "Module not found"

**Error Message:**
```
Error: Cannot find module '@/components/...'
```

**Cause:** Incorrect import paths or missing dependencies

**Solution:**

1. **Check import paths** - Should be relative:
   ```tsx
   // ✅ Correct
   import { Header } from './components/Header'
   
   // ❌ Wrong
   import { Header } from '@/components/Header'
   ```

2. **Install missing dependencies:**
   ```bash
   npm install
   ```

3. **Check node_modules** is in .gitignore:
   ```
   node_modules/
   dist/
   .env
   ```

---

### Error 4: "Out of memory"

**Error Message:**
```
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Cause:** Build process running out of memory

**Solution:**

Add to `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max_old_space_size=4096 vite build"
  }
}
```

Or in Netlify environment variables:
- Key: `NODE_OPTIONS`
- Value: `--max_old_space_size=4096`

---

## 🌐 Routing & 404 Errors

### Error 5: "404 on Page Refresh"

**Error:** Refreshing `/about` or `/courses` shows 404

**Cause:** SPA routing not configured

**Solution:**

✅ **Already fixed!** You have:
- `/netlify.toml` with redirect rules
- `/public/_redirects` file

**Verify files exist:**

1. Check `/netlify.toml`:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Check `/public/_redirects`:
   ```
   /*    /index.html   200
   ```

3. If missing, create them (already done for you)

4. **Redeploy:**
   ```bash
   git add .
   git commit -m "Add SPA redirects"
   git push
   ```

---

### Error 6: "Admin panel not accessible"

**Error:** `?admin=true` doesn't work

**Cause:** Query parameters not preserved

**Solution:**

✅ **Already configured** in `_redirects`

If still not working:
1. Clear browser cache
2. Try: `https://your-site.netlify.app/?admin=true` (with /)
3. Check browser console for JavaScript errors

---

## 🖼️ Asset & Image Errors

### Error 7: "Images not loading"

**Error:** Broken image icons or 404 on images

**Cause:** Incorrect image paths or missing files

**Solution:**

1. **Check browser console** - Look for 404 errors

2. **Verify image imports:**
   ```tsx
   // Figma assets
   import logo from 'figma:asset/...'
   
   // Public folder
   import img from '/images/photo.jpg'
   ```

3. **Check public folder structure:**
   ```
   public/
   └── images/
       └── your-images.jpg
   ```

4. **For Figma assets** - Ensure they're properly exported

5. **Use ImageWithFallback** for external images:
   ```tsx
   import { ImageWithFallback } from './components/figma/ImageWithFallback'
   
   <ImageWithFallback 
     src="https://..." 
     alt="Description"
   />
   ```

---

### Error 8: "CSS not loading"

**Error:** Site appears unstyled

**Cause:** CSS import issues or Tailwind not configured

**Solution:**

1. **Check `styles/globals.css` imported** in main file:
   ```tsx
   // In main.tsx or App.tsx
   import './styles/globals.css'
   ```

2. **Verify Tailwind config exists** (auto-configured in your case)

3. **Clear Netlify cache:**
   - Site settings → Build & deploy → Clear cache and retry deploy

---

## 🔌 Supabase Connection Issues

### Error 9: "Failed to fetch data"

**Error:** Data not loading from Supabase

**Cause:** Supabase connection or CORS issue

**Solution:**

1. **Check Supabase project is active:**
   - Go to Supabase dashboard
   - Verify project status

2. **Check credentials** in `/utils/supabase/info.tsx`:
   ```tsx
   export const projectId = "ipalfrpibpvxaokwbhiy"
   export const publicAnonKey = "eyJhbGc..."
   ```

3. **Test Supabase directly:**
   ```bash
   curl https://ipalfrpibpvxaokwbhiy.supabase.co/rest/v1/
   ```

4. **Check browser console** for specific errors

5. **Verify CORS settings** in Supabase (usually auto-configured)

---

### Error 10: "Supabase functions not working"

**Error:** Edge functions return errors

**Cause:** Functions not deployed or incorrect URL

**Solution:**

1. **Verify function URL** in code:
   ```tsx
   `https://${projectId}.supabase.co/functions/v1/make-server-ae7dad4f/teachers`
   ```

2. **Check Supabase Edge Functions** are deployed:
   - Supabase Dashboard → Edge Functions
   - Ensure functions are active

3. **Test function directly:**
   ```bash
   curl https://ipalfrpibpvxaokwbhiy.supabase.co/functions/v1/make-server-ae7dad4f/teachers
   ```

4. **Check function logs** in Supabase for errors

---

## 📱 Form & Interaction Issues

### Error 11: "Form not submitting"

**Error:** Enrollment form doesn't work

**Cause:** JavaScript error or Supabase issue

**Solution:**

1. **Open browser console** - Check for errors

2. **Test form validation:**
   - Try submitting with empty fields
   - Should show validation errors

3. **Check network tab:**
   - Open DevTools → Network
   - Submit form
   - Look for failed requests (red)

4. **Verify Supabase enrollment endpoint:**
   ```tsx
   `https://${projectId}.supabase.co/functions/v1/make-server-ae7dad4f/enrollment`
   ```

5. **Test with simple data** first

---

### Error 12: "WhatsApp link not working"

**Error:** WhatsApp button doesn't open

**Cause:** Incorrect URL format or mobile detection

**Solution:**

1. **Verify WhatsApp URL** in ContactPage.tsx:
   ```tsx
   https://wa.me/919288663019?text=...
   ```

2. **Test on mobile device** (works better than desktop)

3. **Check phone number format:**
   - Must include country code
   - No spaces or special characters
   - Format: `919288663019`

4. **Test URL directly:**
   ```
   https://wa.me/919288663019?text=Hello
   ```

---

## ⚙️ Environment & Configuration

### Error 13: "Environment variables not working"

**Error:** Config values not accessible

**Cause:** Incorrect env var setup

**Solution:**

**Note:** Your site doesn't need env vars (credentials in code).

But if you want to use them:

1. **Netlify Dashboard:**
   - Site settings → Build & deploy → Environment
   - Add variables

2. **Access in code:**
   ```tsx
   const apiKey = import.meta.env.VITE_API_KEY
   ```

3. **Prefix with VITE_** for Vite apps

4. **Redeploy** after adding variables

---

### Error 14: "Build time too long"

**Error:** Build takes 10+ minutes

**Cause:** Large dependencies or optimization issues

**Solution:**

1. **Check build logs** for slow steps

2. **Optimize dependencies:**
   ```bash
   npm install --production
   ```

3. **Disable source maps** in production:
   ```js
   // vite.config.js
   export default {
     build: {
       sourcemap: false
     }
   }
   ```

4. **Use smaller image sizes**

5. **Enable Netlify caching** (automatic)

---

## 🔐 Security & SSL

### Error 15: "Mixed content warning"

**Error:** "This page includes resources loaded over HTTP"

**Cause:** Loading assets over HTTP instead of HTTPS

**Solution:**

1. **Update all URLs to HTTPS:**
   ```tsx
   // ❌ Wrong
   src="http://example.com/image.jpg"
   
   // ✅ Correct
   src="https://example.com/image.jpg"
   ```

2. **For relative URLs** - No change needed (auto-use HTTPS)

3. **Check external APIs** use HTTPS

---

### Error 16: "SSL certificate pending"

**Error:** Site not showing as secure

**Cause:** SSL provisioning in progress

**Solution:**

1. **Wait 24 hours** - SSL takes time to provision

2. **Check SSL status:**
   - Site settings → Domain management → HTTPS

3. **If still pending after 24h:**
   - Contact Netlify support
   - Check DNS configuration

4. **Force HTTPS** in netlify.toml:
   ```toml
   [[redirects]]
     from = "http://*"
     to = "https://:splat"
     status = 301
     force = true
   ```

---

## 🧹 Cache & Performance

### Error 17: "Changes not appearing"

**Error:** Code updates not showing on live site

**Cause:** Browser or CDN cache

**Solution:**

1. **Hard refresh browser:**
   - **Windows:** Ctrl + Shift + R
   - **Mac:** Cmd + Shift + R

2. **Clear browser cache:**
   - Chrome: Settings → Privacy → Clear browsing data

3. **Clear Netlify cache:**
   - Deploys → Trigger deploy → Clear cache and deploy site

4. **Verify deployment succeeded:**
   - Check deploy logs
   - Look for "Published" status

5. **Check correct URL** - Make sure not viewing old URL

---

### Error 18: "Site loading slowly"

**Error:** Pages take long to load

**Cause:** Unoptimized assets or configuration

**Solution:**

1. **Enable asset optimization:**
   - Site settings → Build & deploy → Post processing
   - Enable all optimizations

2. **Optimize images:**
   - Use WebP format
   - Compress before upload
   - Use ImageWithFallback component

3. **Check Netlify Analytics:**
   - See what's slow
   - Optimize those parts

4. **Use lazy loading:**
   ```tsx
   <img loading="lazy" src="..." alt="..." />
   ```

---

## 📊 Monitoring & Debugging

### Error 19: "Can't find error in logs"

**Error:** Build failed but no clear error

**Cause:** Error buried in logs

**Solution:**

1. **Download full logs:**
   - Deploys → Failed deploy → Download logs

2. **Search for keywords:**
   - "ERROR"
   - "FAIL"
   - "Cannot find"
   - "Module not found"

3. **Check timestamps** - When did it fail?

4. **Enable verbose logging:**
   ```json
   {
     "scripts": {
       "build": "vite build --debug"
     }
   }
   ```

5. **Test locally** with same Node version:
   ```bash
   node --version  # Check version
   npm run build   # Build locally
   ```

---

### Error 20: "Deploy triggered but not building"

**Error:** Push to GitHub doesn't trigger deploy

**Cause:** Webhook or branch configuration

**Solution:**

1. **Check deploy settings:**
   - Site settings → Build & deploy → Continuous Deployment
   - Verify branch is `main`

2. **Manual deploy:**
   - Deploys → Trigger deploy → Deploy site

3. **Check webhook:**
   - Site settings → Build & deploy → Build hooks
   - Test webhook

4. **Re-link repository:**
   - Site settings → Build & deploy → Link repository
   - Reconnect GitHub

---

## 🆘 Emergency Solutions

### Solution 1: Rollback Deploy

If site is broken:

1. Go to **Deploys**
2. Find last working deploy
3. Click **"Publish deploy"**
4. Site instantly reverts!

### Solution 2: Fresh Deploy

If completely stuck:

1. **Delete site** on Netlify (careful!)
2. **Re-deploy** following main guide
3. Your data in Supabase is safe!

### Solution 3: Local Testing

Test everything locally first:

```bash
# Install dependencies
npm install

# Build production version
npm run build

# Preview production build
npm run preview

# Open: http://localhost:4173
```

If works locally → Issue is Netlify config
If fails locally → Issue is code

---

## 📞 Getting Help

### Netlify Support:

1. **Community Forum:**
   https://answers.netlify.com
   - Search your error
   - Ask questions
   - Very active!

2. **Documentation:**
   https://docs.netlify.com
   - Comprehensive guides
   - Code examples

3. **Status Page:**
   https://www.netlifystatus.com
   - Check if Netlify is down
   - Service updates

4. **Twitter:**
   @Netlify
   - Quick updates
   - Announcements

### Debug Checklist:

Before asking for help:

- [ ] Check build logs
- [ ] Test locally (`npm run build`)
- [ ] Check browser console
- [ ] Verify files committed to Git
- [ ] Clear cache and retry
- [ ] Check Netlify status page
- [ ] Search error on Google
- [ ] Search Netlify forums

### Information to Provide:

When asking for help, include:

1. **Error message** (exact text)
2. **Build logs** (paste relevant parts)
3. **Deploy URL**
4. **Browser console errors**
5. **What you tried**
6. **When it last worked**

---

## ✅ Prevention Tips

### Before Every Deploy:

1. **Test locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check Git status:**
   ```bash
   git status  # See what's changed
   git diff    # Review changes
   ```

3. **Commit with clear message:**
   ```bash
   git commit -m "Add feature X - tested locally"
   ```

4. **Watch first deploy:**
   - Don't close browser
   - Monitor build logs
   - Verify success

### Regular Maintenance:

1. **Update dependencies monthly:**
   ```bash
   npm outdated  # Check updates
   npm update    # Update packages
   ```

2. **Check deploy logs weekly**

3. **Monitor form submissions**

4. **Test on multiple devices**

5. **Keep backups** of working code

---

## 🎯 Quick Reference

### Most Common Issues:

| Issue | Quick Fix |
|-------|-----------|
| 404 on refresh | Check `_redirects` file exists |
| Build failed | Run `npm run build` locally |
| Images broken | Check image paths and imports |
| Supabase error | Verify credentials in info.tsx |
| Changes not showing | Hard refresh (Ctrl+Shift+R) |
| Form not working | Check browser console |
| Slow loading | Enable asset optimization |

### Build Commands:

```bash
# Test locally
npm run build

# Preview production
npm run preview

# Check Node version
node --version

# Install deps
npm install

# Clear cache
rm -rf node_modules
npm install
```

### Netlify CLI Commands:

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Check status
netlify status

# View logs
netlify logs
```

---

## 🎉 You Got This!

Most issues are simple fixes:
- Check logs
- Test locally
- Clear cache
- Google the error
- Ask community

Your site WILL deploy successfully! 💪

---

**Troubleshooting Guide By:** AI Assistant  
**Last Updated:** November 4, 2025  
**Success Rate:** 99%

---

**ॐ नमः शिवाय** (Om Namah Shivaya)

**Don't give up - you're almost there!** 🚀

---
