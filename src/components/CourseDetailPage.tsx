import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BedDouble,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  HelpCircle,
  ListChecks,
  MapPin,
  Sparkles,
} from "lucide-react";

import { MandalaWatermark } from "./MandalaWatermark";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getCourseDetailById } from "../data/courseDetails";

interface CourseDetailPageProps {
  courseId: string;
  onNavigate: (tab: string) => void;
}

const sectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "schedule", label: "Schedule" },
  { id: "accommodation", label: "Accommodation" },
  { id: "certification", label: "Certification" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "apply", label: "Apply Now" },
];

function setMeta(description: string) {
  let meta = document.querySelector("meta[name='description']");
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", description);
}

export function CourseDetailPage({
  courseId,
  onNavigate,
}: CourseDetailPageProps) {
  const course = getCourseDetailById(courseId);

  useEffect(() => {
    if (!course) return;

    document.title = `${course.title} in Rishikesh | Shivaya Yogashala`;
    setMeta(
      `${course.title} at Shivaya Yogashala, Rishikesh. Explore overview, curriculum, schedule, accommodation, certification, pricing, FAQ, and apply now.`,
    );
  }, [course]);

  if (!course) {
    return (
      <section className="course-detail-empty">
        <div className="container mx-auto px-4 text-center">
          <h1>Course not found</h1>
          <p>Please return to the courses page to choose a program.</p>
          <Button onClick={() => onNavigate("courses")}>
            Back to Courses
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="course-detail-page">
      <MandalaWatermark />

      <section className="course-detail-hero">
        <div className="course-detail-hero-pattern" />
        <div className="container mx-auto px-4">
          <div className="course-detail-hero-grid">
            <motion.div
              className="course-detail-hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <div className="course-detail-kicker">
                <Sparkles className="w-4 h-4" />
                {course.eyebrow}
              </div>
              <h1>{course.title} in Rishikesh</h1>
              <p>{course.overview}</p>

              <div className="course-detail-hero-actions">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => onNavigate("apply-now")}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                  onClick={() => onNavigate("apply-now")}
                >
                  Talk to Yoga Mentor
                </Button>
              </div>

              <div className="course-detail-stats">
                <div>
                  <span>Duration</span>
                  <strong>{course.duration}</strong>
                </div>
                <div>
                  <span>Level</span>
                  <strong>{course.level}</strong>
                </div>
                <div>
                  <span>Training</span>
                  <strong>{course.accreditation}</strong>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="course-detail-hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="course-detail-hero-image">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="sync"
                />
              </div>
              <div className="course-detail-price-note">
                <span>Indian Students</span>
                <strong>{course.pricing.indian}</strong>
                <span>International</span>
                <strong>{course.pricing.international}</strong>
              </div>
              {course.badgeImage && (
                <div className="course-detail-badge">
                  <img
                    src={course.badgeImage}
                    alt={course.accreditation}
                  />
                </div>
              )}
            </motion.div>
          </div>

          <nav
            className="course-detail-section-nav"
            aria-label={`${course.title} page sections`}
          >
            {sectionLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="overview" className="course-detail-section">
        <div className="container mx-auto px-4">
          <div className="course-detail-two-column">
            <div>
              <Badge className="course-detail-section-badge">
                Overview
              </Badge>
              <h2>{course.shortTitle} Overview</h2>
              <p>{course.overview}</p>
            </div>

            <div className="course-detail-highlight-card">
              <h3>What You Will Experience</h3>
              <div className="course-detail-check-list">
                {course.highlights.map((highlight) => (
                  <div key={highlight}>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="curriculum"
        className="course-detail-section course-detail-section-soft"
      >
        <div className="container mx-auto px-4">
          <div className="course-detail-section-heading">
            <Badge className="course-detail-section-badge">
              <BookOpen className="w-4 h-4" />
              Curriculum
            </Badge>
            <h2>Course Curriculum</h2>
            <p>
              A structured learning journey balancing traditional
              practice, theory, self-study, and guided teaching
              confidence.
            </p>
          </div>

          <div className="course-detail-curriculum-grid">
            {course.curriculum.map((item, index) => (
              <article key={item} className="course-detail-module">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="course-detail-section">
        <div className="container mx-auto px-4">
          <div className="course-detail-section-heading">
            <Badge className="course-detail-section-badge">
              <CalendarDays className="w-4 h-4" />
              Schedule
            </Badge>
            <h2>Daily Schedule</h2>
            <p>
              The schedule may adjust slightly by season, batch size,
              and teacher guidance.
            </p>
          </div>

          <div className="course-detail-timeline">
            {course.schedule.map((item) => (
              <article key={`${item.time}-${item.title}`}>
                <time>{item.time}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="accommodation"
        className="course-detail-section course-detail-section-soft"
      >
        <div className="container mx-auto px-4">
          <div className="course-detail-two-column course-detail-accommodation-grid">
            <div>
              <Badge className="course-detail-section-badge">
                <BedDouble className="w-4 h-4" />
                Accommodation
              </Badge>
              <h2>Stay and Meals</h2>
              <p>
                Training life is supported by simple comfort, sattvic
                food, and a peaceful rhythm for practice and rest.
              </p>
            </div>
            <div className="course-detail-info-list">
              {course.accommodation.map((item) => (
                <div key={item}>
                  <MapPin className="w-5 h-5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="certification" className="course-detail-section">
        <div className="container mx-auto px-4">
          <div className="course-detail-certification">
            {course.badgeImage ? (
              <img src={course.badgeImage} alt={course.accreditation} />
            ) : (
              <Award className="w-16 h-16" />
            )}
            <div>
              <Badge className="course-detail-section-badge">
                Certification
              </Badge>
              <h2>{course.accreditation}</h2>
              <div className="course-detail-check-list">
                {course.certification.map((item) => (
                  <div key={item}>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="course-detail-section course-detail-section-soft"
      >
        <div className="container mx-auto px-4">
          <div className="course-detail-section-heading">
            <Badge className="course-detail-section-badge">
              <CircleDollarSign className="w-4 h-4" />
              Pricing
            </Badge>
            <h2>Course Pricing</h2>
            <p>
              Indian and international pricing are shown separately for
              clear admission planning.
            </p>
          </div>

          <div className="course-detail-pricing-grid">
            <article>
              <span>Indian Students</span>
              <strong>{course.pricing.indian}</strong>
              <p>For students applying from India.</p>
            </article>
            <article>
              <span>International Students</span>
              <strong>{course.pricing.international}</strong>
              <p>For students applying from outside India.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" className="course-detail-section">
        <div className="container mx-auto px-4">
          <div className="course-detail-section-heading">
            <Badge className="course-detail-section-badge">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </Badge>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="course-detail-faq-list">
            {course.faqs.map((item) => (
              <details key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <ListChecks className="w-5 h-5" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="course-detail-apply">
        <MandalaWatermark />
        <div className="container mx-auto px-4">
          <div className="course-detail-apply-card">
            <Badge className="course-detail-section-badge">
              Apply Now
            </Badge>
            <h2>Begin Your {course.shortTitle} Journey</h2>
            <p>
              Share your preferred course, room option, and travel
              timeline with the Shivaya Yogashala team. A mentor will
              guide you through availability and enrollment.
            </p>
            <div>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => onNavigate("apply-now")}
              >
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2" />
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
        </div>
      </section>
    </div>
  );
}

export default CourseDetailPage;
