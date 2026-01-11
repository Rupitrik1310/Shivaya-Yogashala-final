# 🔴 FIX EMAIL NOT WORKING - Quick Solution

## 🎯 Most Common Issue (90% of cases)

### The Problem:
The **"To Email"** field in your EmailJS template is probably **NOT SET** or **SET INCORRECTLY**.

---

## ✅ THE FIX (Takes 2 minutes)

### Step 1: Go to EmailJS
1. Open: **https://dashboard.emailjs.com/**
2. Log in

### Step 2: Edit Your Template
1. Click **"Email Templates"** (left sidebar)
2. Find template: **template_oum21q7**
3. Click **"Edit"**

### Step 3: Set "To Email" Field
Look for the field called **"To Email"** at the top of the editor.

**Set it to:**
```
shivayayogashala09@gmail.com
```

**OR use variable:**
```
{{to_email}}
```

### Visual Guide:
```
┌────────────────────────────────────────────────┐
│  Email Template Editor                         │
├────────────────────────────────────────────────┤
│                                                │
│  ╔═══════════════════════════════════════╗    │
│  ║ To Email: shivayayogashala09@gmail.com║ ← SET THIS!
│  ╚═══════════════════════════════════════╝    │
│                                                │
│  From Name:  Shivaya Yogashala                 │
│                                                │
│  Subject: 🙏 New Enrollment - {{student_name}} │
│                                                │
└────────────────────────────────────────────────┘
```

### Step 4: Save Template
1. Scroll down
2. Click **"Save"** button
3. Wait for confirmation

### Step 5: Test Your Form
1. Go to your website Contact page
2. Submit a test enrollment
3. Check **shivayayogashala09@gmail.com** inbox
4. **Also check SPAM folder!**

---

## 🔍 How to Verify It's Fixed

### Test from EmailJS Dashboard:

1. In your template editor, click **"Test It"** button
2. Fill in these test values:
   ```
   to_email: shivayayogashala09@gmail.com
   student_name: Test Student
   student_email: test@example.com
   student_phone: +91 12345 67890
   student_country: India
   student_experience: Beginner
   course_title: Test Course
   student_message: Testing email
   submission_date: Today
   ```
3. Click **"Send Test Email"**
4. Check your Gmail inbox (and spam!)

### If Test Email Arrives:
✅ Template is now configured correctly!  
✅ Try submitting form on website  
✅ Should work now!

### If Test Email Still Doesn't Arrive:
❌ Check Gmail service connection (Step below)

---

## 🔌 Secondary Issue: Gmail Service Not Connected

### Check Gmail Connection:

1. In EmailJS Dashboard, click **"Email Services"**
2. Find: **service_aa9afs7**
3. Status should show: **"✓ Connected"**

### If Not Connected:

1. Click on the service
2. Click **"Reconnect"**
3. Sign in with: **shivayayogashala09@gmail.com**
4. Grant all permissions
5. Try again

---

## 📧 Check Spam Folder

### Very Important:

EmailJS emails often go to spam on first send!

1. Log in to **shivayayogashala09@gmail.com**
2. Click **"Spam"** in left sidebar
3. Look for emails from:
   - EmailJS
   - noreply@emailjs.com
   - Shivaya Yogashala

### If Found in Spam:
1. Select the email
2. Click **"Not Spam"** button
3. Future emails will go to inbox

---

## 🧪 Quick Console Test

### Test Email Directly:

1. Open your website
2. Press **F12** to open Developer Console
3. Click **"Console"** tab
4. Copy and paste this code:

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
      student_name: 'Direct Test',
      student_email: 'test@example.com',
      student_phone: '+91 12345 67890',
      student_country: 'India',
      student_experience: 'Beginner',
      course_title: 'Test Course',
      student_message: 'Direct API test',
      submission_date: new Date().toLocaleString()
    }
  })
}).then(r => r.text()).then(t => console.log('✅ Result:', t)).catch(e => console.error('❌ Error:', e));
```

5. Press **Enter**
6. Look at the result:

### Expected Results:

**✅ Success:**
```
✅ Result: OK
```
→ Email should arrive! Check inbox and spam.

**❌ Error 400:**
```
❌ Error: Bad Request
```
→ "To Email" field not set in template! Go fix it (see above).

**❌ Error 401:**
```
❌ Error: Unauthorized
```
→ Wrong credentials. Verify Service ID, Template ID, Public Key.

**❌ Error 404:**
```
❌ Error: Not Found
```
→ Template or Service doesn't exist. Check IDs.

---

## 📋 Quick Checklist

Before asking for help, verify:

- [ ] "To Email" field is set in EmailJS template
- [ ] Set to: `shivayayogashala09@gmail.com`
- [ ] Template is saved (not draft)
- [ ] Gmail service shows "Connected"
- [ ] Signed in with correct Gmail account
- [ ] Checked spam/junk folder thoroughly
- [ ] Test email from dashboard works
- [ ] Browser console shows no errors
- [ ] Used correct template ID: `template_oum21q7`
- [ ] Used correct service ID: `service_aa9afs7`
- [ ] Used correct public key: `KEHHKmbHIPRKjPpLm`

---

## 🎯 Your Current Configuration

```
EmailJS Service ID:   service_aa9afs7
EmailJS Template ID:  template_oum21q7
EmailJS Public Key:   KEHHKmbHIPRKjPpLm
Recipient Email:      shivayayogashala09@gmail.com
```

**These are configured in:** `/components/ContactPage.tsx` (lines 155-157)

---

## 🔄 If Still Not Working

### Try Creating a New Simple Template:

1. EmailJS Dashboard → Email Templates → Create New
2. Use this minimal template:

**To Email:**
```
shivayayogashala09@gmail.com
```

**Subject:**
```
Test - {{student_name}}
```

**Content:**
```
Name: {{student_name}}
Email: {{student_email}}
Phone: {{student_phone}}
Country: {{student_country}}
Experience: {{student_experience}}
Course: {{course_title}}
Message: {{student_message}}
Date: {{submission_date}}
```

3. Save the template
4. Copy the new Template ID
5. Update line 156 in `/components/ContactPage.tsx`:
   ```typescript
   const templateId = "template_YOUR_NEW_ID";
   ```
6. Save and test

---

## 📞 Need More Help?

### Resources:

1. 📖 **Detailed Troubleshooting**: `/EMAIL_TROUBLESHOOTING.md`
2. 🧪 **Testing Guide**: `/EMAIL_TEST_INSTRUCTIONS.md`
3. 📧 **Setup Guide**: `/EMAIL_CONFIGURATION.md`
4. 💬 **EmailJS Support**: support@emailjs.com
5. 📚 **EmailJS Docs**: https://www.emailjs.com/docs/

---

## ✅ Success!

You'll know it's working when:

1. ✅ Submit enrollment form
2. ✅ See "Application submitted successfully!" message
3. ✅ Browser console shows: "✅ Email notification sent successfully"
4. ✅ EmailJS Dashboard → Email History shows the email
5. ✅ Email arrives at **shivayayogashala09@gmail.com**

---

## 🎉 Most Common Fix

**90% of the time**, the issue is simply that the **"To Email"** field in the EmailJS template is not set.

**Just follow Step 1-5 at the top of this document and it should work!**

---

**START HERE**: Go to EmailJS → Edit Template → Set "To Email" → Save → Test

*That's all you need to do!* 🚀

---

*Last Updated: November 4, 2025*
