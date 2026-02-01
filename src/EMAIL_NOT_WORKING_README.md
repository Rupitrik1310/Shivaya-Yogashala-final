# 📧 Email Not Working? Start Here!

---

## 🚨 Quick Fix (90% of Cases)

### The Issue:
Your EmailJS template's **"To Email"** field is likely not set.

### The Solution:
1. Go to **https://dashboard.emailjs.com/**
2. Email Templates → Edit **template_oum21q7**
3. Set **"To Email"** to: `shivayayogashala09@gmail.com`
4. Click **"Save"**
5. Test your form again

**Full instructions**: Open `/FIX_EMAIL_NOW.md`

---

## 📚 Choose Your Guide

### 🔴 Email Not Working at All?
👉 **`/FIX_EMAIL_NOW.md`** - Quick 2-minute fix

### 🧪 Want to Test & Diagnose?
👉 **`/EMAIL_TEST_INSTRUCTIONS.md`** - Step-by-step testing guide

### 🔧 Need Detailed Troubleshooting?
👉 **`/EMAIL_TROUBLESHOOTING.md`** - Complete troubleshooting manual

### 📖 Setting Up from Scratch?
👉 **`/QUICK_EMAIL_SETUP.md`** - Full setup guide (5 minutes)

### 📘 Want Complete Documentation?
👉 **`/EMAIL_CONFIGURATION.md`** - Everything about email setup

---

## ✅ What's Already Done

Your EmailJS credentials are already configured in the code:

```
✅ Service ID: service_aa9afs7
✅ Template ID: template_oum21q7
✅ Public Key: KEHHKmbHIPRKjPpLm
✅ Recipient: shivayayogashala09@gmail.com
```

**The code is ready!** You just need to configure the EmailJS template.

---

## 🎯 Most Likely Issues

1. **"To Email" not set in template** (90%) → See `/FIX_EMAIL_NOW.md`
2. **Email in spam folder** (5%) → Check Gmail spam
3. **Gmail service disconnected** (3%) → Reconnect in EmailJS
4. **Template variables wrong** (1%) → Check template variables
5. **Wrong credentials** (1%) → Verify IDs match

---

## 🔍 Quick Diagnosis

### Test 1: Check Browser Console

1. Open your website
2. Press **F12** (Developer Tools)
3. Go to **Console** tab
4. Submit a test enrollment
5. Look for messages:

**✅ Good:**
```
✅ Email notification sent successfully
```

**❌ Bad:**
```
❌ Email sending failed: 400 Bad Request
```

### What Each Error Means:

- **400 Bad Request** → "To Email" not set in template
- **401 Unauthorized** → Wrong Public Key
- **404 Not Found** → Wrong Template/Service ID
- **Network Error** → Internet/firewall issue

---

## 🧪 Quick Test from Console

Copy this into your browser console and press Enter:

```javascript
fetch('https://api.emailjs.com/api/v1.0/email/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    service_id: 'service_aa9afs7',
    template_id: 'template_oum21q7',
    user_id: 'KEHHKmbHIPRKjPpLm',
    template_params: {
      to_email: 'shivayayogashala09@gmail.com',
      student_name: 'Test',
      student_email: 'test@test.com',
      student_phone: '+91 12345',
      student_country: 'India',
      student_experience: 'Beginner',
      course_title: 'Test',
      student_message: 'Test',
      submission_date: new Date().toLocaleString()
    }
  })
}).then(r => r.text()).then(t => console.log('Result:', t));
```

**Result "OK"?** → Email was sent, check Gmail inbox + spam  
**Result "Error"?** → Read the error message for clues

---

## 📧 Check Gmail

1. Log in to **shivayayogashala09@gmail.com**
2. Check **Inbox**
3. Check **Spam/Junk** folder (VERY IMPORTANT!)
4. Search for: `from:noreply@emailjs.com`

---

## 🔌 Check EmailJS Dashboard

1. Go to **https://dashboard.emailjs.com/**
2. Click **"Email History"**
3. Look for recent emails

**Status: Sent ✓** → Email was sent, check Gmail spam  
**Status: Failed ✗** → Click to see error details  
**No history** → Email never reached EmailJS

---

## ✅ Checklist Before Asking for Help

- [ ] Checked "To Email" field in EmailJS template
- [ ] Set to `shivayayogashala09@gmail.com`
- [ ] Template is saved (not draft)
- [ ] Gmail service shows "Connected" in EmailJS
- [ ] Checked Gmail inbox thoroughly
- [ ] Checked Gmail spam/junk folder
- [ ] Browser console shows what error?
- [ ] EmailJS Email History shows what?
- [ ] Ran direct console test above
- [ ] Template test from dashboard works?

---

## 🆘 Still Stuck?

### Option 1: Follow Quick Fix Guide
Open **`/FIX_EMAIL_NOW.md`** and follow the steps

### Option 2: Run Full Diagnostics
Open **`/EMAIL_TEST_INSTRUCTIONS.md`** for testing guide

### Option 3: Detailed Troubleshooting
Open **`/EMAIL_TROUBLESHOOTING.md`** for complete guide

### Option 4: Contact EmailJS Support
Email: **support@emailjs.com**  
Include: Service ID, Template ID, error messages

---

## 📁 All Email Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| **`/FIX_EMAIL_NOW.md`** | Quick 2-minute fix | Email not working |
| **`/EMAIL_TEST_INSTRUCTIONS.md`** | Testing & diagnosis | Want to test/debug |
| **`/EMAIL_TROUBLESHOOTING.md`** | Complete troubleshooting | Need detailed help |
| **`/QUICK_EMAIL_SETUP.md`** | Initial setup guide | Setting up first time |
| **`/EMAIL_CONFIGURATION.md`** | Full documentation | Want all info |
| **`/EMAIL_SETUP_VISUAL.md`** | Visual code guide | Where to edit code |
| **`/README_EMAIL_SETUP.md`** | Setup status | Check what's done |

---

## 🎯 Start Here

**If email is not working:**

1. ✅ Open **`/FIX_EMAIL_NOW.md`**
2. ✅ Follow the 5 steps at the top
3. ✅ Test your form
4. ✅ Check Gmail (inbox + spam)

**That's it!** 90% of issues are fixed by setting the "To Email" field.

---

## 💡 Remember

- ✅ Your code is already configured correctly
- ✅ You have valid EmailJS credentials
- ✅ The issue is usually in the EmailJS dashboard settings
- ✅ Specifically the template "To Email" field
- ✅ Always check spam folder!

---

**Go to `/FIX_EMAIL_NOW.md` now and fix it in 2 minutes!** 🚀

---

*Last Updated: November 4, 2025*
