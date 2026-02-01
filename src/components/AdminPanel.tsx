import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { toast } from "sonner@2.0.3";
import { PlusCircle, Users, BookOpen, Video } from "lucide-react";

export function AdminPanel() {
  const [loading, setLoading] = useState(false);

  const seedTeachers = async () => {
    setLoading(true);
    const teachers = [
      {
        name: "Swami Dharmananda Saraswati",
        photo: "https://images.unsplash.com/photo-1758274535024-be3faa30f507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwaW5zdHJ1Y3RvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc2MDUxMTk0MHww&ixlib=rb-4.1.0&q=80&w=1080",
        experience: "15+ years",
        specialization: ["Hatha Yoga", "Pranayama", "Meditation", "Yoga Philosophy"],
        certifications: [
          "Yoga Alliance E-RYT 500",
          "Rishikesh Traditional Gurukul Training",
          "Ayurveda Acharya",
          "Sanskrit Scholar"
        ],
        bio: "Devoted to preserving authentic Hatha Yoga and Shaivism philosophy. Studied for years under traditional gurus in the Himalayas. Master of traditional Indian yoga systems.",
        socialLinks: {
          instagram: "@swami_dharmananda_yoga",
          youtube: "DharmanandaYogashala"
        }
      },
      {
        name: "Guru Anjali Devi",
        photo: "https://images.unsplash.com/photo-1610978710007-758ad97bb3e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB5b2dhJTIwbWVkaXRhdGlvbiUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NjA2MTEyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        experience: "12+ years",
        specialization: ["Ashtanga Yoga", "Alignment Therapy", "Women's Wellness", "Naturopathy"],
        certifications: [
          "Yoga Alliance RYT 500",
          "Iyengar Yoga Certified",
          "Women's Health Specialist",
          "Anatomy & Physiology Expert"
        ],
        bio: "Expert in alignment-based yoga and women's health. Trained in Varanasi. Combines traditional wisdom with modern anatomy knowledge for safe and effective practice.",
        socialLinks: {
          instagram: "@anjali_yoga_guru",
          youtube: "AnjaliYogaWellness"
        }
      },
      {
        name: "Yogi Vikram Singh",
        photo: "https://images.unsplash.com/photo-1758797315487-b3b225dff7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHRyYWluaW5nJTIwaW5kaWF8ZW58MXx8fHwxNzYwNjExMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        experience: "10+ years",
        specialization: ["Advanced Asanas", "Inversions", "Power Yoga", "Yoga Therapy"],
        certifications: [
          "Yoga Alliance RYT 200",
          "Advanced Asana Specialist",
          "Yoga Therapy Instructor",
          "Sports Yoga Instructor"
        ],
        bio: "Dynamic teacher from Mysore specializing in advanced asana practice. Helps students build strength, flexibility and overcome their limitations through dedicated practice.",
        socialLinks: {
          instagram: "@vikram_power_yoga"
        }
      }
    ];

    try {
      for (const teacher of teachers) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ae7dad4f/teachers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(teacher),
          }
        );
        const data = await response.json();
        if (!data.success) {
          console.error("Error creating teacher:", data.error);
        }
      }
      toast("Teachers added successfully!");
    } catch (error) {
      console.error("Error seeding teachers:", error);
      toast("Error adding teachers");
    } finally {
      setLoading(false);
    }
  };

  const seedCourses = async () => {
    setLoading(true);
    const courses = [
      {
        title: "Multi-Style Yoga Retreat in Rishikesh, India",
        description: "A journey to relax, recharge, and discover yourself through yoga, meditation, and nature's serenity. Join our soul-fuel retreat and experience true harmony within. Rishikesh is a well-known destination for Yoga Retreats and Spiritual well-being.",
        syllabus: `
          <ul>
            <li>• Daily Multi-Style Yoga Sessions (Hatha & Ashtanga)</li>
            <li>• Guided Meditation & Pranayama</li>
            <li>• Nature Walks & Spiritual Excursions</li>
            <li>• Ayurvedic Meals & Detox</li>
            <li>• Ganga Aarti & Temple Visits</li>
            <li>• Relaxation & Self-Discovery Workshops</li>
            <li>• Mantra Chanting & Kirtan</li>
            <li>• Personal Reflection & Journaling Time</li>
          </ul>
        `,
        batches: [
          { startDate: "March 10, 2025", endDate: "March 14, 2025" },
          { startDate: "April 15, 2025", endDate: "April 19, 2025" },
          { startDate: "May 20, 2025", endDate: "May 24, 2025" }
        ],
        price: 35000,
        deposit: 10000,
        accreditation: "Certificate of Participation",
        teacherId: "",
        duration: "3, 5 days",
        image: "https://images.unsplash.com/photo-1690229378554-d4a0b22b4019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcmV0cmVhdCUyMG5hdHVyZXxlbnwxfHx8fDE3NjE5OTI4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        title: "200 Hour Multi-Style Yoga Teacher Training Centre",
        description: "Experience the essence of yoga through our 200 Hour Teacher Training - a traditional practice of Hatha, Ashtanga, philosophy and Self-growth. Designed to help you live and share yoga authentically at Shivaya Yogashala.",
        syllabus: `
          <ul>
            <li>• 100+ Multi-Style Asanas (Hatha, Ashtanga, Vinyasa)</li>
            <li>• Pranayama & Advanced Breathing Techniques</li>
            <li>• Meditation & Mindfulness Practices</li>
            <li>• Yoga Philosophy & Ancient Texts</li>
            <li>• Anatomy & Physiology for Yoga</li>
            <li>• Teaching Methodology & Class Sequencing</li>
            <li>• Alignment & Adjustment Techniques</li>
            <li>• Mantra Chanting & Sacred Rituals</li>
            <li>• Ayurveda Fundamentals & Lifestyle</li>
            <li>• Self-Growth & Personal Practice Development</li>
          </ul>
        `,
        batches: [
          { startDate: "March 1, 2025", endDate: "March 27, 2025" },
          { startDate: "April 5, 2025", endDate: "May 1, 2025" },
          { startDate: "June 1, 2025", endDate: "June 27, 2025" }
        ],
        price: 95000,
        deposit: 20000,
        accreditation: "Yoga Alliance RYT 200 Certified",
        teacherId: "",
        duration: "26 Days | Level: Beginner / Foundation",
        image: "https://images.unsplash.com/photo-1758797315487-b3b225dff7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHRyYWluaW5nJTIwZ3JvdXB8ZW58MXx8fHwxNzYyMTAxMjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        title: "300 Hour Multi-Style Yoga Teacher Training Centre",
        description: "Step into the next stage of your yoga journey with our 300 Hour Intermediate TTC. This advanced training expands your knowledge of asanas, alignment and philosophy while refining your teaching skills and personal practice. A perfect balance of depth, discipline and Self-discovery.",
        syllabus: `
          <ul>
            <li>• Advanced Multi-Style Asana Practice & Variations</li>
            <li>• Ashtanga Vinyasa Series (Primary & Intermediate)</li>
            <li>• Advanced Pranayama & Energy Techniques</li>
            <li>• Yoga Therapy & Therapeutic Adjustments</li>
            <li>• Deep Alignment & Biomechanics</li>
            <li>• Chakra & Kundalini Studies</li>
            <li>• Advanced Teaching Skills & Leadership</li>
            <li>• Philosophy Deep Dive & Sacred Texts</li>
            <li>• Sequencing Mastery & Workshop Design</li>
            <li>• Self-Discovery & Inner Transformation</li>
          </ul>
        `,
        batches: [
          { startDate: "May 15, 2025", endDate: "June 12, 2025" },
          { startDate: "July 10, 2025", endDate: "August 7, 2025" }
        ],
        price: 125000,
        deposit: 30000,
        accreditation: "Yoga Alliance RYT 300 Certified",
        teacherId: "",
        duration: "4 weeks | Level: Intermediate",
        image: "https://images.unsplash.com/photo-1758599879795-536d5f203de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwYXNhbmFzJTIwcG9zZXN8ZW58MXx8fHwxNzYwNjExMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "500 Hour Multi-Style Yoga Teacher Training in Rishikesh",
        description: "Our 500 Hour Yoga Teacher Training is a complete and transformative journey from foundation to mastery. Designed for beginners and advanced level practitioners, this course integrates traditional yoga, helping you build a strong foundation, deepen your knowledge and refine your teaching skills. Rooted in ancient wisdom and taught by experienced masters in Rishikesh.",
        syllabus: `
          <ul>
            <li>• Comprehensive Multi-Style Asana Mastery (200+ poses)</li>
            <li>• Complete Pranayama System & Energy Work</li>
            <li>• Deep Meditation & Spiritual Practices</li>
            <li>• Complete Yoga Philosophy & Sacred Texts</li>
            <li>• Advanced Anatomy, Physiology & Biomechanics</li>
            <li>• Professional Teaching Methodology & Mentorship</li>
            <li>• Yoga Therapy & Healing Techniques</li>
            <li>• Chakra, Kundalini & Subtle Body Studies</li>
            <li>• Ayurveda & Yogic Lifestyle Integration</li>
            <li>• Leadership, Ethics & Business of Yoga</li>
            <li>• Personal Practice & Self-Mastery Development</li>
            <li>• Traditional Rituals, Mantras & Sacred Ceremonies</li>
          </ul>
        `,
        batches: [
          { startDate: "February 15, 2025", endDate: "April 12, 2025" },
          { startDate: "September 1, 2025", endDate: "October 27, 2025" }
        ],
        price: 185000,
        deposit: 45000,
        accreditation: "Yoga Alliance RYT 500 Certified",
        teacherId: "",
        duration: "8 weeks | Level: Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1609786323851-b247ac61f096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXNoaWtlc2glMjB5b2dhJTIwYXNocmFtfGVufDF8fHx8MTc2MjEwMTI4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ];

    try {
      for (const course of courses) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ae7dad4f/courses`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(course),
          }
        );
        const data = await response.json();
        if (!data.success) {
          console.error("Error creating course:", data.error);
        }
      }
      toast("Courses added successfully!");
    } catch (error) {
      console.error("Error seeding courses:", error);
      toast("Error adding courses");
    } finally {
      setLoading(false);
    }
  };

  const seedAsanas = async () => {
    setLoading(true);
    const asanas = [
      {
        name: "Surya Namaskar",
        sanskritName: "सूर्य नमस्कार",
        description: "Sun Salutation - A dynamic sequence of 12 poses to warm up the body and energize the spirit",
        benefits: ["Warms up entire body", "Improves flexibility", "Boosts energy", "Increases circulation"],
        difficulty: "Beginner",
        category: "Flow",
        image: "https://images.unsplash.com/photo-1606663368493-131f4f97c095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW4lMjBzYWx1dGF0aW9uJTIweW9nYXxlbnwxfHx8fDE3NjIwMzM3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Adho Mukha Svanasana",
        sanskritName: "अधो मुख श्वानासन",
        description: "Downward Facing Dog - A foundational pose that strengthens and stretches the entire body",
        benefits: ["Strengthens arms and legs", "Stretches hamstrings", "Energizes body", "Relieves back pain"],
        difficulty: "Beginner",
        category: "Standing",
        image: "https://images.unsplash.com/photo-1632167759227-80bdfe5bfbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3dud2FyZCUyMGRvZyUyMHlvZ2F8ZW58MXx8fHwxNzYyMDMzNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Vrikshasana",
        sanskritName: "वृक्षासन",
        description: "Tree Pose - A balancing pose that develops focus, stability and inner calm",
        benefits: ["Improves balance", "Strengthens legs", "Enhances concentration", "Calms the mind"],
        difficulty: "Beginner",
        category: "Balance",
        image: "https://images.unsplash.com/photo-1635366400548-05fefa95193b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwcG9zZSUyMHlvZ2F8ZW58MXx8fHwxNzYyMDMzNzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Virabhadrasana I",
        sanskritName: "वीरभद्रासन I",
        description: "Warrior I Pose - A powerful standing pose that builds strength and stamina",
        benefits: ["Strengthens legs and core", "Opens hips and chest", "Improves focus", "Builds confidence"],
        difficulty: "Beginner",
        category: "Standing",
        image: "https://images.unsplash.com/photo-1561577732-12fffa81b37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJyaW9yJTIwcG9zZSUyMHlvZ2F8ZW58MXx8fHwxNzYyMDMzNzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Trikonasana",
        sanskritName: "त्रिकोणासन",
        description: "Triangle Pose - An essential standing pose that stretches and strengthens the entire body",
        benefits: ["Stretches legs and hips", "Strengthens core", "Improves digestion", "Reduces stress"],
        difficulty: "Beginner",
        category: "Standing",
        image: "https://images.unsplash.com/photo-1758599881359-a3f089f33502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmlhbmdsZSUyMHBvc2UlMjB5b2dhfGVufDF8fHx8MTc2MjAzMzcxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Balasana",
        sanskritName: "बालासन",
        description: "Child's Pose - A restful pose that gently stretches the back and calms the nervous system",
        benefits: ["Relieves back pain", "Calms the mind", "Stretches hips", "Reduces stress and fatigue"],
        difficulty: "Beginner",
        category: "Restorative",
        image: "https://images.unsplash.com/photo-1658281381502-8f73b17b0253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvc2UlMjB5b2dhfGVufDF8fHx8MTc2MjAyOTgxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Padmasana",
        sanskritName: "पद्मासन",
        description: "Lotus Pose - The classic meditation pose that promotes mental clarity and spiritual awakening",
        benefits: ["Improves posture", "Calms the mind", "Stretches ankles and knees", "Awakens chakras"],
        difficulty: "Intermediate",
        category: "Seated",
        image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3R1cyUyMHBvc2UlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc2MjAzMzcxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Bhujangasana",
        sanskritName: "भुजंगासन",
        description: "Cobra Pose - A gentle backbend that opens the chest and strengthens the spine",
        benefits: ["Strengthens spine", "Opens chest and lungs", "Stimulates abdominal organs", "Relieves stress"],
        difficulty: "Beginner",
        category: "Backbend",
        image: "https://images.unsplash.com/photo-1758274533768-ed163c8dc217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2JyYSUyMHBvc2UlMjB5b2dhfGVufDF8fHx8MTc2MjAzMzcxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Phalakasana",
        sanskritName: "फलकासन",
        description: "Plank Pose - A core-strengthening pose that builds full-body stability and endurance",
        benefits: ["Strengthens core", "Tones arms", "Improves posture", "Builds endurance"],
        difficulty: "Intermediate",
        category: "Core",
        image: "https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMHBvc2UlMjB5b2dhfGVufDF8fHx8MTc2MjAzMzcxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Setu Bandhasana",
        sanskritName: "सेतु बंधासन",
        description: "Bridge Pose - A rejuvenating backbend that energizes the body and calms the mind",
        benefits: ["Strengthens back and glutes", "Opens chest", "Calms the brain", "Reduces anxiety"],
        difficulty: "Intermediate",
        category: "Backbend",
        image: "https://images.unsplash.com/photo-1556034910-4162343d4637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZ2UlMjBwb3NlJTIweW9nYXxlbnwxfHx8fDE3NjIwMzM3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Eka Pada Rajakapotasana",
        sanskritName: "एक पाद राजकपोतासन",
        description: "Pigeon Pose - A deep hip opener that releases tension and emotional stress",
        benefits: ["Opens hips", "Stretches thighs", "Releases tension", "Improves flexibility"],
        difficulty: "Intermediate",
        category: "Hip Opener",
        image: "https://images.unsplash.com/photo-1705360315268-5e1ae3d43f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWdlb24lMjBwb3NlJTIweW9nYXxlbnwxfHx8fDE3NjIwMzM3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Ustrasana",
        sanskritName: "उष्ट्रासन",
        description: "Camel Pose - A powerful heart-opening backbend that increases flexibility and energy",
        benefits: ["Opens chest and heart", "Stretches front body", "Strengthens back", "Improves posture"],
        difficulty: "Intermediate",
        category: "Backbend",
        image: "https://images.unsplash.com/photo-1665445114097-ab54bd8b9b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lbCUyMHBvc2UlMjB5b2dhfGVufDF8fHx8MTc2MjAzMzcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Paschimottanasana",
        sanskritName: "पश्चिमोत्तानासन",
        description: "Seated Forward Bend - A calming pose that stretches the entire back of the body",
        benefits: ["Stretches spine", "Calms the mind", "Relieves stress", "Improves digestion"],
        difficulty: "Beginner",
        category: "Forward Fold",
        image: "https://images.unsplash.com/photo-1758599879178-e5be0375dee9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF0ZWQlMjBmb3J3YXJkJTIwYmVuZHxlbnwxfHx8fDE3NjIwMzM3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Sirsasana",
        sanskritName: "शीर्षासन",
        description: "Headstand - King of asanas that reverses blood flow and awakens consciousness",
        benefits: ["Improves concentration", "Strengthens core and arms", "Calms mind", "Increases blood flow to brain"],
        difficulty: "Advanced",
        category: "Inversion",
        image: "https://images.unsplash.com/photo-1645148333720-1233b58895af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc3RhbmQlMjB5b2dhJTIwcG9zZXxlbnwxfHx8fDE3NjIwMzM3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Sarvangasana",
        sanskritName: "सर्वांगासन",
        description: "Shoulder Stand - Queen of asanas that nourishes the thyroid and calms the nervous system",
        benefits: ["Stimulates thyroid", "Calms nervous system", "Strengthens shoulders", "Improves circulation"],
        difficulty: "Advanced",
        category: "Inversion",
        image: "https://images.unsplash.com/photo-1725352200750-ad02ebbb1148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG91bGRlciUyMHN0YW5kJTIweW9nYXxlbnwxfHx8fDE3NjIwMzM3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        name: "Bakasana",
        sanskritName: "बकासन",
        description: "Crow Pose - An arm balance that builds strength, focus and fearlessness",
        benefits: ["Strengthens arms and wrists", "Tones core", "Improves balance", "Builds confidence"],
        difficulty: "Advanced",
        category: "Arm Balance",
        image: "https://images.unsplash.com/photo-1758599879246-154f728f1c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm93JTIwcG9zZSUyMHlvZ2F8ZW58MXx8fHwxNzYyMDMzNzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ];

    try {
      for (const asana of asanas) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ae7dad4f/asanas`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(asana),
          }
        );
        const data = await response.json();
        if (!data.success) {
          console.error("Error creating asana:", data.error);
        }
      }
      toast("Asanas added successfully!");
    } catch (error) {
      console.error("Error seeding asanas:", error);
      toast("Error adding asanas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              ॐ Shivaya Yogashala - Admin Panel
            </CardTitle>
            <p className="text-muted-foreground">
              Quick setup to populate your website with sample data
            </p>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-primary/20 hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-primary mb-2">Seed Teachers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add 3 sample teacher profiles with experience, certifications, and specializations
                </p>
              </div>
              <Button 
                onClick={seedTeachers}
                disabled={loading}
                className="w-full bg-primary"
              >
                <PlusCircle size={16} className="mr-2" />
                Add Teachers
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-secondary mb-2">Seed Courses</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add 3 sample courses including 200hr Multistyle YTT, 300hr TTC, and Pranayama workshop
                </p>
              </div>
              <Button 
                onClick={seedCourses}
                disabled={loading}
                className="w-full bg-secondary"
              >
                <PlusCircle size={16} className="mr-2" />
                Add Courses
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-primary mb-2">Seed Asanas</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add sample yoga poses to the asana library with descriptions and benefits
                </p>
              </div>
              <Button 
                onClick={seedAsanas}
                disabled={loading}
                className="w-full bg-primary"
              >
                <PlusCircle size={16} className="mr-2" />
                Add Asanas
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-2 border-primary">
          <CardContent className="p-6">
            <h4 className="text-primary mb-4">Next Steps</h4>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>1. Click the buttons above to populate your website with sample data</li>
              <li>2. Visit the main website pages to see the populated content</li>
              <li>3. Use the API endpoints to add, edit, or delete content as needed</li>
              <li>4. Customize the content to match your actual yogashala details</li>
              <li>5. Test the enrollment form to ensure emails are being received</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
