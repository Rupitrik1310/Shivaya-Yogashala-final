# 🔧 Email Troubleshooting Guide

## Problem: Email Not Being Received

If you're not receiving enrollment notification emails, follow these steps:

---

## ✅ Step 1: Verify EmailJS Template Settings

### Go to EmailJS Dashboard
1. Log in to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Click **"Email Templates"** in the left sidebar
3. Find your template: **template_oum21q7**
4. Click **"Edit"**

### Check "To Email" Field

**CRITICAL**: The "To Email" field must be set to:
```
shivayayogashala09@gmail.com
```

**OR use template variable:**
```
{{to_email}}
```

**NOTE**: If you use `{{to_email}}`, the code will fill it automatically with `shivayayogashala09@gmail.com`

### Screenshot of Correct Settings:

```
┌─────────────────────────────────────────────┐
│  Email Template Editor                      │
├─────────────────────────────────────────────┤
│                                             │
│  To Email:   shivayayogashala09@gmail.com   │  ← MUST BE SET!
│              (or {{to_email}})              │
│                                             │
│  From Name:  Shivaya Yogashala              │
│                                             │
│  Subject:    🙏 New Enrollment - {{student_name}} │
│                                             │
└─────────────────────────────────────────────┘
```

---

## ✅ Step 2: Check Gmail Service Connection

### Verify Gmail is Connected

1. In EmailJS Dashboard, go to **"Email Services"**
2. Find your service: **service_aa9afs7**
3. Status should show: **"✓ Connected"**
4. Should say: **Connected as: shivayayogashala09@gmail.com**

### If Not Connected:

1. Click on the service
2. Click **"Reconnect"**
3. Sign in with **shivayayogashala09@gmail.com**
4. Grant permissions

---

## ✅ Step 3: Test in EmailJS Dashboard

### Use the Test Feature

1. Open your template in EmailJS
2. Click **"Test It"** button
3. Fill in test values:
   - `student_name`: Test Student
   - `student_email`: test@example.com
   - `student_phone`: +91 12345 67890
   - `student_country`: India
   - `student_experience`: Beginner
   - `course_title`: Test Course
   - `student_message`: This is a test
   - `submission_date`: Today's date

4. Click **"Send Test Email"**
5. Check **shivayayogashala09@gmail.com** inbox
6. **Check spam folder** if not in inbox

### If Test Works:
✅ EmailJS is configured correctly  
✅ Problem might be with website code

### If Test Doesn't Work:
❌ Fix EmailJS template settings first  
❌ Make sure "To Email" is set correctly

---

## ✅ Step 4: Check Browser Console

### Open Developer Tools

**Chrome/Edge/Brave:**
- Press `F12` or `Ctrl+Shift+I` (Windows)
- Press `Cmd+Option+I` (Mac)

**Firefox:**
- Press `F12` or `Ctrl+Shift+K` (Windows)
- Press `Cmd+Option+K` (Mac)

### Submit Test Enrollment

1. Fill out the enrollment form
2. Click Submit
3. Watch the Console tab

### Look for These Messages:

**Success Message:**
```
✅ Email notification sent successfully OK
```

**Error Messages:**
```
❌ Email sending failed: 400 Bad Request
❌ Email sending failed: 401 Unauthorized
❌ Email sending failed: 404 Not Found
```

---

## 🚨 Common Error Codes

### Error 400: Bad Request
**Cause**: Template parameters mismatch or "To Email" not set

**Fix**:
1. Check template has "To Email" field set
2. Verify all `{{variables}}` match in code and template
3. Make sure template variables use double curly braces: `{{variable}}`

### Error 401: Unauthorized
**Cause**: Invalid Public Key or Service ID

**Fix**:
1. Verify Public Key: `KEHHKmbHIPRKjPpLm`
2. Verify Service ID: `service_aa9afs7`
3. Go to EmailJS Account → API Keys → Copy again

### Error 404: Not Found
**Cause**: Invalid Template ID

**Fix**:
1. Verify Template ID: `template_oum21q7`
2. Go to Email Templates → Copy the ID again
3. Make sure template is saved (not draft)

### Error 422: Unprocessable Entity
**Cause**: Missing required template variables

**Fix**:
1. Check all `{{variables}}` in template exist in code
2. Make sure no typos in variable names

---

## ✅ Step 5: Check EmailJS Email History

### View Sent Emails

1. Go to EmailJS Dashboard
2. Click **"Email History"** in sidebar
3. Look for recent emails

### What You'll See:

**If Email Was Sent:**
```
Status: Sent ✓
To: shivayayogashala09@gmail.com
Template: template_oum21q7
Date: Today
```

**If Email Failed:**
```
Status: Failed ✗
Error: [Error message here]
```

### If History is Empty:
❌ Emails are not reaching EmailJS  
❌ Check browser console for errors  
❌ Verify credentials in code

---

## ✅ Step 6: Verify Template Variables

### Required Variables in Template

Your EmailJS template **MUST** have these variables:

```
{{to_email}}           - Recipient email (or hardcoded)
{{student_name}}       - Student's name
{{student_email}}      - Student's email
{{student_phone}}      - Student's phone
{{student_country}}    - Student's country
{{student_experience}} - Yoga experience
{{course_title}}       - Selected course
{{student_message}}    - Student's message
{{submission_date}}    - Date and time
```

### How to Check:

1. Open your template in EmailJS
2. Look at the HTML/text content
3. Make sure all variables are wrapped in `{{` and `}}`
4. No typos in variable names

---

## ✅ Step 7: Check Gmail Settings

### Check Spam Folder

1. Log in to **shivayayogashala09@gmail.com**
2. Click **"Spam"** or **"Junk"** folder
3. Look for emails from EmailJS or Shivaya Yogashala

### Mark as Not Spam:

If found in spam:
1. Select the email
2. Click **"Not Spam"** or **"Report Not Spam"**
3. Future emails should arrive in inbox

### Check Filters:

1. Gmail Settings → Filters and Blocked Addresses
2. Make sure no filters are blocking emails
3. Check if any email addresses are blocked

---

## ✅ Step 8: Verify Free Tier Limit

### Check Usage

EmailJS Free Tier: **200 emails/month**

1. Go to EmailJS Account
2. Check usage statistics
3. If limit exceeded, upgrade plan or wait for next month

---

## 🔍 Quick Diagnostics

### Test Checklist:

- [ ] EmailJS service connected to Gmail ✓
- [ ] Template "To Email" field is set ✓
- [ ] Template ID is correct: `template_oum21q7` ✓
- [ ] Service ID is correct: `service_aa9afs7` ✓
- [ ] Public Key is correct: `KEHHKmbHIPRKjPpLm` ✓
- [ ] Test email from dashboard works ✓
- [ ] No errors in browser console ✓
- [ ] Checked spam folder ✓
- [ ] Not exceeding 200 emails/month ✓

---

## 🛠️ Advanced Debugging

### Enable Detailed Logging

The code now logs detailed information. After submitting a form, check console:

**What to Look For:**

```javascript
// Success:
✅ Email notification sent successfully OK

// Failure with details:
❌ Email sending failed: 400 {
  error: "Template 'to' field is not defined"
}
```

### Common Error Messages:

| Error Message | Meaning | Fix |
|--------------|---------|-----|
| "Template 'to' field is not defined" | Missing "To Email" in template | Add `shivayayogashala09@gmail.com` to template |
| "Invalid user ID" | Wrong Public Key | Copy correct Public Key from dashboard |
| "Service is not active" | Gmail disconnected | Reconnect Gmail service |
| "Template not found" | Wrong Template ID | Verify Template ID |
| "Limit exceeded" | Monthly limit reached | Upgrade or wait |

---

## 📧 Minimal Test Template

If nothing works, create a **new simple template**:

### Template Settings:

**To Email:**
```
shivayayogashala09@gmail.com
```

**Subject:**
```
New Enrollment - {{student_name}}
```

**Content:**
```
New student enrolled:

Name: {{student_name}}
Email: {{student_email}}
Phone: {{student_phone}}
Country: {{student_country}}
Experience: {{student_experience}}
Course: {{course_title}}
Message: {{student_message}}
Date: {{submission_date}}
```

**From Name:** Shivaya Yogashala Website

### Test This Template:

1. Create this simple template
2. Copy the new Template ID
3. Update in `/components/ContactPage.tsx` line 156
4. Test again

---

## 🎯 Most Common Issue (90% of cases)

### The "To Email" Field

**Problem**: "To Email" field in EmailJS template is empty or incorrect

**Solution**:

1. Go to EmailJS → Email Templates
2. Edit your template: `template_oum21q7`
3. **Set "To Email" to:** `shivayayogashala09@gmail.com`
4. **OR** use variable: `{{to_email}}`
5. Click **"Save"**
6. Test form again

---

## ✅ Verification Steps

### After Making Changes:

1. ✅ Save EmailJS template
2. ✅ Refresh your website
3. ✅ Clear browser cache (Ctrl+Shift+Delete)
4. ✅ Submit test enrollment
5. ✅ Check browser console
6. ✅ Check EmailJS dashboard → Email History
7. ✅ Check Gmail inbox (and spam)

---

## 🆘 Still Not Working?

### Contact EmailJS Support

If you've tried everything:

1. Email: **support@emailjs.com**
2. Include:
   - Your Public Key
   - Template ID
   - Service ID
   - Error messages from console
   - Screenshots of template settings

### Alternative: Use Another Email Service

If EmailJS continues to fail, consider:

1. **SendGrid** - Free tier: 100 emails/day
2. **Mailgun** - Free tier: 100 emails/day
3. **Resend** - Free tier: 100 emails/day

See `/EMAIL_CONFIGURATION.md` for alternatives.

---

## 📞 Current Configuration

**Your Settings:**

```
Service ID:   service_aa9afs7
Template ID:  template_oum21q7
Public Key:   KEHHKmbHIPRKjPpLm
To Email:     shivayayogashala09@gmail.com
```

**File Location:** `/components/ContactPage.tsx` (lines 155-157)

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Console shows: "✅ Email notification sent successfully"
2. ✅ EmailJS dashboard shows email in history
3. ✅ Email arrives at shivayayogashala09@gmail.com
4. ✅ Student sees "Application submitted successfully" message

---

**Most issues are solved by ensuring the "To Email" field is correctly set in the EmailJS template!**

*Last Updated: November 4, 2025*
