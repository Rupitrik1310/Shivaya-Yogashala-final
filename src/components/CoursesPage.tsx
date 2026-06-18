import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Globe,
  Sparkles,
  Star,
  User,
} from "lucide-react";

import { MandalaWatermark } from "./MandalaWatermark";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CourseDetailPage } from "./CourseDetailPage";
import {
  getCourseDetailById,
  getCourseDetailByTitle,
} from "../data/courseDetails";
import { projectId, publicAnonKey } from "../utils/supabase/info";

import shivaLogo from "../assets/shivaya-yoga-logo.webp";
import img1 from "../assets/image1.webp";
import img2 from "../assets/image2.webp";
import img3 from "../assets/image3.webp";
import img4 from "../assets/image4.webp";
import img7 from "../assets/image7.webp";
import img8 from "../assets/image8.webp";

interface Course {
  id: string;
  title: string;
  description: string;
  syllabus: string;
  batches: { startDate: string; endDate: string }[];
  price: number;
  deposit: number;
  accreditation: string;
  teacherId: string;
  duration: string;
  image: string;
}

interface CoursesPageProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const defaultCourses: Course[] = [
  {
    id: "yoga-retreat",
    title: "Yoga Retreat in Rishikesh, India",
    description:
      "A journey to relax, recharge and discover yourself through yoga, meditation and nature's serenity. Join our soulful retreat and experience true harmony within.",
    syllabus:
      "Daily yoga sessions, guided meditation, nature walks, spiritual talks, pranayama practices, and holistic wellness activities in the heart of Rishikesh.",
    duration: "3 to 5 Days",
    accreditation: "Retreat Program",
    batches: [],
    price: 0,
    deposit: 0,
    teacherId: "",
    image: img7,
  },
  {
    id: "100-hour-yoga-ttc",
    title: "100 Hour Yoga TTC",
    description:
      "An introductory teacher training option for students who want a focused start before committing to a longer TTC.",
    syllabus:
      "Course details, daily schedule, and final curriculum will be updated after client confirmation.",
    duration: "Details Coming Soon / Introductory Level",
    accreditation: "TTC Program",
    batches: [],
    price: 0,
    deposit: 0,
    teacherId: "",
    image: img4,
  },
  {
    id: "200-hour-yoga-ttc",
    title: "200 Hour Multi-style Yoga Teacher Training",
    description:
      "Experience the essence of Yoga through our 200 hour teacher training. Traditional practice of Hatha, Ashtanga, philosophy and self-growth designed to help you live and share yoga authentically.",
    syllabus:
      "Asana practice (Hatha and Ashtanga), Teaching methodology, Anatomy and Physiology, Yoga philosophy, Pranayama and meditation, Alignment principles, and practical teaching experience.",
    duration: "25 Days / Introductory Level",
    accreditation: "Yoga Alliance RYT 200",
    batches: [],
    price: 29999,
    deposit: 0,
    teacherId: "",
    image: img1,
  },
  {
    id: "300-hour-yoga-ttc",
    title: "300 Hour Multi-style Yoga Teacher Training",
    description:
      "Step into the next stage with our 300 Hour intermediate TTC. Advanced training expanding your knowledge of asanas, alignment and philosophy while refining teaching skills.",
    syllabus:
      "Advanced asana techniques, Sequencing and class planning, Adjustments and assists, Advanced philosophy, Pranayama mastery, Energy anatomy, and mentored teaching practice.",
    duration: "28 Days / Intermediate Level",
    accreditation: "Yoga Alliance RYT 300",
    batches: [],
    price: 34999,
    deposit: 0,
    teacherId: "",
    image: img8,
  },
  {
    id: "500-hour-yoga-ttc",
    title: "500 Hour Multi-style Yoga Teacher Training",
    description:
      "Complete transformative journey from foundation to mastery. Integrates traditional yoga helping you build strong foundation, deepen knowledge and refine teaching skills.",
    syllabus:
      "Comprehensive asana mastery, Teaching methodology and ethics, In-depth anatomy, Complete philosophy study, Advanced pranayama and meditation, Business of yoga, and extensive teaching practicum.",
    duration: "54 Days / Introductory to Advanced",
    accreditation: "Yoga Alliance RYT 500",
    batches: [],
    price: 65000,
    deposit: 0,
    teacherId: "",
    image: img2,
  },
  {
    id: "aerial-yoga-ttc",
    title: "Aerial Yoga TTC",
    description:
      "Aerial yoga teacher training for students who want to explore hammock-supported practice and teaching methodology.",
    syllabus:
      "Detailed curriculum, practice hours, and batch information will be updated after client confirmation.",
    duration: "Details Coming Soon",
    accreditation: "Specialized TTC",
    batches: [],
    price: 0,
    deposit: 0,
    teacherId: "",
    image: img3,
  },
  {
    id: "sound-healing-ttc",
    title: "Sound Healing TTC",
    description:
      "A sound healing teacher training pathway for meditation, vibration, and restorative wellness practices.",
    syllabus:
      "Detailed curriculum, practice hours, and batch information will be updated after client confirmation.",
    duration: "Details Coming Soon",
    accreditation: "Specialized TTC",
    batches: [],
    price: 0,
    deposit: 0,
    teacherId: "",
    image: img4,
  },
];

function courseKey(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function mergeCourses(remoteCourses: Course[]) {
  const merged = new Map<string, Course>();

  [...remoteCourses, ...defaultCourses].forEach((course) => {
    const key = courseKey(course.title);
    if (!merged.has(key)) {
      merged.set(key, course);
    }
  });

  return Array.from(merged.values());
}

function normalizeLevelText(value: string) {
  return value
    .replace(/Beginner to Advance/gi, "Introductory to Advanced")
    .replace(/Beginner to Advanced/gi, "Introductory to Advanced")
    .replace(/Beginner Level/gi, "Introductory Level")
    .replace(/Beginner/gi, "Introductory");
}

function getDuration(course: Course) {
  return normalizeLevelText(course.duration).split("/")[0].trim();
}

function getLevel(course: Course) {
  const parts = normalizeLevelText(course.duration).split("/");
  if (parts[1]) {
    return parts[1].trim();
  }

  if (course.title.includes("100") || course.title.includes("200")) {
    return "Introductory Level";
  }

  if (course.title.includes("300")) {
    return "Intermediate Level";
  }

  if (course.title.includes("500")) {
    return "Introductory to Advanced";
  }

  return "All Levels";
}

function getPrice(course: Course) {
  const courseDetail =
    getCourseDetailById(course.id) ?? getCourseDetailByTitle(course.title);

  if (courseDetail) {
    return `${courseDetail.pricing.indian} / ${courseDetail.pricing.international}`;
  }

  if (!course.price) {
    return "Fee details coming soon";
  }

  return `INR ${course.price.toLocaleString("en-IN")}`;
}

export function CoursesPage({ activeTab, onNavigate }: CoursesPageProps) {
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(0);

  useEffect(() => {
    fetchCourses();
  }, []);

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.courses) {
        setCourses(mergeCourses(data.courses));
      } else {
        setCourses(defaultCourses);
      }
    } catch (error) {
      console.log("Using fallback courses data (backend unavailable)");
      setCourses(defaultCourses);
    }
  };

  const displayCourses = courses.length > 0 ? courses : defaultCourses;
  const activeCourseDetail = getCourseDetailById(activeTab);

  if (activeCourseDetail) {
    return (
      <CourseDetailPage
        courseId={activeCourseDetail.id}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="relative">
      <MandalaWatermark />

      <section className="courses-hero">
        <div className="courses-hero-pattern" />
        <div className="container mx-auto px-4">
          <motion.img
            src={shivaLogo}
            alt="Shiva Logo"
            className="courses-hero-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <motion.h1
            className="text-primary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Explore Multi-Style Yoga Courses in Rishikesh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Choose a TTC, retreat, or specialized training path
            at Shivaya Yogashala.
          </motion.p>
          <div className="courses-hero-pills">
            <span>100 Hour Yoga TTC</span>
            <span>Aerial Yoga TTC</span>
            <span>Sound Healing TTC</span>
          </div>
        </div>
      </section>

      <section className="courses-showcase">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="courses-mandala-device"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span />
            <img src={shivaLogo} alt="" />
          </motion.div>

          <div className="courses-page-grid">
            {displayCourses.map((course, index) => {
              const isOpen = selectedCourse === index;
              const detail =
                getCourseDetailById(course.id) ??
                getCourseDetailByTitle(course.title);

              return (
                <motion.article
                  key={course.id || course.title}
                  className={`course-feature-card ${
                    isOpen ? "is-open" : ""
                  }`}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.06, 0.3),
                  }}
                  onClick={() =>
                    setSelectedCourse(isOpen ? null : index)
                  }
                >
                  <div className="course-feature-media">
                    <ImageWithFallback
                      src={course.image || img1}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {course.accreditation && (
                      <Badge className="course-feature-badge">
                        {course.accreditation}
                      </Badge>
                    )}
                  </div>

                  <div className="course-feature-content">
                    <div className="course-feature-topline">
                      <span>
                        <Clock className="w-4 h-4" />
                        {getDuration(course)}
                      </span>
                      <span>{getLevel(course)}</span>
                    </div>

                    <h3>{course.title}</h3>
                    <p>{course.description}</p>

                    <div className="course-feature-price">
                      {getPrice(course)}
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className="course-feature-details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <div>
                            <BookOpen className="w-4 h-4" />
                            <p>{course.syllabus}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="course-feature-actions">
                      <Button
                        className="bg-primary hover:bg-primary/90"
                        onClick={(event) => {
                          event.stopPropagation();
                          onNavigate("apply-now");
                        }}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Enroll Now
                      </Button>
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/5"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (detail) {
                            onNavigate(detail.id);
                          } else {
                            setSelectedCourse(isOpen ? null : index);
                          }
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-primary mb-8 md:mb-12 px-2">
            Why Take Yoga Teacher Training?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Deepen Your Practice",
                description:
                  "Go beyond asanas to dive into philosophy, anatomy and spiritual development",
                icon: <User className="w-12 h-12 text-primary" />,
              },
              {
                title: "Career Opportunity",
                description:
                  "Become a certified yoga teacher and share your knowledge worldwide",
                icon: <Globe className="w-12 h-12 text-secondary" />,
              },
              {
                title: "Life Transformation",
                description:
                  "Experience profound personal growth and lifestyle transformation",
                icon: <Star className="w-12 h-12 text-primary" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center border-2 border-primary/20 rounded-lg p-6 md:p-8 space-y-3 md:space-y-4 bg-white hover:shadow-xl transition-all">
                  <div className="flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-primary">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
        <MandalaWatermark />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-4 md:mb-6 px-2">
            Ready to Begin Your Yoga Journey?
          </h2>
          <p className="text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-8 opacity-95 px-4">
            Limited seats available. Secure your spot in the next
            teacher training batch at our ashram in sacred
            Rishikesh.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 text-sm md:text-base h-10 md:h-11"
            onClick={() => onNavigate("contact")}
          >
            Talk to Yoga Mentor
          </Button>
        </div>
      </section>
    </div>
  );
}

export default CoursesPage;
