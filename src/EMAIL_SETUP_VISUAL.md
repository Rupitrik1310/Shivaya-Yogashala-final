# 📧 Visual Email Setup Guide

## 🎯 Exactly Where to Update the Code

### Step 1: Get Your EmailJS Credentials

Go to **https://dashboard.emailjs.com/** and collect these 3 values:

```
┌─────────────────────────────────────────────────────────┐
│  EmailJS Dashboard                                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Email Services → Your Gmail Service                │
│     📋 Service ID: service_abc123                      │
│                                                         │
│  2. Email Templates → Your Template                    │
│     📋 Template ID: template_xyz789                    │
│                                                         │
│  3. Account → API Keys                                 │
│     📋 Public Key: user_abc123xyz                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### Step 2: Update ContactPage.tsx

**File Location**: `/components/ContactPage.tsx`

**Line Numbers**: Around 152-154

**FIND THIS CODE:**

```typescript
const sendEmailNotification = async (data: typeof formData, courseTitle: string) => {
  try {
    // ⚠️ IMPORTANT: Replace these with your actual EmailJS credentials
    // See QUICK_EMAIL_SETUP.md for step-by-step instructions (takes 5 minutes)
    // Get your credentials from: https://dashboard.emailjs.com/
    
    const serviceId = "service_shivaya"; // Replace with YOUR Service ID
    const templateId = "template_enrollment"; // Replace with YOUR Template ID
    const publicKey = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with YOUR Public Key
```

**CHANGE TO THIS:**

```typescript
const sendEmailNotification = async (data: typeof formData, courseTitle: string) => {
  try {
    // ⚠️ IMPORTANT: Replace these with your actual EmailJS credentials
    // See QUICK_EMAIL_SETUP.md for step-by-step instructions (takes 5 minutes)
    // Get your credentials from: https://dashboard.emailjs.com/
    
    const serviceId = "service_abc123"; // ← YOUR Service ID here
    const templateId = "template_xyz789"; // ← YOUR Template ID here
    const publicKey = "user_abc123xyz"; // ← YOUR Public Key here
```

---

## 🔍 Before and After Comparison

### ❌ BEFORE (Default - Won't Work)

```typescript
const serviceId = "service_shivaya";           // ← Generic placeholder
const templateId = "template_enrollment";      // ← Generic placeholder
const publicKey = "YOUR_EMAILJS_PUBLIC_KEY";   // ← Generic placeholder
```

### ✅ AFTER (Your Actual IDs - Will Work!)

```typescript
const serviceId = "service_abc123";      // ← From EmailJS Dashboard
const templateId = "template_xyz789";    // ← From EmailJS Dashboard
const publicKey = "user_abc123xyz";      // ← From EmailJS Dashboard
```

---

## 📝 Copy-Paste Template

Use this template and fill in YOUR values:

```typescript
const serviceId = "service_________";    // Paste your Service ID
const templateId = "template_________";  // Paste your Template ID
const publicKey = "user_________";       // Paste your Public Key
```

---

## 🎨 Visual Code Highlighting

```typescript
  const sendEmailNotification = async (data: typeof formData, courseTitle: string) => {
    try {
      // EmailJS configuration
      
      // 🔴 CHANGE THIS LINE:
      const serviceId = "service_shivaya";
      // ✅ TO YOUR SERVICE ID (from Email Services):
      const serviceId = "service_abc123";

      // 🔴 CHANGE THIS LINE:
      const templateId = "template_enrollment";
      // ✅ TO YOUR TEMPLATE ID (from Email Templates):
      const templateId = "template_xyz789";

      // 🔴 CHANGE THIS LINE:
      const publicKey = "YOUR_EMAILJS_PUBLIC_KEY";
      // ✅ TO YOUR PUBLIC KEY (from Account → API Keys):
      const publicKey = "user_abc123xyz";

      // ⚠️ DON'T CHANGE ANYTHING BELOW THIS LINE
      const templateParams = {
        to_email: "shivayayogashala09@gmail.com",
        student_name: data.name,
        // ... rest stays the same
      };
```

---

## 🎯 How to Edit the File

### Option 1: Using a Code Editor (Recommended)

1. Open your project folder
2. Navigate to: `components/ContactPage.tsx`
3. Press `Ctrl+F` (or `Cmd+F` on Mac) to search
4. Search for: `service_shivaya`
5. Replace with your actual Service ID
6. Search for: `template_enrollment`
7. Replace with your actual Template ID
8. Search for: `YOUR_EMAILJS_PUBLIC_KEY`
9. Replace with your actual Public Key
10. **Save the file** (`Ctrl+S` or `Cmd+S`)

### Option 2: Find by Line Number

1. Open `components/ContactPage.tsx`
2. Go to **line 152** (or nearby)
3. You'll see the three `const` declarations
4. Replace the values in quotes with YOUR values
5. **Save the file**

---

## ✅ Verification Checklist

After editing, verify:

- [ ] Service ID starts with `service_`
- [ ] Template ID starts with `template_`
- [ ] Public Key is a long alphanumeric string
- [ ] All values are inside **quotes** (`"like_this"`)
- [ ] No typos in the IDs
- [ ] File is **saved**

---

## 🧪 Test Your Setup

### Test 1: Check Syntax
```typescript
// ✅ Correct syntax:
const serviceId = "service_abc123";

// ❌ Wrong syntax (missing quotes):
const serviceId = service_abc123;

// ❌ Wrong syntax (using single quotes):
const serviceId = 'service_abc123';
```

### Test 2: Check Format
```typescript
// ✅ Correct format:
const serviceId = "service_1a2b3c4d";
const templateId = "template_9x8y7z6w";
const publicKey = "ABC123def456GHI789";

// ❌ Wrong (generic placeholders):
const serviceId = "service_shivaya";
const templateId = "template_enrollment";
const publicKey = "YOUR_EMAILJS_PUBLIC_KEY";
```

---

## 🎬 Step-by-Step Example

### Example Values (yours will be different):

```
Service ID: service_1a2b3c4
Template ID: template_9x8y7z
Public Key: ABC123xyz
```

### Original Code:

```typescript
const serviceId = "service_shivaya";
const templateId = "template_enrollment";
const publicKey = "YOUR_EMAILJS_PUBLIC_KEY";
```

### Updated Code:

```typescript
const serviceId = "service_1a2b3c4";        // ← Changed
const templateId = "template_9x8y7z";       // ← Changed
const publicKey = "ABC123xyz";              // ← Changed
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Not using quotes
```typescript
const serviceId = service_abc123;  // WRONG!
```
**Fix**: Always use quotes: `"service_abc123"`

### ❌ Mistake 2: Forgetting to save file
After editing, you MUST save the file!

### ❌ Mistake 3: Wrong IDs
```typescript
const serviceId = "template_xyz";  // WRONG! (template ID in service ID)
```
**Fix**: Service ID must start with `service_`

### ❌ Mistake 4: Typos
```typescript
const serviceId = "servise_abc";   // WRONG! (servise instead of service)
```
**Fix**: Copy-paste from EmailJS dashboard

---

## 🎯 Quick Reference Table

| Variable | Starts With | Example | Where to Find |
|----------|-------------|---------|---------------|
| `serviceId` | `service_` | `service_abc123` | EmailJS → Email Services |
| `templateId` | `template_` | `template_xyz789` | EmailJS → Email Templates |
| `publicKey` | (varies) | `ABC123xyz` | EmailJS → Account → API Keys |

---

## 🔄 After You Update

1. **Save the file**
2. **Refresh your browser** on the website
3. **Test the enrollment form**:
   - Go to Contact/Apply page
   - Fill out form with test data
   - Click Submit
   - Check email: shivayayogashala09@gmail.com

4. **Verify email received** ✅

---

## 🆘 Still Stuck?

### If code editor shows error:
- Check for missing quotes
- Check for typos
- Make sure all semicolons are there

### If email not received:
- Check EmailJS Dashboard → Email History
- Check spam folder
- Verify IDs are correct
- See `/EMAIL_CONFIGURATION.md` Troubleshooting section

---

## 💡 Pro Tips

1. **Copy-paste** IDs from EmailJS to avoid typos
2. **Don't remove quotes** around the values
3. **Save the file** after editing
4. **Clear browser cache** if changes don't show
5. **Test immediately** after updating

---

**That's it!** Once you update these 3 lines, your email notifications will work perfectly! 🎉

---

*See `/QUICK_EMAIL_SETUP.md` for the complete setup process*
