# 🧪 Email Testing Instructions

## Quick Test to Check Email Functionality

Follow these steps to diagnose why emails aren't working:

---

## Step 1: Open Browser Developer Console

### Chrome/Edge/Brave:
- Press `F12` or right-click → "Inspect"
- Click the **"Console"** tab

### Firefox:
- Press `F12` or right-click → "Inspect Element"
- Click the **"Console"** tab

### Safari:
- Enable Developer Menu: Safari → Preferences → Advanced → "Show Develop menu"
- Press `Cmd+Option+C`

---

## Step 2: Submit a Test Enrollment

1. Go to your website's Contact/Apply page
2. Fill out the enrollment form with test data:
   - **Name**: Test Student
   - **Email**: test@example.com
   - **Phone**: +91 12345 67890
   - **Country**: India
   - **Experience**: Beginner (Less than 6 months)
   - **Course**: Select any course
   - **Message**: This is a test enrollment

3. Click **"Submit Application"**

---

## Step 3: Check Console Messages

### ✅ Success Messages (Good):

```
✅ Email notification sent successfully OK
✅ Email notification process completed
```

If you see this, the email **was sent** to EmailJS successfully.

**Next Steps:**
- Check **shivayayogashala09@gmail.com** inbox
- Check **spam/junk** folder
- Check EmailJS Dashboard → Email History

---

### ❌ Error Messages (Need to Fix):

#### Error: 400 Bad Request
```
❌ Email sending failed: 400 {...}
```

**Likely Cause**: EmailJS template "To Email" field is not set

**Fix**:
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Email Templates → Edit `template_oum21q7`
3. Set "To Email" to: `shivayayogashala09@gmail.com`
4. Save template
5. Test again

---

#### Error: 401 Unauthorized
```
❌ Email sending failed: 401 Unauthorized
```

**Likely Cause**: Invalid Public Key

**Fix**:
1. Go to EmailJS Dashboard → Account → API Keys
2. Copy your Public Key
3. Replace in `/components/ContactPage.tsx` line 157
4. Should look like: `const publicKey = "YOUR_KEY_HERE";`
5. Save file and test again

---

#### Error: 404 Not Found
```
❌ Email sending failed: 404 Not Found
```

**Likely Cause**: Template or Service not found

**Fix**:
1. Verify Template ID in EmailJS Dashboard
2. Verify Service ID in EmailJS Dashboard
3. Update in `/components/ContactPage.tsx` lines 155-156:
   ```typescript
   const serviceId = "service_aa9afs7";
   const templateId = "template_oum21q7";
   ```
4. Make sure IDs match exactly (case-sensitive)
5. Test again

---

#### Error: Network Error
```
❌ Error sending email notification: TypeError: Failed to fetch
```

**Likely Cause**: Network/firewall issue or CORS

**Fix**:
1. Check internet connection
2. Disable VPN/firewall temporarily
3. Try a different browser
4. Clear browser cache

---

## Step 4: Check EmailJS Dashboard

1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **"Email History"** in left sidebar
3. Look for recent emails

### What You Should See:

```
┌──────────────────────────────────────────────────────┐
│  Email History                                       │
├──────────────────────────────────────────────────────┤
│  Status: Sent ✓                                      │
│  To: shivayayogashala09@gmail.com                    │
│  Template: template_oum21q7                          │
│  Service: service_aa9afs7                            │
│  Date: [Today's date and time]                       │
└──────────────────────────────────────────────────────┘
```

### If Email History Shows "Sent":
✅ Email was sent successfully by EmailJS  
📧 Check Gmail inbox and spam folder  
⏰ Wait a few minutes (can take 1-5 minutes)

### If Email History Shows "Failed":
❌ Click on the failed email to see error details  
🔧 Fix the error and try again

### If Email History is Empty:
❌ Email request is not reaching EmailJS  
🔍 Check browser console errors  
🔧 Verify credentials in code

---

## Step 5: Verify EmailJS Template Settings

### Critical Settings to Check:

1. **To Email Field** (MOST IMPORTANT)
   ```
   To Email: shivayayogashala09@gmail.com
   ```
   OR use variable:
   ```
   To Email: {{to_email}}
   ```

2. **From Name**
   ```
   From Name: Shivaya Yogashala
   ```

3. **Subject**
   ```
   Subject: 🙏 New Enrollment - {{student_name}}
   ```

4. **Reply To** (Optional but recommended)
   ```
   Reply To: {{student_email}}
   ```

### How to Check:

1. EmailJS Dashboard → Email Templates
2. Find template: `template_oum21q7`
3. Click "Edit"
4. Verify all fields above
5. Click "Save"
6. Test your form again

---

## Step 6: Test Directly in EmailJS

### Use EmailJS Test Feature:

1. Open your template in EmailJS
2. Click **"Test It"** button (top right)
3. Fill in test data:
   ```
   to_email: shivayayogashala09@gmail.com
   student_name: Test Student
   student_email: test@example.com
   student_phone: +91 12345 67890
   student_country: India
   student_experience: Beginner
   course_title: 200 Hour YTT
   student_message: Test message
   submission_date: November 4, 2025
   ```
4. Click "Send Test Email"
5. Check Gmail inbox

### Result:

**If test email arrives:**
✅ EmailJS template is configured correctly  
✅ Gmail service is connected  
❌ Problem is with website code

**If test email doesn't arrive:**
❌ EmailJS template needs fixing  
❌ Check "To Email" field  
❌ Check Gmail service connection

---

## Step 7: Check Gmail Settings

### Inbox Settings:

1. Log in to **shivayayogashala09@gmail.com**
2. Settings (gear icon) → See all settings
3. Filters and Blocked Addresses
4. Make sure no filters are blocking emails

### Spam Folder:

1. Click "Spam" or "Junk" in Gmail sidebar
2. Search for emails from EmailJS
3. If found, mark as "Not Spam"

### Allow EmailJS:

1. Add `noreply@emailjs.com` to contacts
2. This helps prevent future emails going to spam

---

## 🔍 Quick Diagnostic Checklist

Run through this checklist:

- [ ] Browser console shows: "✅ Email notification sent successfully"
- [ ] No error messages in console
- [ ] EmailJS Dashboard → Email History shows email
- [ ] Template "To Email" field is set correctly
- [ ] Service is connected to Gmail
- [ ] Template ID matches code: `template_oum21q7`
- [ ] Service ID matches code: `service_aa9afs7`
- [ ] Public Key matches code: `KEHHKmbHIPRKjPpLm`
- [ ] Checked Gmail inbox (not just notifications)
- [ ] Checked Gmail spam/junk folder
- [ ] Test email from EmailJS dashboard works

---

## 🎯 Most Likely Issues (in order)

### 1. "To Email" Not Set (90% of issues)
**Fix**: Set "To Email" to `shivayayogashala09@gmail.com` in template

### 2. Email in Spam Folder (5% of issues)
**Fix**: Check spam, mark as "Not Spam"

### 3. Gmail Service Disconnected (3% of issues)
**Fix**: Reconnect Gmail in EmailJS dashboard

### 4. Template Variables Mismatch (1% of issues)
**Fix**: Ensure all `{{variables}}` match in template and code

### 5. Wrong Credentials (1% of issues)
**Fix**: Verify Service ID, Template ID, and Public Key

---

## 📧 Expected Email Content

When working correctly, you should receive an email like this:

```
From: Shivaya Yogashala <noreply@emailjs.com>
To: shivayayogashala09@gmail.com
Subject: 🙏 New Enrollment - Test Student

🙏 Namaste! New Student Enrollment Received

Student Details:
Name: Test Student
Email: test@example.com
Phone: +91 12345 67890
Country: India
Yoga Experience: Beginner
Interested Course: 200 Hour YTT

Message from Student:
This is a test enrollment

Submitted On: [Date and Time]

ॐ नमः शिवाय (Om Namaḥ Śivāya)
Shivaya Yogashala | Rishikesh, India
+91 92886 63019 | shivayayogashala09@gmail.com
```

---

## 🆘 Still Having Issues?

### Try This Simple Test:

1. Open browser console
2. Copy and paste this code:
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
      student_name: 'Console Test',
      student_email: 'test@test.com',
      student_phone: '+91 12345 67890',
      student_country: 'India',
      student_experience: 'Beginner',
      course_title: 'Test Course',
      student_message: 'Direct console test',
      submission_date: new Date().toLocaleString()
    }
  })
})
.then(r => r.text())
.then(t => console.log('Result:', t))
.catch(e => console.error('Error:', e));
```

3. Press Enter
4. Check the result in console
5. If it says "OK", check your email
6. If it shows an error, read the error message

---

## 📖 Additional Resources

- 📘 See `/EMAIL_TROUBLESHOOTING.md` for detailed solutions
- 📖 See `/EMAIL_CONFIGURATION.md` for full setup guide
- 🔧 See `/QUICK_EMAIL_SETUP.md` for setup instructions
- 📞 EmailJS Support: support@emailjs.com
- 📚 EmailJS Docs: https://www.emailjs.com/docs/

---

## ✅ Success Criteria

You'll know everything is working when:

1. ✅ Form submission succeeds
2. ✅ Console shows "✅ Email notification sent successfully"
3. ✅ EmailJS dashboard shows email in history (Status: Sent)
4. ✅ Email arrives at shivayayogashala09@gmail.com
5. ✅ Email contains all student details correctly formatted

---

**TIP**: The #1 issue is the "To Email" field not being set in the EmailJS template. Check that first!

*Last Updated: November 4, 2025*
