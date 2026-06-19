import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import { MandalaWatermark } from "./MandalaWatermark";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";   // ✅ required

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getGalleryImages, type GalleryImage } from "../utils/gallery";

import shivaLogo from "../assets/shivaya-yoga-logo.webp";
import rys200Badge from "../assets/rys200Badge.webp";
import rys300Badge from "../assets/rys300Badge.webp";
import rys500Badge from "../assets/rys500Badge.webp";
import sacredImg from "../assets/image6.webp";
import img1 from "../assets/image1.webp";
import img2 from "../assets/image2.webp";
import img3 from "../assets/image3.webp";
import img4 from "../assets/image4.webp";

import {
  CheckCircle,
  Flower,
  Heart,
  Users,
  Award,
  Clock,
  Sparkles,
  Flame,
  HandMetal,
  Flower2,
  Star,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { projectId, publicAnonKey } from "../utils/supabase/info";
import {
  getGoogleReviewsSummary,
} from "../utils/googleReviews";
import { getCourseDetailByTitle } from "../data/courseDetails";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string | undefined;
  batches: { startDate: string; endDate: string }[];
}

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

const homeCourseCatalog: Course[] = [
  {
    id: "200-hour-ytt",
    title: "200-Hour Multi-Style Yoga Teacher Training",
    description:
      "Comprehensive course covering Hatha, Ashtanga, and traditional yoga philosophy.",
    duration: "25 Days",
    price: 0,
    image: img1,
    batches: [],
  },
  {
    id: "300-hour-ytt",
    title: "300-Hour Multi-style Yoga Teacher Training",
    description:
      "Advanced training for experienced practitioners.",
    duration: "28 Days",
    price: 0,
    image: img2,
    batches: [],
  },
  {
    id: "500-hour-ytt",
    title: "500-Hour Multi-style Yoga Teacher Training",
    description:
      "Complete comprehensive program for ultimate yoga mastery.",
    duration: "54 Days",
    price: 0,
    image: img3,
    batches: [],
  },
  {
    id: "100-hour-ytt",
    title: "100 Hour Yoga TTC",
    description:
      "Teacher training for students beginning a focused yoga study journey.",
    duration: "Details Coming Soon",
    price: 0,
    image: img4,
    batches: [],
  },
  {
    id: "aerial-yoga-ttc",
    title: "Aerial Yoga TTC",
    description:
      "Aerial yoga teacher training with course details to be updated after client confirmation.",
    duration: "Details Coming Soon",
    price: 0,
    image: img2,
    batches: [],
  },
  {
    id: "sound-healing-ttc",
    title: "Sound Healing TTC",
    description:
      "Sound healing teacher training with final curriculum details coming soon.",
    duration: "Details Coming Soon",
    price: 0,
    image: img3,
    batches: [],
  },
  {
    id: "yoga-retreat",
    title: "Yoga Retreat in Rishikesh, India",
    description:
      "Focused Hatha Yoga training retreat.",
    duration: "3 to 5 Days",
    price: 28000,
    image: img4,
    batches: [],
  },
];

const fallbackGalleryImages: GalleryImage[] = [
  {
    src: img1,
    alt: "Traditional yoga practice at Shivaya Yogashala",
    caption: "Traditional posture work",
    rotate: "-5deg",
    fileName: "fallback-image-1",
  },
  {
    src: img2,
    alt: "Students practicing yoga at Shivaya Yogashala",
    caption: "Guided class practice",
    rotate: "3deg",
    fileName: "fallback-image-2",
  },
  {
    src: img3,
    alt: "Yoga class alignment session",
    caption: "Alignment and awareness",
    rotate: "-2deg",
    fileName: "fallback-image-3",
  },
  {
    src: img4,
    alt: "Meditative yoga session in Rishikesh",
    caption: "Meditative stillness",
    rotate: "4deg",
    fileName: "fallback-image-4",
  },
];

function mergeCourseCatalog(remoteCourses: Course[]): Course[] {
  const coursesByTitle = new Map<string, Course>();

  [...remoteCourses, ...homeCourseCatalog].forEach((course) => {
    const key = course.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!coursesByTitle.has(key)) {
      coursesByTitle.set(key, course);
    }
  });

  return Array.from(coursesByTitle.values());
}

function getCourseLevel(title: string) {
  if (title.includes("100") || title.includes("200")) {
    return "Essentials";
  }

  if (title.includes("300")) {
    return "Deepening Practice";
  }

  if (title.includes("500")) {
    return "Professional Pathway";
  }

  return "All Levels";
}

function normalizeLevelText(value: string) {
  return value;
}

function getCourseHighlights(title: string) {
  if (title.includes("100")) {
    return [
      "Core TTC structure",
      "Hatha and Ashtanga practice",
      "Pranayama, meditation and teaching fundamentals",
    ];
  }

  if (title.toLowerCase().includes("aerial")) {
    return [
      "Aerial yoga fundamentals",
      "Hammock-supported practice and safety",
      "Teaching details to be confirmed",
    ];
  }

  if (title.toLowerCase().includes("sound")) {
    return [
      "Sound healing fundamentals",
      "Meditation and vibrational practices",
      "Curriculum details to be confirmed",
    ];
  }

  if (title.includes("200")) {
    return [
      "Yoga Alliance USA certified training",
      "Develop teaching confidence and alignment",
      "Asana, pranayama, meditation and philosophy",
      "200 Hour Multi-Style Yoga Teacher Training",
    ];
  }

  if (title.includes("300")) {
    return [
      "Advanced practice and teaching techniques",
      "Deeper alignment and yogic understanding",
      "300 Hour Multi-Style Yoga Teacher Training",
    ];
  }

  if (title.includes("500")) {
    return [
      "Complete professional yoga teacher training pathway",
      "Extensive practice, teaching and traditional education",
      "500 Hour Multi-Style Yoga Teacher Training",
    ];
  }

  return [
    "Traditional Hatha and Ashtanga Vinyasa techniques",
    "Pranayama, Meditation and Yoga Philosophy",
    "Holistic practice in Rishikesh",
  ];
}

function HomePage({ onNavigate }: HomePageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const googleReviews = getGoogleReviewsSummary();

  const galleryImages = useMemo(
    () => {
      const images = getGalleryImages();
      return images.length > 0 ? images : fallbackGalleryImages;
    },
    [],
  );

  useEffect(() => {
    fetchCourses();
  }, []);

  // Auto-rotate hero gallery every 5 seconds
  useEffect(() => {
    if (galleryImages.length <= 3) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ae7dad4f/courses`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();
      if (data.success && data.courses) {
        setCourses(mergeCourseCatalog(data.courses));
      } else {
        // Use fallback data if API doesn't return expected format
        setFallbackCourses();
      }
    } catch (error) {
      console.log(
        "Using fallback courses data (backend unavailable)",
      );
      // Use fallback data on error
      setFallbackCourses();
    }
  };

  const setFallbackCourses = () => {
    setCourses(homeCourseCatalog);
  };

  const features = [
    {
      icon: <Flower className="w-8 h-8 text-primary" />,
      title: "Traditional Lineage",
      description:
        "Authentic teachings rooted in ancient yogic traditions and Shaivism philosophy",
    },
    {
      icon: <Award className="w-8 h-8 text-secondary" />,
      title: "Certified Programs",
      description:
        "Yoga Alliance certified teacher training courses recognized worldwide",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expert Teachers",
      description:
        "Learn from experienced yogis with 10+ years of dedicated practice",
    },
    {
      icon: <Heart className="w-8 h-8 text-secondary" />,
      title: "Holistic Approach",
      description:
        "Asanas, Pranayama, Meditation, Philosophy, and Ayurveda integrated",
    },
  ];

  const visibleReviews = useMemo(
    () => googleReviews.reviews.slice(0, 3),
    [googleReviews.reviews],
  );

  const formattedRating = googleReviews.rating.toFixed(1);
  const formattedReviewCount =
    googleReviews.totalReviews > 0
      ? `${googleReviews.totalReviews.toLocaleString("en-IN")} Google reviews`
      : "Google reviews sync live when connected";
  const displayCourses = courses.length > 0 ? courses : homeCourseCatalog;
  // Three arch slots, each offset so they never show the same image
  const heroImages = [0, 1, 2].map((offset) => {
    const total = galleryImages.length;
    if (total === 0) return undefined;
    return galleryImages[(heroSlide + offset) % total];
  });
  const heroDotsCount = Math.min(galleryImages.length, 9); // cap dots

  return (
    <div className="relative">
      {/* ── Hero styles (responsive) ── */}
      <style>{`
        @keyframes heroFade {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        .hero-section {
          background: #F5F3EE;
          min-height: 100svh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 108px 0 80px;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          min-width: 0;
          overflow-x: hidden;
          box-sizing: border-box;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 999px;
          padding: 7px 18px;
          font-size: 13px;
          color: #4a4a4a;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
          letter-spacing: 0.01em;
        }
        .hero-h1 {
          font-size: clamp(2rem, 8vw, 3rem);
          font-weight: 800;
          line-height: 1.08;
          color: #0d1f1c;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          max-width: 100%;
          word-break: break-word;
        }
        .hero-h1-teal { color: #1a6b5c; }
        .hero-sub {
          font-size: clamp(0.95rem, 3vw, 1.05rem);
          line-height: 1.75;
          color: #4f4f4f;
          max-width: 100%;
          margin-bottom: 28px;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .hero-ctas {
          display: flex;
          align-items: stretch;
          gap: 12px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          width: 100%;
        }
        .hero-btn-primary,
        .hero-btn-secondary {
          min-height: 48px;
          width: auto;
          flex: 1 1 auto;
          justify-content: center;
          padding: 14px 20px;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a6b5c;
          color: #fff;
          border: none;
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .hero-btn-primary:hover { background: #145449; transform: translateY(-1px); }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: #1a6b5c;
          border: 1.5px solid rgba(26,107,92,0.3);
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: 0.01em;
          transition: border-color 0.2s, background 0.2s;
        }
        .hero-btn-secondary:hover {
          border-color: #1a6b5c;
          background: rgba(26,107,92,0.05);
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-auto-rows: minmax(0, auto);
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
          min-width: 0;
        }
        .hero-stat {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 14px;
          border-right: 1px solid #f0f0f0;
          min-width: 0;
          overflow: hidden;
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #edf7f4;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #1a6b5c;
        }
        .hero-stat-val {
          font-weight: 700;
          font-size: 0.95rem;
          color: #0d1f1c;
          line-height: 1.2;
        }
        .hero-stat-lbl {
          font-size: 0.67rem;
          color: #999;
          line-height: 1.35;
          margin-top: 1px;
        }
        /* Gallery */
        .hero-gallery-wrap { position: relative; }
        .hero-arch-row {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          height: 460px;
        }
        .hero-arch {
          border-radius: 999px;
          overflow: hidden;
          border: 3px solid #fff;
          flex-shrink: 0;
          background: #c0d4ce;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
        }
        .hero-arch img, .hero-arch > div { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-arch-left  { width: 148px; height: 318px; margin-bottom: 40px; }
        .hero-arch-mid   { width: 210px; height: 430px; z-index: 1; }
        .hero-arch-right { width: 142px; height: 288px; margin-bottom: 62px; }
        .hero-sparkle {
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }
        .hero-dots {
          display: flex;
          gap: 4px;
          margin-top: 12px;
          justify-content: center;
          align-items: center;
        }
        .hero-dot {
          width: 4px;
          height: 4px;
          min-width: 4px;
          border-radius: 999px;
          border: none;
          padding: 0;
          cursor: pointer;
          background: rgba(26, 107, 92, 0.22);
          transition: width 0.25s ease, height 0.25s ease, background 0.25s ease;
        }
        .hero-dot:focus-visible {
          outline: 2px solid rgba(26, 107, 92, 0.9);
          outline-offset: 4px;
        }
        /* ── TABLET (≤ 900px) ── */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          .hero-sub {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-ctas {
            justify-content: center;
          }
          .hero-stats {
            max-width: 100%;
            margin: 0 auto;
          }
          .hero-gallery-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-arch-row {
            height: 320px;
            gap: 8px;
          }
          .hero-arch-left  { width: 100px; height: 216px; margin-bottom: 26px; }
          .hero-arch-mid   { width: 148px; height: 300px; }
          .hero-arch-right { width: 96px;  height: 198px; margin-bottom: 42px; }
        }
        /* ── MOBILE (≤ 480px) ── */
        @media (max-width: 480px) {
          .hero-section {
            padding: 70px 0 32px;
            overflow-x: hidden;
          }
          .hero-inner {
            padding: 0 18px;
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;
          }
          .hero-grid {
            gap: 24px;
            text-align: left;
            width: 100%;
          }
          .hero-h1 {
            font-size: clamp(2rem, 8vw, 3rem);
            margin-bottom: 10px;
            text-align: left;
            max-width: 100%;
            word-break: break-word;
          }
          .hero-sub {
            font-size: clamp(0.95rem, 4vw, 1.05rem);
            margin-bottom: 18px;
            max-width: 100%;
            width: 100%;
            word-break: break-word;
            white-space: normal;
          }
          .hero-ctas {
            flex-direction: column;
            gap: 12px;
            width: 100%;
            align-items: stretch;
            margin-bottom: 20px;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            min-height: 48px;
            min-width: 0;
          }
          .hero-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            border-radius: 14px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            padding: 8px;
            width: 100%;
          }
          .hero-stat {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 14px 12px;
            border: 1px solid #f4f4f4;
            border-radius: 12px;
            background: #fff;
            min-width: 0;
          }
          .hero-stat:nth-child(2n) {
            border-right: none;
          }
          .hero-stat:nth-child(3) {
            grid-column: 1 / -1;
          }
          .hero-stat:last-child { border-right: none; }
          .hero-stat-icon {
            width: 34px;
            height: 34px;
          }
          .hero-stat-val {
            font-size: 0.95rem;
          }
          .hero-stat-lbl {
            font-size: 0.72rem;
          }
          .hero-gallery-wrap { width: 100%; }
          .hero-arch-row { display: block; height: auto; }
          .hero-arch-left, .hero-arch-right { display: none; }
          .hero-arch-mid {
            width: 100%;
            height: auto;
            min-height: 180px;
            border-radius: 18px;
            margin-top: 0;
          }
          .hero-arch img, .hero-arch > div { height: auto; min-height: 180px; }
          .hero-dots { display: none; }
        }
        @media (max-width: 360px) {
          .hero-section {
            padding: 60px 0 28px;
          }
          .hero-h1 {
            font-size: clamp(1.9rem, 9vw, 2.4rem);
          }
          .hero-stats {
            grid-template-columns: 1fr;
          }
          .hero-stat:nth-child(3) {
            grid-column: auto;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            font-size: 0.96rem;
          }
        }
      `}</style>

      <MandalaWatermark />

      {/* ── Hero ── */}
      <section className="hero-section">
        {/* Diagonal gold watermark lines */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", pointerEvents: "none", zIndex: 0 }}
          preserveAspectRatio="none"
          viewBox="0 0 600 700"
        >
          <line x1="600" y1="0" x2="80" y2="700" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.22" />
          <line x1="530" y1="0" x2="10" y2="700" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.14" />
        </svg>

        <div className="hero-inner">
          <div className="hero-grid">

            {/* ══ LEFT — copy ══ */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Kicker */}
              <div className="hero-kicker">
                <Flower className="w-4 h-4" style={{ color: "#1a6b5c", flexShrink: 0 }} strokeWidth={1.5} />
                Yoga Teacher Training in Rishikesh
              </div>

              {/* Heading */}
              <h1 className="hero-h1">
                Welcome to
                <br />
                <span className="hero-h1-teal">Shivaya Yogashala</span>
              </h1>

              {/* Sub */}
              <p className="hero-sub">
                Transform your life with authentic yoga teacher training in the spiritual
                heart of Rishikesh. Learn, grow and connect with like-minded souls.
              </p>

              {/* CTA */}
              <div className="hero-ctas">
                <button className="hero-btn-primary" onClick={() => onNavigate("courses")}>
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="hero-btn-secondary" onClick={() => onNavigate("contact")}>
                  Talk to a Mentor
                </button>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                {[
                  { icon: <Users className="w-5 h-5" strokeWidth={1.5} />, value: "2000+", label: "Students Trained" },
                  { icon: <Flower className="w-5 h-5" strokeWidth={1.5} />, value: "12+", label: "Years of Excellence" },
                  { icon: <MapPin className="w-5 h-5" strokeWidth={1.5} />, value: "Rishikesh", label: "Yoga Capital of the World" },
                ].map((stat) => (
                  <div key={stat.label} className="hero-stat">
                    <div className="hero-stat-icon">{stat.icon}</div>
                    <div>
                      <div className="hero-stat-val">{stat.value}</div>
                      <div className="hero-stat-lbl">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ══ RIGHT — gallery ══ */}
            <motion.div
              className="hero-gallery-wrap"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.18, ease: "easeOut" }}
            >
              <div style={{ position: "relative" }}>
                {/* Sparkle accents */}
                <svg aria-hidden="true" className="hero-sparkle" style={{ top: "-14px", left: "16px" }} width="20" height="20" viewBox="0 0 24 24">
                  <path d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z" fill="#C9A84C" />
                </svg>
                <svg aria-hidden="true" className="hero-sparkle" style={{ top: "52px", left: "-8px", opacity: 0.7 }} width="13" height="13" viewBox="0 0 24 24">
                  <path d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z" fill="#C9A84C" />
                </svg>
                <svg aria-hidden="true" className="hero-sparkle" style={{ top: "-10px", right: "8px" }} width="15" height="15" viewBox="0 0 24 24">
                  <path d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z" fill="#1a6b5c" />
                </svg>

                {/* Arch cards */}
                <div className="hero-arch-row">
                  <div className="hero-arch hero-arch-left">
                    <ImageWithFallback
                      key={heroImages[0]?.fileName ?? "left"}
                      src={heroImages[0]?.src}
                      alt={heroImages[0]?.alt ?? "Yoga in Rishikesh"}
                      className="w-full h-full object-cover"
                      style={{ animation: "heroFade 0.7s ease" }}
                    />
                  </div>
                  <div className="hero-arch hero-arch-mid">
                    <ImageWithFallback
                      key={heroImages[1]?.fileName ?? "centre"}
                      src={heroImages[1]?.src}
                      alt={heroImages[1]?.alt ?? "Yoga practice"}
                      className="w-full h-full object-cover"
                      style={{ animation: "heroFade 0.7s ease" }}
                    />
                  </div>
                  <div className="hero-arch hero-arch-right">
                    <ImageWithFallback
                      key={heroImages[2]?.fileName ?? "right"}
                      src={heroImages[2]?.src}
                      alt={heroImages[2]?.alt ?? "Rishikesh scenery"}
                      className="w-full h-full object-cover"
                      style={{ animation: "heroFade 0.7s ease" }}
                    />
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="hero-dots">
                {Array.from({ length: heroDotsCount }).map((_, i) => {
                  const isActive = i === heroSlide % heroDotsCount;
                  return (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setHeroSlide(i)}
                      className="hero-dot"
                      style={{
                        background: isActive ? "#1a6b5c" : "rgba(26, 107, 92, 0.22)",
                        width: isActive ? "6px" : "4px",
                        height: isActive ? "6px" : "4px",
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PAGE-WIDE STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        /* ── shared tokens ── */
        .hp-cream  { background: #F5F3EE; }
        .hp-white  { background: #ffffff; }
        .hp-teal-dark { color: #0d1f1c; }
        .hp-teal   { color: #1a6b5c; }
        .hp-muted  { color: #666; }
        .hp-gold   { color: #C9A84C; }

        /* ── section wrapper ── */
        .hp-section {
          padding: 96px 0;
          position: relative;
          overflow: hidden;
        }
        .hp-section-alt { background: #ffffff; }
        .hp-section-cream { background: #F5F3EE; }
        .hp-section-teal { background: #1a6b5c; }
        .hp-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── section eyebrow + heading ── */
        .hp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(26,107,92,0.08);
          border: 1px solid rgba(26,107,92,0.15);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #1a6b5c;
          margin-bottom: 20px;
        }
        .hp-heading {
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #0d1f1c;
          margin-bottom: 16px;
        }
        .hp-heading-teal { color: #1a6b5c; }
        .hp-lead {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #666;
          max-width: 560px;
        }
        .hp-lead-center { margin: 0 auto; text-align: center; }
        .hp-divider {
          width: 48px;
          height: 3px;
          background: #C9A84C;
          border-radius: 2px;
          margin: 20px 0;
        }
        .hp-divider-center { margin: 20px auto; }

        /* ── pill button (matches hero) ── */
        .hp-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          padding: 13px 28px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.15s, opacity 0.2s;
          white-space: nowrap;
        }
        .hp-btn:hover { transform: translateY(-1px); }
        .hp-btn-teal { background: #1a6b5c; color: #fff; }
        .hp-btn-teal:hover { background: #145449; }
        .hp-btn-outline {
          background: transparent;
          color: #1a6b5c;
          border: 1.5px solid #1a6b5c;
        }
        .hp-btn-outline:hover { background: rgba(26,107,92,0.06); }
        .hp-btn-white { background: #fff; color: #1a6b5c; }
        .hp-btn-white:hover { background: #f0faf7; }

        /* ── Why Choose cards ── */
        .hp-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 56px;
        }
        .hp-feature-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px 24px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .hp-feature-card:hover {
          box-shadow: 0 12px 40px rgba(26,107,92,0.1);
          transform: translateY(-4px);
        }
        .hp-feature-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: #edf7f4;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: #1a6b5c;
        }
        .hp-feature-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0d1f1c;
          margin-bottom: 8px;
        }
        .hp-feature-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: #777;
        }

        /* ── Certification badges ── */
        .hp-cert-grid {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
          margin-top: 48px;
        }
        .hp-cert-btn {
          background: #fff;
          border: 1.5px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 20px 28px;
          cursor: pointer;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .hp-cert-btn:hover, .hp-cert-btn[aria-expanded="true"] {
          border-color: #1a6b5c;
          box-shadow: 0 6px 24px rgba(26,107,92,0.12);
        }
        .hp-cert-btn img { height: 72px; width: auto; display: block; }
        .hp-accord-item {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 14px;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .hp-accord-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        .hp-accord-toggle {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          color: #0d1f1c;
          text-align: left;
          gap: 16px;
        }
        .hp-accord-toggle span:last-child {
          font-size: 1.4rem;
          color: #1a6b5c;
          flex-shrink: 0;
          line-height: 1;
        }
        .hp-accord-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.3s ease;
          padding: 0 24px;
        }
        .hp-accord-body.open {
          max-height: 200px;
          padding: 0 24px 20px;
        }
        .hp-accord-body p {
          font-size: 0.925rem;
          line-height: 1.7;
          color: #666;
        }

        /* ── Course cards ── */
        .hp-course-card {
          display: grid;
          grid-template-columns: 280px 1fr;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.07);
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .hp-course-card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }
        .hp-course-img {
          position: relative;
          overflow: hidden;
        }
        .hp-course-img img, .hp-course-img > div:first-child {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .hp-course-card:hover .hp-course-img img { transform: scale(1.06); }
        .hp-course-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(26,107,92,0.25) 0%, transparent 60%);
        }
        .hp-course-img-om {
          position: absolute;
          bottom: 16px;
          left: 16px;
          font-size: 4rem;
          color: rgba(255,255,255,0.25);
          line-height: 1;
          pointer-events: none;
          font-family: serif;
        }
        .hp-course-body {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .hp-course-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .hp-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #edf7f4;
          color: #1a6b5c;
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .hp-pill-gold {
          background: rgba(201,168,76,0.12);
          color: #8a6a00;
        }
        .hp-course-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0d1f1c;
          line-height: 1.3;
        }
        .hp-course-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: #777;
        }
        .hp-check-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .hp-check-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.85rem;
          color: #555;
          line-height: 1.5;
        }
        .hp-check-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #edf7f4;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          color: #1a6b5c;
        }
        .hp-course-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        /* ── Sacred / yoga paths ── */
        .hp-sacred-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .hp-sacred-img {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        .hp-sacred-img img { width: 100%; display: block; object-fit: cover; }
        .hp-shloka {
          background: rgba(26,107,92,0.06);
          border-left: 3px solid #1a6b5c;
          border-radius: 0 10px 10px 0;
          padding: 16px 20px;
          margin: 4px 0;
        }
        .hp-shloka p:first-child { color: #1a6b5c; font-style: italic; font-size: 1.05rem; }
        .hp-shloka p:last-child  { color: #888; font-size: 0.75rem; margin-top: 4px; }
        .hp-path-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.06);
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .hp-path-item:hover {
          border-color: rgba(26,107,92,0.25);
          box-shadow: 0 4px 16px rgba(26,107,92,0.07);
        }
        .hp-path-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #1a6b5c;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
        }
        .hp-path-title { font-weight: 700; font-size: 0.95rem; color: #0d1f1c; margin-bottom: 3px; }
        .hp-path-desc  { font-size: 0.8rem; color: #777; line-height: 1.5; }

        /* ── Reviews ── */
        .hp-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .hp-review-card {
          background: #fff;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: box-shadow 0.25s;
        }
        .hp-review-card:hover { box-shadow: 0 10px 32px rgba(0,0,0,0.08); }
        .hp-review-text {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #555;
          font-style: italic;
          flex: 1;
        }
        .hp-review-author { font-weight: 700; font-size: 0.9rem; color: #0d1f1c; }
        .hp-review-country { font-size: 0.78rem; color: #999; }
        .hp-google-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 0.8rem;
          color: #555;
          margin-bottom: 16px;
        }

        /* ── Final CTA ── */
        .hp-cta-section {
          background: #1a6b5c;
          position: relative;
          overflow: hidden;
        }
        .hp-cta-shloka {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 14px;
          padding: 16px 24px;
          max-width: 480px;
          margin: 24px auto 36px;
          backdrop-filter: blur(8px);
        }
        .hp-cta-shloka p:first-child { color: #fff; font-style: italic; font-size: 1.1rem; }
        .hp-cta-shloka p:last-child  { color: rgba(255,255,255,0.65); font-size: 0.8rem; margin-top: 4px; }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .hp-features-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-reviews-grid  { grid-template-columns: repeat(2, 1fr); }
          .hp-sacred-grid   { grid-template-columns: 1fr; gap: 36px; }
          .hp-course-card   { grid-template-columns: 1fr; }
          .hp-course-img    { height: 220px; }
        }
        @media (max-width: 600px) {
          .hp-section { padding: 64px 0; }
          .hp-inner   { padding: 0 16px; }
          .hp-features-grid { grid-template-columns: 1fr; gap: 14px; }
          .hp-reviews-grid  { grid-template-columns: 1fr; }
          .hp-cert-grid     { gap: 16px; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className="hp-section hp-section-cream">
        <div className="hp-inner">
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="hp-eyebrow" style={{ margin: "0 auto 20px" }}>
              <Flower className="w-3.5 h-3.5" strokeWidth={1.5} />
              Yoga Alliance Certified School
            </div>
            <h2 className="hp-heading" style={{ textAlign: "center" }}>
              Why Choose <span className="hp-heading-teal">Shivaya Yogashala</span>
            </h2>
            <div className="hp-divider hp-divider-center" />
            <p className="hp-lead hp-lead-center">
              Authentic yoga education from the birthplace of yoga — where ancient tradition meets modern teaching excellence.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="hp-features-grid">
            {[
              {
                icon: <Flower className="w-6 h-6" strokeWidth={1.5} />,
                title: "Traditional Lineage",
                desc: "Authentic teachings rooted in ancient yogic traditions and Shaivism philosophy passed down through generations.",
              },
              {
                icon: <Award className="w-6 h-6" strokeWidth={1.5} />,
                title: "Certified Programs",
                desc: "Yoga Alliance USA certified teacher training courses recognised and respected worldwide.",
              },
              {
                icon: <Users className="w-6 h-6" strokeWidth={1.5} />,
                title: "Expert Teachers",
                desc: "Learn from experienced yogis with 10+ years of dedicated practice and teaching wisdom.",
              },
              {
                icon: <Heart className="w-6 h-6" strokeWidth={1.5} />,
                title: "Holistic Approach",
                desc: "Asanas, Pranayama, Meditation, Philosophy, and Ayurveda fully integrated into every programme.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="hp-feature-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="hp-feature-icon">{f.icon}</div>
                <div className="hp-feature-title">{f.title}</div>
                <div className="hp-feature-desc">{f.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Certification logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p style={{ textAlign: "center", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginTop: "64px", marginBottom: "0" }}>
              Internationally Recognised Certifications
            </p>
            <div className="hp-cert-grid">
              {[
                { id: "200", label: "RYS 200", image: rys200Badge },
                { id: "300", label: "RYS 300", image: rys300Badge },
                { id: "500", label: "RYS 500", image: rys500Badge },
              ].map((cert) => (
                <button
                  key={cert.id}
                  type="button"
                  className="hp-cert-btn"
                  onClick={() => setOpenAccordion(openAccordion === cert.id ? null : cert.id)}
                  aria-expanded={openAccordion === cert.id}
                >
                  <img src={cert.image} alt={`${cert.label} logo`} />
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
              {[
                { id: "200", title: "200 Hour Multi-Style Yoga Teacher Training", desc: "Comprehensive internationally recognised yoga teacher training covering asana, pranayama, meditation, philosophy and teaching methodology." },
                { id: "300", title: "300 Hour Multi-Style Yoga Teacher Training", desc: "Advanced teacher training focused on deeper practice, alignment, teaching techniques and yogic understanding." },
                { id: "500", title: "500 Hour Multi-Style Yoga Teacher Training", desc: "Complete professional yoga teacher training pathway combining extensive practice, teaching and traditional yogic education." },
              ].map((item) => (
                <div key={item.id} className="hp-accord-item">
                  <button
                    type="button"
                    className="hp-accord-toggle"
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    aria-expanded={openAccordion === item.id}
                  >
                    <span>{item.title}</span>
                    <span>{openAccordion === item.id ? "−" : "+"}</span>
                  </button>
                  <div className={`hp-accord-body${openAccordion === item.id ? " open" : ""}`}>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COURSES
      ══════════════════════════════════════════ */}
      <section className="hp-section hp-section-alt">
        <div className="hp-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <div className="hp-eyebrow" style={{ margin: "0 auto 20px" }}>
              <Award className="w-3.5 h-3.5" strokeWidth={1.5} />
              Our Programmes
            </div>
            <h2 className="hp-heading" style={{ textAlign: "center" }}>
              Choose the Training That <span className="hp-heading-teal">Matches Your Journey</span>
            </h2>
            <div className="hp-divider hp-divider-center" />
            <p className="hp-lead hp-lead-center">
              Transform your practice with our internationally certified yoga teacher training programmes.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "960px", margin: "0 auto" }}>
            {displayCourses.map((course, index) => {
              const detail = getCourseDetailByTitle(course.title);
              return (
                <motion.div
                  key={course.id}
                  className="hp-course-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="hp-course-img">
                    <ImageWithFallback
                      src={course.image || img2}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="hp-course-img-overlay" />
                    <div className="hp-course-img-om">ॐ</div>
                  </div>
                  <div className="hp-course-body">
                    <div className="hp-course-meta">
                      <span className="hp-pill">
                        <Clock className="w-3 h-3" strokeWidth={2} />
                        {course.duration}
                      </span>
                      <span className="hp-pill hp-pill-gold">
                        <Award className="w-3 h-3" strokeWidth={2} />
                        {getCourseLevel(course.title)}
                      </span>
                    </div>
                    <div className="hp-course-title">{course.title}</div>
                    <div className="hp-course-desc">{course.description}</div>
                    <ul className="hp-check-list">
                      {getCourseHighlights(course.title).slice(0, 3).map((h) => (
                        <li key={h}>
                          <span className="hp-check-icon">
                            <CheckCircle className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="hp-course-actions">
                      <button className="hp-btn hp-btn-teal" onClick={() => onNavigate(detail?.id ?? "courses")}>
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="hp-btn hp-btn-outline" onClick={() => onNavigate("apply-now")}>
                        Talk to Mentor
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Sanskrit shloka */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ textAlign: "center", marginTop: "64px", paddingTop: "48px", borderTop: "1px solid rgba(0,0,0,0.07)" }}
          >
            <p style={{ color: "#1a6b5c", fontStyle: "italic", fontSize: "1.1rem" }}>असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।</p>
            <p style={{ color: "#999", fontSize: "0.8rem", marginTop: "6px" }}>Asato Mā Sad-Gamaya, Tamaso Mā Jyotir-Gamaya</p>
            <p style={{ color: "#bbb", fontSize: "0.75rem", marginTop: "2px" }}>Lead me from ignorance to truth, from darkness to light</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SACRED YOGA PRACTICE
      ══════════════════════════════════════════ */}
      <section className="hp-section hp-section-cream">
        <div className="hp-inner">
          <div className="hp-sacred-grid">
            <motion.div
              className="hp-sacred-img"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ImageWithFallback src={sacredImg} alt="Sacred yoga practice" className="w-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div>
                <div className="hp-eyebrow">
                  <Flame className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Our Philosophy
                </div>
                <h2 className="hp-heading">
                  Sacred <span className="hp-heading-teal">Yoga Practice</span>
                </h2>
                <div className="hp-divider" />
                <p className="hp-lead">
                  Our yogashala is built on the foundation of traditional Indian yoga, honouring the lineage of Lord Shiva — the Adi Yogi, the first yogi.
                </p>
              </div>

              <div className="hp-shloka">
                <p>तद्योगानुशासनम्</p>
                <p>Tat Yogānuśāsanam — Now begins the teaching of Yoga</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: "4px" }}>Classical Paths of Yoga</p>
                {[
                  { icon: <Flame className="w-4 h-4" strokeWidth={2} />, title: "Hatha Yoga", desc: "The path of physical purification and balance." },
                  { icon: <HandMetal className="w-4 h-4" strokeWidth={2} />, title: "Karma Yoga", desc: "The path of action and selfless service." },
                  { icon: <Heart className="w-4 h-4" strokeWidth={2} />, title: "Bhakti Yoga", desc: "The path of devotion and love." },
                  { icon: <Sparkles className="w-4 h-4" strokeWidth={2} />, title: "Jnana Yoga", desc: "The path of knowledge, wisdom and intellect." },
                  { icon: <Flower2 className="w-4 h-4" strokeWidth={2} />, title: "Raja Yoga", desc: "The path of meditation and mental control." },
                ].map((path) => (
                  <div key={path.title} className="hp-path-item">
                    <div className="hp-path-icon">{path.icon}</div>
                    <div>
                      <div className="hp-path-title">{path.title}</div>
                      <div className="hp-path-desc">{path.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <button className="hp-btn hp-btn-teal" onClick={() => onNavigate("about")}>
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="hp-section hp-section-alt" aria-labelledby="student-reviews-heading">
        <div className="hp-inner">
          <motion.div
            style={{ textAlign: "center" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="hp-eyebrow" style={{ margin: "0 auto 20px" }}>
              <Star className="w-3.5 h-3.5" strokeWidth={1.5} />
              Student Reviews
            </div>
            <h2 className="hp-heading" id="student-reviews-heading" style={{ textAlign: "center" }}>
              What Our <span className="hp-heading-teal">Students Say</span>
            </h2>
            <div className="hp-divider hp-divider-center" />

            {/* Google rating summary */}
            <div style={{ marginTop: "8px" }}>
              <div className="hp-google-badge" style={{ margin: "0 auto 16px" }}>
                <GoogleReviewsMark />
                <span>Rated on Google</span>
              </div>
              <RatingStars rating={googleReviews.rating} size="large" />
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0d1f1c", marginTop: "12px", lineHeight: 1 }}>{formattedRating}<span style={{ fontSize: "1rem", fontWeight: 500, color: "#999" }}>/5</span></p>
              <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "4px" }}>{formattedReviewCount}</p>
            </div>
          </motion.div>

          <div className="hp-reviews-grid">
            {visibleReviews.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="hp-review-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <RatingStars rating={testimonial.rating} />
                <p className="hp-review-text">"{testimonial.text}"</p>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "14px" }}>
                  <div className="hp-review-author">{testimonial.name}</div>
                  <div className="hp-review-country">{testimonial.country}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button className="hp-btn hp-btn-teal" onClick={() => onNavigate("contact")}>
              Talk to a Yoga Mentor
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="hp-section hp-cta-section">
        {/* subtle dot pattern */}
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}>
          <pattern id="hp-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hp-dots)" />
        </svg>
        <MandalaWatermark />

        <div className="hp-inner" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="hp-eyebrow" style={{ margin: "0 auto 24px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>
              <Flower className="w-3.5 h-3.5" strokeWidth={1.5} />
              Begin Your Journey
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "16px" }}>
              Begin Your Yoga Journey Today
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75 }}>
              Join thousands of students who have transformed their lives through our authentic yoga teacher training in Rishikesh.
            </p>

            <div className="hp-cta-shloka">
              <p>योगः कर्मसु कौशलम्</p>
              <p>Yogaḥ Karmasu Kauśalam — Yoga is skill in action</p>
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="hp-btn hp-btn-white" onClick={() => onNavigate("contact")}>
                Talk to Yoga Mentor
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="hp-btn"
                style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)" }}
                onClick={() => onNavigate("courses")}
              >
                View All Courses
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function RatingStars({
  rating,
  size = "card",
}: {
  rating: number;
  size?: "card" | "large";
}) {
  const starClass =
    size === "large"
      ? "google-review-star google-review-star-large"
      : "google-review-star";

  return (
    <div
      className="google-review-stars"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const fillPercent = Math.max(
          0,
          Math.min(100, (rating - index) * 100),
        );

        return (
          <span
            key={index}
            className={`${starClass} relative inline-flex shrink-0`}
          >
            <Star
              className={`${starClass} text-secondary/30`}
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star
                className={`${starClass} text-secondary fill-secondary drop-shadow-lg`}
                aria-hidden="true"
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function GoogleReviewsMark() {
  return (
    <span className="inline-flex items-center">
      <span className="google-reviews-mark">
        <span className="google-reviews-mark-letter">G</span>
      </span>
    </span>
  );
}

export default HomePage;
