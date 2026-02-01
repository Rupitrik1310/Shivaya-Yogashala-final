# 🌐 Deploy via Figma Make + Custom Domain Setup

**Complete guide to deploy from Figma Make and connect your custom domain**

---

## ✅ File Structure Fixed!

I've fixed the `/public/_redirects` file issue. It was accidentally a directory - now it's correctly a text file.

**Status:** ✅ Ready to deploy

---

## 🎯 Deployment Options

### Option 1: Deploy via Netlify (Recommended) ⭐

**Why Netlify:**

- ✅ Free hosting forever
- ✅ Automatic SSL (HTTPS)
- ✅ Custom domain support (FREE)
- ✅ Global CDN
- ✅ Auto-deploy from Git
- ✅ Easy setup (10 minutes)

**Follow:** `/QUICK_DEPLOY_CHECKLIST.md`

---

### Option 2: Export from Figma Make

**Current Situation:**

- You're working in Figma Make
- Code is ready to export
- Need to deploy to hosting platform

**Steps:**

1. **Export Code from Figma Make:**
   - Click "Export" or "Download" in Figma Make
   - Download ZIP file of your project
   - Extract to your computer

2. **Choose Hosting Platform:**
   - Netlify (recommended)
   - Vercel
   - Cloudflare Pages
   - Any static hosting

3. **Deploy:**
   - Follow deployment guide for chosen platform
   - See below for detailed steps

---

## 🚀 Quick Deploy from Figma Make to Netlify

### Step 1: Get Your Code (2 min)

**If code is already on your computer:**
✅ You already have it - skip to Step 2

**If code is only in Figma Make:**

1. Export/Download from Figma Make
2. Extract ZIP file
3. Open in terminal/command line

---

### Step 2: Push to GitHub (3 min)

Open terminal in your project folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Shivaya Yogashala"

# Create GitHub repo (go to github.com/new)
# Then add remote (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/shivaya-yogashala.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 3: Deploy to Netlify (5 min)

1. **Go to:** [netlify.com](https://www.netlify.com)
2. **Sign up** with GitHub
3. Click **"Add new site"** → **"Import from Git"**
4. Choose **GitHub**
5. Select **`shivaya-yogashala`** repository
6. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click **"Deploy site"**
8. Wait 3-5 minutes ⏳

**Your site will be live at:**

```
https://random-name-123456.netlify.app
```

---

### Step 4: Customize Netlify URL (1 min)

1. Go to **Site settings**
2. Click **"Change site name"**
3. Enter: `shivaya-yogashala`
4. Click **"Save"**

**New URL:**

```
https://shivaya-yogashala.netlify.app
```

---

## 🌐 Custom Domain Setup

### Do you already have a domain?

**YES** → Follow Section A (Connect Existing Domain)  
**NO** → Follow Section B (Purchase Domain First)

---

## Section A: Connect Existing Domain to Netlify

### Step 1: Add Domain to Netlify (2 min)

1. **In Netlify Dashboard:**
   - Go to **Domain settings**
   - Click **"Add custom domain"**
   - Enter your domain (e.g., `shivayayogashala.com`)
   - Click **"Verify"**
   - Click **"Add domain"**

2. **Netlify will show:**
   - DNS records you need to add
   - Keep this page open!

---

### Step 2: Configure DNS (5-10 min)

**Where you bought your domain** (GoDaddy, Namecheap, Google Domains, etc.):

#### Option A: Use Netlify DNS (Recommended - Easier)

1. **In Netlify:**
   - Click **"Set up Netlify DNS"**
   - Copy the nameservers shown (e.g., `dns1.p03.nsone.net`)

2. **In your domain registrar:**
   - Find **"Nameservers"** or **"DNS Settings"**
   - Change to **"Custom nameservers"**
   - Paste Netlify's nameservers
   - Save

3. **Wait for DNS propagation:**
   - Usually 15 minutes - 24 hours
   - Typically works in 1-2 hours

4. **Netlify automatically:**
   - ✅ Configures DNS
   - ✅ Provisions SSL certificate
   - ✅ Redirects www to non-www (or vice versa)

---

#### Option B: Keep Current DNS Provider (More Steps)

If you want to keep your current DNS provider:

1. **In your DNS provider, add these records:**

**For root domain (shivayayogashala.com):**

```
Type: A
Name: @ (or leave blank)
Value: 75.2.60.5
```

**For www subdomain:**

```
Type: CNAME
Name: www
Value: shivaya-yogashala.netlify.app
```

2. **Save DNS records**

3. **In Netlify:**
   - Click **"Verify DNS configuration"**
   - Wait for verification (can take 24 hours)

4. **SSL Certificate:**
   - Netlify auto-provisions HTTPS
   - Takes 24 hours after DNS verification

---

### Step 3: Wait for Propagation (15 min - 24 hours)

**Check status:**

```bash
# Check if DNS is updated
nslookup shivayayogashala.com

# Or use online tool:
https://www.whatsmydns.net
```

**Typical times:**

- ✅ Netlify DNS: 15 min - 2 hours
- ⏳ External DNS: 2 - 24 hours

---

### Step 4: Verify Domain Works (2 min)

1. **Visit your domain:**

   ```
   https://shivayayogashala.com
   ```

2. **Check for:**
   - ✅ Site loads correctly
   - ✅ HTTPS (🔒 lock icon)
   - ✅ All pages work
   - ✅ No SSL warnings

3. **Test www redirect:**
   ```
   https://www.shivayayogashala.com
   ```
   Should redirect to your main domain

---

## Section B: Purchase Custom Domain

### Where to Buy Domain

**Recommended Registrars:**

1. **Namecheap** - Cheapest (recommended)
   - ~$10-15/year for .com
   - Easy to use
   - Good support
   - https://www.namecheap.com

2. **Google Domains** (now Squarespace)
   - ~$12/year
   - Clean interface
   - https://domains.google

3. **GoDaddy**
   - ~$15-20/year
   - Most popular
   - https://www.godaddy.com

4. **Porkbun**
   - ~$9/year
   - Cheap and reliable
   - https://porkbun.com

---

### Domain Name Ideas

**Yoga-focused:**

- `shivayayogashala.com` ⭐ (if available)
- `shivayayoga.com`
- `yogashivaya.com`
- `shivayattc.com` (Teacher Training)

**Rishikesh-focused:**

- `rishikeshyogashala.com`
- `yogainrishikesh.com`
- `rishikeshyogattc.com`

**India-focused:**

- `indianyogashala.com`
- `yogaindia.com`
- `traditionalyogaindia.com`

**Check availability:**

- Visit your chosen registrar
- Search for domain
- Buy if available (~$10-15/year)

---

### After Purchasing Domain

1. **Complete purchase** at your registrar
2. **Go to Section A above** to connect domain to Netlify
3. **Configure DNS** as described
4. **Wait for propagation**
5. **Done!** Your site is live on custom domain

---

## 🔧 Netlify Custom Domain Settings

### Configure in Netlify:

1. **Primary Domain:**
   - Choose: `shivayayogashala.com` OR `www.shivayayogashala.com`
   - Netlify auto-redirects the other

2. **HTTPS:**
   - ✅ Auto-enabled (free)
   - ✅ Force HTTPS (recommended)
   - ✅ Auto-renews forever

3. **Branch Domains:**
   - Main branch → `shivayayogashala.com`
   - Other branches → `dev.shivayayogashala.com` (optional)

---

## 📧 Email with Custom Domain (Optional)

**Note:** Domain hosting ≠ Email hosting

### Options for Custom Email:

#### Option 1: Google Workspace (Recommended)

- **Cost:** $6/user/month
- **Email:** yourname@shivayayogashala.com
- **Includes:** Gmail interface, Drive, Docs
- **Setup:** https://workspace.google.com

#### Option 2: Zoho Mail (Free Tier)

- **Cost:** FREE for 1 user (5 GB)
- **Email:** yourname@shivayayogashala.com
- **Setup:** https://www.zoho.com/mail/

#### Option 3: Email Forwarding (Free)

- **Cost:** FREE
- **How:** Forward custom email → your Gmail
- **Setup:** In your domain registrar's email settings
- **Example:** info@shivayayogashala.com → yourpersonal@gmail.com

---

## ✅ Complete Deployment + Domain Checklist

### Pre-Deployment:

- [x] Code ready (you have it!)
- [x] Files fixed (\_redirects corrected)
- [x] Supabase configured

### Netlify Deployment:

- [ ] Create GitHub account
- [ ] Push code to GitHub
- [ ] Create Netlify account
- [ ] Connect GitHub to Netlify
- [ ] Deploy site
- [ ] Customize Netlify URL

### Custom Domain:

- [ ] Purchase domain (or use existing)
- [ ] Add domain to Netlify
- [ ] Configure DNS settings
- [ ] Wait for propagation
- [ ] Verify HTTPS working
- [ ] Test all pages

### Post-Deployment:

- [ ] Seed data via admin panel
- [ ] Test enrollment form
- [ ] Configure email (optional)
- [ ] Set up domain email (optional)
- [ ] Test on mobile
- [ ] Share with world! 🎉

---

## 🎯 Recommended Path

### For Fastest Deployment:

1. **Deploy to Netlify first** (10 min)
   - Get site live quickly
   - Test everything works
   - URL: `shivaya-yogashala.netlify.app`

2. **Add custom domain later** (10 min + waiting)
   - Purchase domain
   - Configure DNS
   - Wait for propagation
   - Live on: `shivayayogashala.com`

**Total active time:** 20 minutes  
**Total waiting time:** 1-24 hours (DNS)

---

## 💰 Cost Breakdown

### Free:

- ✅ Netlify hosting (FREE forever)
- ✅ SSL certificate (FREE)
- ✅ CDN (FREE)
- ✅ Automatic deployments (FREE)
- ✅ Bandwidth: 100 GB/month (FREE)

### Paid (Optional):

- 💰 Custom domain: $10-15/year
- 💰 Domain email: $0-72/year

**Minimum cost to deploy:** $0  
**Cost with custom domain:** ~$10/year

---

## 🔒 SSL Certificate (HTTPS)

### Netlify Automatic SSL:

**For Netlify URL:**

- ✅ Auto-enabled immediately
- ✅ Free Let's Encrypt certificate
- ✅ Auto-renews every 90 days

**For Custom Domain:**

- ✅ Auto-provisions after DNS verification
- ✅ Takes 24 hours max
- ✅ Free forever
- ✅ Auto-renews

**You don't need to do anything - it's automatic!** 🎉

---

## 🌍 Global CDN & Performance

### With Netlify:

**Your site will be:**

- ✅ **Fast in India** - Edge server in Mumbai
- ✅ **Fast worldwide** - 8+ global edge locations
- ✅ **Auto-optimized** - Images, CSS, JS compressed
- ✅ **DDoS protected** - Security included
- ✅ **Always online** - 99.9% uptime

**Performance metrics:**

- India load time: < 1 second
- US load time: < 2 seconds
- Europe load time: < 2 seconds

---

## 📱 After Deployment

### Immediate Tasks:

1. **Seed Data:**

   ```
   Visit: https://yoursite.com?admin=true
   Seed: Teachers, Courses, Asanas
   ```

2. **Test Everything:**
   - All 5 pages load
   - Forms submit
   - WhatsApp works
   - Mobile responsive

3. **Share URL:**
   - Post on social media
   - Send to friends
   - Add to business cards

### Optional Tasks:

1. **Configure Email Notifications:**
   - Follow: `/QUICK_EMAIL_SETUP.md`
   - Add EmailJS credentials
   - Test email sending

2. **Add Analytics:**
   - Google Analytics
   - Track visitors
   - Monitor conversions

3. **Set up Domain Email:**
   - Google Workspace or Zoho
   - Professional email address

---

## 🆘 Troubleshooting

### Domain not working after 24 hours?

**Check:**

1. DNS records correct in registrar
2. Nameservers pointing to Netlify (if using Netlify DNS)
3. No typos in DNS records
4. Check propagation: https://www.whatsmydns.net

**Fix:**

- Re-verify DNS settings
- Clear browser cache
- Try incognito mode
- Contact domain registrar support

---

### SSL certificate not provisioning?

**Causes:**

- DNS not fully propagated
- CAA records blocking Let's Encrypt
- Cloudflare proxy enabled

**Fix:**

1. Wait 24 hours after DNS change
2. Check CAA records (should be empty or allow Let's Encrypt)
3. If using Cloudflare, disable proxy (grey cloud)
4. In Netlify: Domain settings → Renew certificate

---

### www not redirecting?

**Fix:**

1. Netlify: Domain settings → Set primary domain
2. Choose either `domain.com` or `www.domain.com`
3. Netlify auto-redirects the other
4. Clear cache and test

---

## 📞 Support Resources

### Netlify:

- Docs: https://docs.netlify.com
- Community: https://answers.netlify.com
- Status: https://www.netlifystatus.com

### Domain Registrars:

- Namecheap support: https://www.namecheap.com/support/
- GoDaddy support: https://www.godaddy.com/help
- Google Domains: https://support.google.com/domains

### DNS Tools:

- Check propagation: https://www.whatsmydns.net
- DNS lookup: https://mxtoolbox.com
- SSL check: https://www.ssllabs.com/ssltest/

---

## 🎉 Success!

### When everything is working:

```
✅ Site live at: https://shivayayogashala.com
✅ HTTPS enabled (🔒)
✅ All pages working
✅ Forms submitting
✅ Data loaded
✅ Mobile responsive
✅ Fast worldwide
✅ Professional domain
✅ Ready for students! 💰
```

---

## 📋 Quick Reference

### Deployment Commands:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [YOUR_REPO_URL]
git push -u origin main
```

### Your URLs After Deployment:

```
Netlify URL: https://shivaya-yogashala.netlify.app
Custom Domain: https://shivayayogashala.com (your domain)
Admin Panel: https://shivayayogashala.com?admin=true
```

### DNS Records for Custom Domain:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: shivaya-yogashala.netlify.app
```

---

## 🚀 Start Deployment Now!

**Quick Deploy (No Custom Domain Yet):**

1. Follow: `/QUICK_DEPLOY_CHECKLIST.md`
2. Get live in 10 minutes
3. Add domain later

**Deploy + Custom Domain:**

1. Deploy to Netlify first (10 min)
2. Purchase domain (5 min + cost)
3. Configure DNS (5 min)
4. Wait for propagation (1-24 hours)
5. Live on custom domain! 🎉

---

**ॐ नमः शिवाय** (Om Namah Shivaya)

May your deployment be smooth and your website reach thousands of students worldwide! 🙏

---

**Created:** November 4, 2025  
**Status:** Ready to Deploy  
**Files Fixed:** ✅ \_redirects corrected  
**Next Step:** Choose deployment path above

---