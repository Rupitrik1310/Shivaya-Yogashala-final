# 🕉️ Shivaya Yogashala - Complete Guide

## Welcome to Shivaya Yogashala Website

A comprehensive, spiritually authentic website for a traditional Indian Yoga Institute featuring:

- **Full Backend Integration** with Supabase
- **Dynamic Content Management** for Teachers, Courses & Asanas  
- **Student Enrollment System** with Email & WhatsApp integration
- **Sacred Design Elements** including Chakras, Mandalas, and Sanskrit mantras
- **Mobile Responsive** design optimized for all devices

---

## ⚠️ IMPORTANT: Email Setup Required

📧 **Email notifications need 5-minute setup!**

Your website saves all enrollments to the database, but to receive **email notifications** at **shivayayogashala09@gmail.com**, you need to complete the EmailJS setup.

👉 **Start here**: `/QUICK_EMAIL_SETUP.md` (takes 5 minutes)  
📚 **Full guide**: `/EMAIL_CONFIGURATION.md`

---

## 🎨 Design Theme

### Color Palette (Inspired by Lord Shiva)
- **Shiva Teal**: `#0A9396` - Primary brand color
- **Shiva Blue**: `#1E88A8` - Calm divine energy
- **Golden Ochre**: `#E9A83B` - Enlightenment
- **Golden Aura**: `#F4A261` - Halo effect
- **Charcoal**: `#2B2D42` - Mahadev essence
- **Ash Grey**: `#8D99AE` - Balance
- **Off White**: `#F5F3EE` - Background

### Sacred Elements
- ✅ ॐ Symbol in header
- ✅ 7 Chakras with hover tooltips in footer
- ✅ Mandala watermark on every page
- ✅ Sanskrit mantras: ॐ नमः शिवाय, योग: कर्मसु कौशलम्
- ✅ Spiritual icons: Trishul, Rudraksha, Lotus

---

## 📄 Website Pages

### 1. **Home Page** (`/`)
- Hero section with ॐ symbol and welcome message
- Features section highlighting key benefits
- Sacred elements showcase
- Student testimonials
- Call-to-action for enrollment

### 2. **About Us** (`/about`)
- Philosophy & lineage of Shivaya Yogashala
- Mission & vision statements
- **Dynamic Teacher Profiles** with photos, experience, certifications
- Core values section

### 3. **Courses & TTC** (`/courses`)
- **Dynamic Course Listings** from database
- Course details: duration, price, batches, accreditation
- "Why Take Teacher Training" section
- Apply Now CTA

### 4. **Asana Library** (`/videos`)
- **Filterable Asana Collection** (Beginner/Intermediate/Advanced)
- Each asana includes:
  - Sanskrit & English names
  - Description & benefits
  - Difficulty level badge
  - Category classification
- Pranayama practices section

### 5. **Apply Now** (`/contact`)
- **Multi-Step Enrollment Form**:
  - Step 1: Personal Information
  - Step 2: Background & Experience
  - Step 3: Course Selection
  - Step 4: Additional Info & Review
- **WhatsApp Integration** for instant contact
- Contact information & map
- Success confirmation page

---

## 🔧 Admin Panel - Quick Setup

### Access the Admin Panel
Add `?admin=true` to your URL:
```
https://your-website.com/?admin=true
```

### Populate Sample Data

The admin panel provides three quick-setup buttons:

#### 1. **Seed Teachers** 
Adds 3 sample teachers:
- Swami Dharmananda (Hatha Yoga & Philosophy)
- Priya Sharma (Ashtanga & Alignment)
- Yogi Arjun (Advanced Asanas & Acro Yoga)

Each includes: Photo, 10+ years experience, specializations, certifications, bio, and social links

#### 2. **Seed Courses**
Adds 3 sample courses:
- 200 Hour Traditional Hatha Yoga TTC ($1,499)
- 300 Hour Advanced Yoga TTC ($1,899)
- Pranayama & Meditation Intensive ($799)

Each includes: Description, syllabus, upcoming batches, pricing, accreditation

#### 3. **Seed Asanas**
Adds sample yoga poses with:
- Sanskrit names
- Benefits
- Difficulty levels
- Categories

---

## 🛠️ Backend API Endpoints

All endpoints are prefixed with: `/make-server-ae7dad4f/`

### Teachers Management
- `GET /teachers` - Get all teachers
- `GET /teachers/:id` - Get single teacher
- `POST /teachers` - Create new teacher
- `PUT /teachers/:id` - Update teacher
- `DELETE /teachers/:id` - Delete teacher

### Courses Management  
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get single course
- `POST /courses` - Create new course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

### Enrollment
- `POST /enrollment` - Submit student application
- `GET /enrollments` - View all enrollments (admin)

### Asanas Library
- `GET /asanas` - Get all asanas
- `POST /asanas` - Add new asana

---

## 💬 WhatsApp Integration

When users click "Chat on WhatsApp", it opens WhatsApp with:
- Pre-filled message
- Student information
- Course selection
- Instant communication

**Phone Number**: +91 92886 63019 (Update this in ContactPage.tsx)

---

## 📧 Email Notifications

Enrollment submissions are logged to the server console. 

To enable actual email notifications:
1. Integrate with an email service (SendGrid, Mailgun, etc.)
2. Add email sending logic in the `/enrollment` endpoint
3. Configure SMTP credentials in environment variables

---

## 🎯 Key Features

### ✅ Spiritual Design
- Authentic Indian yoga aesthetics
- Sacred geometry (mandalas)
- Chakra visualization
- Sanskrit typography

### ✅ Dynamic Content
- CRUD operations for all content
- Real-time updates
- No hardcoded content (except defaults)

### ✅ Student Experience
- Easy multi-step application
- WhatsApp quick contact
- Course filtering
- Mobile responsive

### ✅ SEO & Performance
- Clean semantic HTML
- Optimized images
- Fast loading
- Accessible design

---

## 🚀 Getting Started

1. **Access the website** - View the home page
2. **Open Admin Panel** - Add `?admin=true` to URL
3. **Seed Data** - Click all three seed buttons
4. **Explore Pages** - Navigate through all 5 pages
5. **Test Enrollment** - Fill out the application form
6. **Check WhatsApp** - Try the instant messaging feature

---

## 📱 Responsive Design

Fully optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1920px+)

---

## 🔐 Security Notes

- Public API key is safe for frontend use
- Service role key stays on server only
- No sensitive data in frontend code
- CORS enabled for cross-origin requests

---

## 🌟 Customization Tips

### Update Contact Information
Edit `/components/ContactPage.tsx` and `/components/Footer.tsx`

### Change WhatsApp Number
Find `wa.me/919288663019` in ContactPage.tsx and update

### Add More Teachers/Courses
Use the admin panel or API endpoints

### Modify Colors
Update `/styles/globals.css` CSS variables

### Add New Pages
Create component in `/components/` and add to App.tsx routing

---

## 📞 Support

For questions or customization:
- Email: shivayayogashala09@gmail.com
- WhatsApp: +91 92886 63019

---

## 🙏 Sanskrit Blessings

**ॐ नमः शिवाय** (Om Namah Shivaya)
*I bow to Shiva, the inner Self*

**योग: कर्मसु कौशलम्** (Yogaḥ Karmasu Kauśalam)
*Yoga is skill in action*

**लोकाः समस्ताः सुखिनो भवन्तु** (Lokāḥ Samastāḥ Sukhino Bhavantu)
*May all beings everywhere be happy and free*

---

**Built with ❤️ for the spiritual seekers of the world**

🕉️ **Shivaya Yogashala** - Where Ancient Wisdom Meets Modern Practice 🕉️
