# ⚡ Quick Email Setup Guide

## 🎯 Goal
Receive email notifications at **shivayayogashala09@gmail.com** when students submit enrollment forms.

---

## 📋 5-Minute Setup

### Step 1: Create EmailJS Account (2 minutes)
1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** → Use any email to create account
3. Verify your email

### Step 2: Connect Gmail (1 minute)
1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"** → Select **Gmail**
3. Sign in with **shivayayogashala09@gmail.com**
4. **COPY the Service ID** (looks like: `service_abc123`)

### Step 3: Create Template (1 minute)
1. Click **"Email Templates"** → **"Create New Template"**
2. Click **"Use Template"** and select any template
3. In **Subject** field, type: `New Enrollment - {{student_name}}`
4. In **Content** field, paste this simple template:

```
New student enrollment received!

Name: {{student_name}}
Email: {{student_email}}
Phone: {{student_phone}}
Country: {{student_country}}
Experience: {{student_experience}}
Course: {{course_title}}
Message: {{student_message}}

Submitted: {{submission_date}}
```

5. Set **To Email** to: `{{to_email}}`
6. **COPY the Template ID** (looks like: `template_xyz789`)
7. Click **"Save"**

### Step 4: Get Public Key (30 seconds)
1. Click **"Account"** in sidebar
2. Find **"API Keys"** section
3. **COPY the Public Key** (looks like: `user_abc123xyz`)

### Step 5: Update Website Code (30 seconds)
1. Open `/components/ContactPage.tsx` in your code editor
2. Find around **line 145** these three lines:
```typescript
const serviceId = "service_shivaya";
const templateId = "template_enrollment";
const publicKey = "YOUR_EMAILJS_PUBLIC_KEY";
```

3. Replace with YOUR values:
```typescript
const serviceId = "service_abc123"; // YOUR Service ID
const templateId = "template_xyz789"; // YOUR Template ID
const publicKey = "user_abc123xyz"; // YOUR Public Key
```

4. Save the file

### Step 6: Test It! (1 minute)
1. Go to your Contact/Apply page
2. Fill out the enrollment form
3. Click Submit
4. Check **shivayayogashala09@gmail.com** inbox
5. ✅ You should receive the email!

---

## 🎨 Want a Beautiful Email Template?

Use this fancy HTML template instead (copy/paste into EmailJS template editor):

**Subject:**
```
🙏 New Enrollment - {{student_name}}
```

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
    <div style="background: linear-gradient(135deg, #2C5F6F 0%, #D4A056 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 32px;">ॐ</h1>
        <h2 style="margin: 10px 0;">Shivaya Yogashala</h2>
        <p style="margin: 5px 0;">New Student Enrollment</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
        <p><strong>Namaste! 🙏</strong></p>
        
        <p><strong style="color: #2C5F6F;">Student Name:</strong><br>{{student_name}}</p>
        <p><strong style="color: #2C5F6F;">Email:</strong><br>{{student_email}}</p>
        <p><strong style="color: #2C5F6F;">Phone:</strong><br>{{student_phone}}</p>
        <p><strong style="color: #2C5F6F;">Country:</strong><br>{{student_country}}</p>
        <p><strong style="color: #2C5F6F;">Experience:</strong><br>{{student_experience}}</p>
        <p><strong style="color: #2C5F6F;">Interested Course:</strong><br>{{course_title}}</p>
        
        <div style="background: #f0f0f0; padding: 15px; margin: 20px 0; border-left: 4px solid #D4A056;">
            <strong style="color: #2C5F6F;">Message:</strong><br>
            {{student_message}}
        </div>
        
        <p><strong style="color: #2C5F6F;">Submitted:</strong><br>{{submission_date}}</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 2px solid #D4A056;">
        
        <p style="text-align: center; color: #888; font-size: 14px;">
            <strong style="color: #D4A056;">ॐ नम�� शिवाय</strong><br>
            Shivaya Yogashala | Rishikesh, India<br>
            +91 92886 63019 | shivayayogashala09@gmail.com
        </p>
    </div>
</div>
```

---

## 🔍 Troubleshooting

**Problem: Email not received?**
- ✅ Check spam/junk folder
- ✅ Verify you copied Service ID, Template ID, and Public Key correctly
- ✅ Make sure Gmail is connected in EmailJS
- ✅ Check EmailJS dashboard > Email History

**Problem: Website code error?**
- ✅ Make sure all three IDs are in quotes: `"service_abc123"`
- ✅ Save the file after editing
- ✅ Refresh your browser page

**Problem: Template variables not working?**
- ✅ Make sure you use double curly braces: `{{student_name}}`
- ✅ Set "To Email" field to: `{{to_email}}`

---

## 📊 Free Tier Limits

EmailJS Free Account includes:
- ✅ **200 emails per month** (plenty for most yoga schools)
- ✅ Unlimited templates
- ✅ Email tracking and history
- ✅ No credit card required

---

## ✅ Quick Checklist

- [ ] Created EmailJS account
- [ ] Connected Gmail (shivayayogashala09@gmail.com)
- [ ] Created email template
- [ ] Got Service ID, Template ID, and Public Key
- [ ] Updated ContactPage.tsx with correct IDs
- [ ] Saved the file
- [ ] Tested with enrollment form
- [ ] Received email successfully

---

## 🎉 Done!

You're all set! Every time a student submits the enrollment form:
1. ✉️ You'll receive an email at **shivayayogashala09@gmail.com**
2. 💾 Data is saved in your database
3. ✅ Student sees success message

**Need help?** See the full guide in `/EMAIL_CONFIGURATION.md`

---

*Setup time: ~5 minutes | Cost: Free | Email limit: 200/month*
