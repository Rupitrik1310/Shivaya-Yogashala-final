# Email Configuration - Shivaya Yogashala

## Primary Contact Email
**shivayayogashala09@gmail.com**

All inquiries and enrollments are configured to be sent to this email address.

---

## 🚀 EmailJS Setup (REQUIRED for Email Notifications)

The website uses **EmailJS** to send email notifications when students submit enrollment forms. Follow these steps to activate email notifications:

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. After logging in, click on **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Select **Gmail** (or your preferred email provider)
4. Click **"Connect Account"**
5. Sign in with **shivayayogashala09@gmail.com**
6. Allow EmailJS to send emails on your behalf
7. Give your service a name (e.g., "Shivaya Yogashala Gmail")
8. **IMPORTANT**: Copy the **Service ID** (e.g., `service_abc123`)
9. Click **"Create Service"**

### Step 3: Create Email Template

1. Click on **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Replace the template content with the following:

**Template Name**: `Enrollment Notification`

**Subject**: 
```
🙏 New Enrollment - {{student_name}}
```

**Content (HTML)**:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2C5F6F 0%, #D4A056 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #2C5F6F; }
        .value { color: #555; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #D4A056; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        .om { font-size: 24px; color: #D4A056; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="om">ॐ</div>
            <h1 style="margin: 10px 0;">Shivaya Yogashala</h1>
            <p style="margin: 5px 0;">New Student Enrollment Received</p>
        </div>
        
        <div class="content">
            <p><strong>Namaste! 🙏</strong></p>
            <p>A new student has submitted an enrollment application:</p>
            
            <div class="field">
                <span class="label">Full Name:</span><br>
                <span class="value">{{student_name}}</span>
            </div>
            
            <div class="field">
                <span class="label">Email Address:</span><br>
                <span class="value">{{student_email}}</span>
            </div>
            
            <div class="field">
                <span class="label">Phone Number:</span><br>
                <span class="value">{{student_phone}}</span>
            </div>
            
            <div class="field">
                <span class="label">Country:</span><br>
                <span class="value">{{student_country}}</span>
            </div>
            
            <div class="field">
                <span class="label">Yoga Experience:</span><br>
                <span class="value">{{student_experience}}</span>
            </div>
            
            <div class="field">
                <span class="label">Interested Course:</span><br>
                <span class="value">{{course_title}}</span>
            </div>
            
            <div class="message-box">
                <span class="label">Student's Message:</span><br>
                <p class="value">{{student_message}}</p>
            </div>
            
            <div class="field" style="margin-top: 20px;">
                <span class="label">Submitted On:</span><br>
                <span class="value">{{submission_date}}</span>
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #D4A056;">
                Please respond to the student within 24-48 hours.<br>
                You can view all enrollments in the Admin Panel.
            </p>
        </div>
        
        <div class="footer">
            <p><strong>ॐ नमः शिवाय</strong> (Om Namaḥ Śivāya)</p>
            <p>Shivaya Yogashala | Tapovan, Rishikesh, Uttarakhand 249137, India</p>
            <p>+91 92886 63019 | shivayayogashala09@gmail.com</p>
        </div>
    </div>
</body>
</html>
```

4. **To Email Address**: Set to `{{to_email}}`
5. **IMPORTANT**: Copy the **Template ID** (e.g., `template_xyz789`)
6. Click **"Save"**

### Step 4: Get Public Key

1. Click on **"Account"** in the left sidebar
2. Under **"API Keys"** section, you'll see your **Public Key**
3. **IMPORTANT**: Copy the **Public Key** (e.g., `user_abc123xyz`)

### Step 5: Update Website Code

1. Open `/components/ContactPage.tsx`
2. Find these lines (around line 145):
```typescript
const serviceId = "service_shivaya"; // REPLACE THIS
const templateId = "template_enrollment"; // REPLACE THIS
const publicKey = "YOUR_EMAILJS_PUBLIC_KEY"; // REPLACE THIS
```

3. Replace with your actual values:
```typescript
const serviceId = "service_abc123"; // Your Service ID from Step 2
const templateId = "template_xyz789"; // Your Template ID from Step 3
const publicKey = "user_abc123xyz"; // Your Public Key from Step 4
```

### Step 6: Test Email Notifications

1. Go to your Contact/Apply page
2. Fill out the enrollment form with test data
3. Submit the form
4. Check **shivayayogashala09@gmail.com** inbox
5. You should receive a beautifully formatted email with the student's details!

---

## 📧 Email Template Variables

The following variables are automatically populated in the email:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{to_email}}` | Recipient email | shivayayogashala09@gmail.com |
| `{{student_name}}` | Student's full name | Priya Sharma |
| `{{student_email}}` | Student's email | priya@example.com |
| `{{student_phone}}` | Student's phone | +91 92886 63019 |
| `{{student_country}}` | Student's country | India |
| `{{student_experience}}` | Yoga experience level | Beginner (6 months - 1 year) |
| `{{course_title}}` | Interested course | 200 Hour Multi-style Yoga Teacher Training |
| `{{student_message}}` | Student's message | Looking forward to joining... |
| `{{submission_date}}` | Submission timestamp | Tuesday, November 4, 2025 at 2:30 PM |

---

## 🎯 How It Works

### When a Student Submits the Form:

1. ✅ Form data is validated
2. ✅ Email notification is sent to **shivayayogashala09@gmail.com** via EmailJS
3. ✅ Enrollment data is saved to Supabase database
4. ✅ Student sees success message
5. ✅ You receive email notification instantly

### What You Receive in Email:

- 🙏 Beautifully formatted email with Shivaya Yogashala branding
- 📋 All student details (name, email, phone, country, experience)
- 📚 Selected course information
- 💬 Student's personal message
- 📅 Submission date and time (Indian Standard Time)
- 🎨 Shiva blue and golden ochre color scheme

---

## 🔧 Troubleshooting

### Email Not Received?

1. **Check Spam/Junk Folder**: EmailJS emails might initially go to spam
2. **Verify EmailJS Configuration**: 
   - Service ID is correct
   - Template ID is correct
   - Public Key is correct
   - Gmail account is connected
3. **Check EmailJS Dashboard**: 
   - Go to https://dashboard.emailjs.com/
   - Click "Email History" to see if emails were sent
4. **Check Browser Console**: Look for any error messages
5. **Test Template**: Use EmailJS "Test" button in template editor

### Common Issues:

**Issue**: "User ID is required"
- **Fix**: Make sure you updated the `publicKey` variable in ContactPage.tsx

**Issue**: "Template not found"
- **Fix**: Verify the `templateId` matches exactly in EmailJS dashboard

**Issue**: "Service not found"
- **Fix**: Verify the `serviceId` matches exactly in EmailJS dashboard

**Issue**: Email sent but not formatted properly
- **Fix**: Make sure you copied the full HTML template content

---

## 📊 EmailJS Free Tier Limits

- **200 emails per month** (free tier)
- More than enough for a yoga school website
- Upgrade to paid plan if you need more

---

## 🔒 Security & Privacy

- ✅ EmailJS keys are public-safe (designed to be used in frontend code)
- ✅ Student data is encrypted in transit
- ✅ No sensitive API keys are exposed
- ✅ Emails are sent securely via HTTPS
- ✅ Student emails are stored securely in Supabase

---

## 📱 Alternative Contact Methods

Students can also reach you via:

1. **WhatsApp**: +91 92886 63019 (Click-to-chat button on Contact page)
2. **Direct Email**: Click on email address to open email client
3. **Admin Panel**: View all enrollments in real-time

---

## 📝 Where Email is Used

### 1. **Contact Page** (`/components/ContactPage.tsx`)
- Displays email with clickable mailto link
- Sends enrollment notifications via EmailJS
- Shows WhatsApp contact option

### 2. **Footer** (`/components/Footer.tsx`)
- Displays email on all pages
- Clickable mailto link

### 3. **Database** (`/supabase/functions/server/index.ts`)
- Stores all enrollment data
- Accessible via Admin Panel

---

## ✅ Checklist

Before your website goes live, make sure:

- [ ] EmailJS account created
- [ ] Gmail service connected to EmailJS
- [ ] Email template created with correct HTML
- [ ] Service ID, Template ID, and Public Key copied
- [ ] ContactPage.tsx updated with correct IDs
- [ ] Test enrollment submitted
- [ ] Email received at shivayayogashala09@gmail.com
- [ ] Email formatting looks correct
- [ ] Spam folder checked (if needed)
- [ ] All student data appears in email

---

## 📞 Support

If you need help setting up EmailJS:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Test your setup using the EmailJS dashboard "Test" feature

---

## Contact Information Summary

**Primary Email**: shivayayogashala09@gmail.com  
**WhatsApp**: +91 92886 63019  
**Location**: Tapovan, Rishikesh, Uttarakhand 249137, India  

---

*Last Updated: November 4, 2025*
*Email notifications powered by EmailJS*
