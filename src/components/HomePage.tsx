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

const heroStats = [
  { value: "100-500", label: "Hour TTC paths" },
  { value: "RYT", label: "Yoga Alliance training" },
  { value: "Tapovan", label: "Rishikesh, India" },
];

function mergeCourseCatalog(remoteCourses: Course[]) {
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
  const [heroGalleryIndex, setHeroGalleryIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
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

  useEffect(() => {
    if (galleryImages.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setHeroGalleryIndex((current) =>
        (current + 1) % galleryImages.length,
      );
    }, 5000);

    return () => window.clearInterval(timer);
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

  return (
    <div className="relative">
      <MandalaWatermark />

      {/* Modern Spiritual Hero */}
      <section className="spiritual-hero">
        <div className="spiritual-hero-pattern" />
        <div className="container mx-auto px-4">
          <div className="spiritual-hero-grid">
            <motion.div
              className="spiritual-hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="spiritual-hero-kicker">
                <Sparkles className="w-4 h-4" />
                Yoga Teacher Training in Rishikesh
              </div>
              <h1>
                Begin a Sacred Yoga Journey at Shivaya
                Yogashala
              </h1>
              <p>
                Study traditional Hatha, Ashtanga, pranayama,
                meditation and yogic philosophy in the quiet
                spiritual energy of Upper Tapovan.
              </p>

              <div className="spiritual-hero-actions">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => onNavigate("courses")}
                >
                  Explore Courses
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                  onClick={() => onNavigate("contact")}
                >
                  Talk to Yoga Mentor
                </Button>
              </div>

              <div className="spiritual-hero-stats">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="spiritual-hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="spiritual-hero-orbit" />
              <div className="spiritual-hero-logo-card">
                <img src={shivaLogo} alt="Shivaya Yogashala" />
                <span>Shivaya Yogashala</span>
              </div>

              {/* Auto-rotating hero gallery - 2 images at a time with fade */}
              <div
                className="spiritual-hero-photo spiritual-hero-photo-main"
                style={{ ['--rotate' as any]: galleryImages[heroGalleryIndex].rotate, ['--tx' as any]: '0px', ['--ty' as any]:'0px', zIndex: 3 }}
              >
                <motion.div
                  key={heroGalleryIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full"
                >
                  <ImageWithFallback
                    src={galleryImages[heroGalleryIndex].src}
                    alt={galleryImages[heroGalleryIndex].alt}
                    className="w-full h-auto object-contain block"
                  />
                </motion.div>
              </div>

              <div
                className="spiritual-hero-photo spiritual-hero-photo-small"
                style={{ ['--rotate' as any]: galleryImages[(heroGalleryIndex + 1) % galleryImages.length].rotate, ['--tx' as any]: '-18px', ['--ty' as any]:'-6px', zIndex: 2 }}
              >
                <motion.div
                  key={`small-${heroGalleryIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full"
                >
                  <ImageWithFallback
                    src={galleryImages[(heroGalleryIndex + 1) % galleryImages.length].src}
                    alt={galleryImages[(heroGalleryIndex + 1) % galleryImages.length].alt}
                    className="w-full h-auto object-contain block"
                  />
                </motion.div>
              </div>

              <div className="spiritual-hero-note">
                Breathe. Align. Awaken.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome Message & Certification Section */}

      {/* Why Choose Section */}
      <section className="home-principles-section py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-secondary mb-4">
              Yoga Alliance Certified School
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Why Choose Shivaya Yogashala
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-muted-foreground">
              Authentic Yoga Education from the Birthplace of Yoga
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl font-semibold text-primary mb-3">
              Yoga Alliance USA Certified School
            </p>
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              Internationally Recognized Teacher Training Programs
            </p>
          </motion.div>

          <div className="certification-logos-grid mb-12">
            {[
              { id: "200", label: "RYS 200", image: rys200Badge },
              { id: "300", label: "RYS 300", image: rys300Badge },
              { id: "500", label: "RYS 500", image: rys500Badge },
            ].map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => setOpenAccordion(openAccordion === cert.id ? null : cert.id)}
                aria-expanded={openAccordion === cert.id}
                className="certification-logo-button"
              >
                <img
                  src={cert.image}
                  alt={`${cert.label} logo`}
                  className="certification-logo-image"
                />
              </button>
            ))}
          </div>

          <div className="certification-accordion space-y-6">
            {[
              {
                id: "200",
                title: "200 Hour Multi-Style Yoga Teacher Training",
                description:
                  "Comprehensive internationally recognized yoga teacher training covering asana, pranayama, meditation, philosophy and teaching methodology.",
              },
              {
                id: "300",
                title: "300 Hour Multi-Style Yoga Teacher Training",
                description:
                  "Advanced teacher training focused on deeper practice, alignment, teaching techniques and yogic understanding.",
              },
              {
                id: "500",
                title: "500 Hour Multi-Style Yoga Teacher Training",
                description:
                  "Complete professional yoga teacher training pathway combining extensive practice, teaching and traditional yogic education.",
              },
            ].map((item) => (
              <div key={item.id} className="certification-accordion-item">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  className="certification-accordion-toggle"
                  aria-expanded={openAccordion === item.id}
                >
                  <span>{item.title}</span>
                  <span>{openAccordion === item.id ? "–" : "+"}</span>
                </button>
                <div
                  className={`certification-panel ${openAccordion === item.id ? "is-open" : ""}`}
                  aria-hidden={openAccordion !== item.id}
                >
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Detailed Course Listings Section */}
      <section className="home-course-section py-20 relative overflow-hidden">
        <MandalaWatermark />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary mb-4">
                Choose the Training That Matches Your Journey
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-4" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform your practice with our internationally
                certified yoga teacher training programs
              </p>
            </motion.div>
          </div>

          {/* Detailed Course List */}
          <div className="max-w-6xl mx-auto space-y-8 mb-12">
            {displayCourses.length > 0 ? (
              displayCourses.map((course, index) => {
                const detail = getCourseDetailByTitle(course.title);

                return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl overflow-hidden group">
                    <div className="grid md:grid-cols-[280px_1fr] gap-0">
                      {/* Course Image */}
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <ImageWithFallback
  src={course.image || img2}
  alt={course.title}
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  decoding="async"
/>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                        {/* Om Symbol Watermark */}
                        <div className="absolute bottom-4 left-4 text-white/30 pointer-events-none">
                          <span
                            className="text-7xl font-serif"
                            style={{
                              textShadow:
                                "0 2px 12px rgba(0,0,0,0.5)",
                            }}
                          >
                            ॐ
                          </span>
                        </div>
                      </div>

                      {/* Course Details */}
                      <CardContent className="p-6 md:p-8 space-y-4 bg-white">
                        {/* Title */}
                        <div className="space-y-3">
                          <h3 className="text-primary group-hover:text-secondary transition-colors leading-tight">
                            {course.title}
                          </h3>

                          {/* Duration & Level */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <strong className="text-foreground">
                                Duration:
                              </strong>{" "}
                              {normalizeLevelText(course.duration)}
                            </span>
                            <span>|</span>
                            <span className="flex items-center gap-1">
                              <strong className="text-foreground">
                                Level:
                              </strong>
                              {` ${getCourseLevel(course.title)}`}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {course.description}
                        </p>

                        {/* Course Highlights with Checkmarks */}
                        <div className="space-y-2 pt-2">
                          {getCourseHighlights(course.title).map(
                            (highlight) => (
                              <div
                                key={highlight}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </div>
                            ),
                          )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          <Button
                            className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white shadow-md rounded-full px-6"
                            onClick={() =>
                              onNavigate(detail?.id ?? "courses")
                            }
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/5 rounded-full px-6"
                            onClick={() =>
                              onNavigate("apply-now")
                            }
                          >
                            Talk to Yoga Mentor
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
              })
            ) : (
              // Default course cards if no courses loaded
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                {/* Palm Leaf Manuscript Style Tiles - Fallback Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
                  {/* Sample Course Tile 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    {/* Palm Leaf Manuscript Card */}
                    <div className="relative cursor-pointer">
                      {/* Main Scroll Container */}
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 hover:border-primary/40 bg-white transition-all hover:shadow-primary/10">
                        {/* Decorative Corner Patterns */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />

                        {/* Lotus Badge */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white bg-gradient-to-br from-primary to-secondary">
                            <span className="text-white text-xl">
                              🪷
                            </span>
                          </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative h-48 md:h-56 overflow-hidden">
                          <ImageWithFallback
  src={img1}
  alt="200-Hour Yoga Teacher Training"
  className="w-full h-full object-cover"
/>

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />

                          {/* Accreditation Badge */}
                          <Badge className="absolute top-4 right-4 bg-secondary shadow-lg text-xs">
                            Yoga Alliance USA
                          </Badge>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 space-y-4">
                          {/* Title with Decorative Lines */}
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-0.5 bg-primary/50" />
                            <h3 className="flex-1 text-center text-primary">
                              200-Hour Multi-Style YTT
                            </h3>
                            <div className="w-8 h-0.5 bg-primary/50" />
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Comprehensive foundation course
                            covering Hatha, Ashtanga, and
                            traditional yoga philosophy
                          </p>

                          {/* Duration Info */}
                          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-primary/5">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary">
                              25 Days
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <Button
                              className="flex-1 bg-primary hover:bg-primary/90"
                              onClick={() =>
                                onNavigate("courses")
                              }
                            >
                              <span className="flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Enroll Now
                              </span>
                            </Button>

                            <Button
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary/5"
                              onClick={() =>
                                onNavigate("courses")
                              }
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Sample Course Tile 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    {/* Palm Leaf Manuscript Card */}
                    <div className="relative cursor-pointer">
                      {/* Main Scroll Container */}
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 hover:border-primary/40 bg-white transition-all hover:shadow-primary/10">
                        {/* Decorative Corner Patterns */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />

                        {/* Lotus Badge */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white bg-gradient-to-br from-primary to-secondary">
                            <span className="text-white text-xl">
                              🪷
                            </span>
                          </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative h-48 md:h-56 overflow-hidden">
                          <ImageWithFallback
  src={img2}
  alt="300-Hour Advanced Yoga Training"
  className="w-full h-full object-cover"
/>

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />

                          {/* Accreditation Badge */}
                          <Badge className="absolute top-4 right-4 bg-secondary shadow-lg text-xs">
                            Yoga Alliance USA
                          </Badge>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 space-y-4">
                          {/* Title with Decorative Lines */}
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-0.5 bg-primary/50" />
                            <h3 className="flex-1 text-center text-primary">
                              300-Hour Advanced YTT
                            </h3>
                            <div className="w-8 h-0.5 bg-primary/50" />
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Advanced training for experienced
                            practitioners seeking deeper mastery
                          </p>

                          {/* Duration Info */}
                          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-primary/5">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary">
                              28 Days
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <Button
                              className="flex-1 bg-primary hover:bg-primary/90"
                              onClick={() =>
                                onNavigate("courses")
                              }
                            >
                              <span className="flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Enroll Now
                              </span>
                            </Button>

                            <Button
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary/5"
                              onClick={() =>
                                onNavigate("courses")
                              }
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* View All Courses Button */}
                <div className="mt-12">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shadow-lg"
                    onClick={() => onNavigate("courses")}
                  >
                    <span className="flex items-center gap-2">
                      View All Courses
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* View All Courses CTA */}
          {displayCourses.length > 0 && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-lg p-8 border-2 border-primary/20">
                <h3 className="text-primary mb-4">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Enroll in any of our yoga teacher training
                  courses or choose Talk to Yoga Mentor for
                  personalized guidance
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => onNavigate("courses")}
                  >
                    Explore Course Details
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                    onClick={() => onNavigate("contact")}
                  >
                    Talk to Yoga Mentor
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sanskrit Shloka */}
          <div className="text-center mt-12 pt-8 border-t border-primary/20">
            <p className="text-secondary italic text-lg">
              असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Asato Mā Sad-Gamaya, Tamaso Mā Jyotir-Gamaya
            </p>
            <p className="text-xs text-muted-foreground">
              Lead me from ignorance to truth, from darkness to
              light
            </p>
          </div>
        </div>
      </section>

      {/* Sacred Elements Section */}
      <section className="home-sacred-section py-20 relative overflow-hidden">
        <MandalaWatermark />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src={sacredImg}
                alt="Yoga Practice"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-primary">
                Sacred Yoga Practice
              </h2>
              <p className="text-lg">
                Our yogashala is built on the foundation of
                traditional Indian yoga, honoring the lineage of
                Lord Shiva - the Adi Yogi (first yogi).
              </p>

              {/* Sanskrit Shloka 2 */}
              <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                <p className="text-primary italic">
                  तद्योगानुशासनम्
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tat Yogānuśāsanam - Now begins the teaching of
                  Yoga
                </p>
              </div>

              <div>
                <h3 className="text-charcoal mb-4">
                  Classical Paths of Yoga
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {/* Hatha Yoga */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Flame
                        className="w-5 h-5 text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-primary mb-1">
                        Hatha Yoga
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The path of physical purification and
                        balance.
                      </p>
                    </div>
                  </div>

                  {/* Karma Yoga */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-secondary/5 to-transparent rounded-lg border border-secondary/10 hover:border-secondary/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <HandMetal
                        className="w-5 h-5 text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-secondary mb-1">
                        Karma Yoga
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The path of action and selfless service.
                      </p>
                    </div>
                  </div>

                  {/* Bhakti Yoga */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Heart
                        className="w-5 h-5 text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-primary mb-1">
                        Bhakti Yoga
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The path of devotion and love.
                      </p>
                    </div>
                  </div>

                  {/* Jnana Yoga */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-secondary/5 to-transparent rounded-lg border border-secondary/10 hover:border-secondary/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Sparkles
                        className="w-5 h-5 text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-secondary mb-1">
                        Jnana Yoga
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The path of knowledge, wisdom, and
                        intellect.
                      </p>
                    </div>
                  </div>

                  {/* Raja Yoga */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Flower2
                        className="w-5 h-5 text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-primary mb-1">
                        Raja Yoga
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The path of meditation and mental
                        control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="bg-secondary hover:bg-secondary/90"
                onClick={() => onNavigate("about")}
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="home-reviews-section py-20"
        aria-labelledby="student-reviews-heading"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              id="student-reviews-heading"
              className="text-primary mb-4"
            >
              What Our Students Say
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto" />
          </div>

          <motion.div
            className="max-w-3xl mx-auto mb-12 text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="google-reviews-summary">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <GoogleReviewsMark />
                <span>Rated on Google</span>
              </div>
              <div className="flex justify-center mb-4">
                <RatingStars
                  rating={googleReviews.rating}
                  size="large"
                />
              </div>
              <div className="google-rating-row">
                <p className="google-rating-value">
                  {formattedRating}/5
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {formattedReviewCount}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Trusted by students beginning their yoga journey
              </p>
            </div>
          </motion.div>

          <div className="google-reviews-scroll scrollbar-hide">
            {visibleReviews.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="google-review-card-shell"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <Card className="h-full border-2 border-secondary/20">
                  <CardContent className="p-6 space-y-4">
                    <RatingStars rating={testimonial.rating} />
                    <p className="italic">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.country}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => onNavigate("contact")}
            >
              Talk to Yoga Mentor
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-final-cta py-20 text-white relative overflow-hidden">
        <MandalaWatermark />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-6">
            Begin Your Yoga Journey Today
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 opacity-95">
            Join thousands of students who have transformed
            their lives through our authentic yoga teacher
            training programs. Limited seats available for
            upcoming batches at our Rishikesh ashram!
          </p>

          {/* Sanskrit Shloka 3 */}
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg max-w-2xl mx-auto mb-8">
            <p className="text-white italic text-lg">
              योगः कर्मसु कौशलम्
            </p>
            <p className="text-sm text-white/80 mt-1">
              Yogaḥ Karmasu Kauśalam - Yoga is skill in action
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => onNavigate("contact")}
            >
              Talk to Yoga Mentor
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => onNavigate("courses")}
            >
              View All Courses
            </Button>
          </div>
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
