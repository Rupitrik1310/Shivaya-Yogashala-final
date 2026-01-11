import { MandalaWatermark } from "./MandalaWatermark";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { Clock, Sparkles, BookOpen, Calendar, User, Globe, Stars } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import shivaLogo from 'figma:asset/dda3bf9d206010d15993d348fc449c47e604a2d7.png';
import { motion, AnimatePresence } from "motion/react";

interface Course {
  id: string;
  title: string;
  description: string;
  syllabus: string;
  batches: { startDate: string; endDate: string; }[];
  price: number;
  deposit: number;
  accreditation: string;
  teacherId: string;
  duration: string;
  image: string;
}

interface CoursesPageProps {
  onNavigate: (tab: string) => void;
}

export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

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
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success && data.courses) {
        setCourses(data.courses);
      } else {
        // Use default courses if API doesn't return expected format
        setCourses(getDefaultCourses());
      }
    } catch (error) {
      console.log("Using fallback courses data (backend unavailable)");
      // Use default courses on error
      setCourses(getDefaultCourses());
    }
  };

  const displayCourses = courses.length > 0 ? courses : getDefaultCourses();

  return (
    <div className="relative">
      <MandalaWatermark />

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="flex justify-center mb-4 md:mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <img 
              src={shivaLogo} 
              alt="Shiva Logo" 
              className="w-20 h-20 md:w-32 md:h-32 object-contain drop-shadow-2xl"
            />
          </motion.div>
          <motion.h1 
            className="text-primary mb-4 md:mb-6 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore Multi-Style Yoga Courses in Rishikesh
          </motion.h1>
          <motion.p 
            className="text-sm md:text-lg max-w-3xl mx-auto text-muted-foreground px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Choose your amazing life-changing professional yoga courses at Shivaya Yogashala
          </motion.p>
        </div>
      </section>

      {/* Sacred Scrolls Course Display */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          {/* Sacred Mandala Center Piece */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="relative w-32 h-32">
              {/* Rotating Outer Ring */}
              <motion.div
                className="absolute inset-0 border-4 border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  borderStyle: 'dashed',
                }}
              />
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-4 border-4 border-secondary/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                  borderStyle: 'dotted',
                }}
              />
              {/* Center Om */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-5xl text-primary"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ॐ
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Course Cards in Sacred Pattern */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {displayCourses.map((course, index) => {
              const isOpen = selectedCourse === index;

              return (
                <motion.div
                  key={course.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Palm Leaf Manuscript Card */}
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setSelectedCourse(isOpen ? null : index)}
                  >
                    {/* Main Scroll Container */}
                    <div 
                      className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 hover:border-primary/40 bg-white transition-all hover:shadow-primary/10"
                      style={{
                        transform: isOpen ? 'scale(1.02)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Decorative Corner Patterns */}
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl" />
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />

                      {/* Lotus Badge */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white bg-gradient-to-br from-primary to-secondary">
                          <span className="text-white text-xl">🪷</span>
                        </div>
                      </div>

                      {/* Image Section */}
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <ImageWithFallback
                          src={course.image || "https://images.unsplash.com/photo-1758797315487-b3b225dff7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHRyYWluaW5nJTIwaW5kaWF8ZW58MXx8fHwxNzYyMTY5NjgwfDA&ixlib=rb-4.1.0&q=80&w=1080"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />

                        {/* Accreditation Badge */}
                        {course.accreditation && (
                          <Badge className="absolute top-4 right-4 bg-secondary shadow-lg text-xs">
                            {course.accreditation}
                          </Badge>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-6 space-y-4">
                        {/* Title with Decorative Lines */}
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-0.5 bg-primary/50" />
                          <h3 className="flex-1 text-center text-primary">
                            {course.title}
                          </h3>
                          <div className="w-8 h-0.5 bg-primary/50" />
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {course.description}
                        </p>

                        {/* Duration Info */}
                        <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-primary/5">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm text-primary">{course.duration}</span>
                        </div>
{/* Course Fees (Only for TTC Courses) */}
{course.price > 0 && (
  <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-secondary/10">
    <span className="text-sm font-semibold text-secondary">
      ₹{course.price.toLocaleString("en-IN")}
    </span>
  </div>
)}
                        {/* Expandable Details */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t-2 border-primary/10 space-y-3">
                                {/* Sacred Divider */}
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                  <span>✦</span>
                                  <span>Sacred Teachings</span>
                                  <span>✦</span>
                                </div>

                                {/* Syllabus Preview */}
                                {course.syllabus && (
                                  <div className="bg-primary/5 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <BookOpen className="w-4 h-4 text-primary" />
                                      <span className="text-xs text-primary">Course Highlights</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {course.syllabus}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <Button
                            className="flex-1 bg-primary hover:bg-primary/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("contact");
                            }}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Enroll Now
                            </span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/5"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCourse(isOpen ? null : index);
                            }}
                          >
                            {isOpen ? 'Close' : 'Details'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why TTC Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-primary mb-8 md:mb-12 px-2">Why Take Yoga Teacher Training?</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Deepen Your Practice",
                description: "Go beyond asanas to dive into philosophy, anatomy and spiritual development",
                icon: <User className="w-12 h-12 text-primary" />
              },
              {
                title: "Career Opportunity",
                description: "Become a certified yoga teacher and share your knowledge worldwide",
                icon: <Globe className="w-12 h-12 text-secondary" />
              },
              {
                title: "Life Transformation",
                description: "Experience profound personal growth and lifestyle transformation",
                icon: <Sparkles className="w-12 h-12 text-primary" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center border-2 border-primary/20 rounded-2xl p-6 md:p-8 space-y-3 md:space-y-4 bg-white hover:shadow-xl transition-all">
                  <div className="flex justify-center">{item.icon}</div>
                  <h3 className="text-primary">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
        <MandalaWatermark />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-4 md:mb-6 px-2">Ready to Begin Your Yoga Journey?</h2>
          <p className="text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-8 opacity-95 px-4">
            Limited seats available - Secure your spot in the next teacher training batch today 
            at our ashram in sacred Rishikesh!
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 text-sm md:text-base h-10 md:h-11"
            onClick={() => onNavigate("contact")}
          >
            Apply Now - Limited Seats
          </Button>
        </div>
      </section>
    </div>
  );
}

function getDefaultCourses() {
  return [
    {
      id: "1",
      title: "Yoga Retreat in Rishikesh, India",
      description: "A journey to relax, recharge and discover yourself through yoga, meditation and nature's serenity. Join our soulful retreat and experience true harmony within.",
      syllabus: "Daily yoga sessions, guided meditation, nature walks, spiritual talks, pranayama practices, and holistic wellness activities in the heart of Rishikesh.",
      duration: "3 to 5 Days",
      accreditation: "Retreat Program",
      batches: [],
      price: 0,
      deposit: 0,
      teacherId: "",
      image: "https://images.unsplash.com/photo-1631690704506-1f83a7dc36b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcmV0cmVhdCUyMHJpc2hpa2VzaCUyMG5hdHVyZXxlbnwxfHx8fDE3NjIxMjA3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      title: "200 Hour Multi-style Yoga Teacher Training",
      description: "Experience the essence of Yoga through our 200 hour teacher training. Traditional practice of Hatha, Ashtanga, philosophy and self-growth designed to help you live and share yoga authentically.",
      syllabus: "Asana practice (Hatha & Ashtanga), Teaching methodology, Anatomy & Physiology, Yoga philosophy, Pranayama & meditation, Alignment principles, and practical teaching experience.",
      duration: "25 Days / Beginner Level",
      accreditation: "Yoga Alliance RYT 200",
      batches: [],
      price: 29999,
      deposit: 0,
      teacherId: "",
      image: "https://images.unsplash.com/photo-1758797315487-b3b225dff7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHRyYWluaW5nJTIwaW5kaWF8ZW58MXx8fHwxNzYyMTY5NjgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      title: "300 Hour Multi-style Yoga Teacher Training",
      description: "Step into the next stage with our 300 Hour intermediate TTC. Advanced training expanding your knowledge of asanas, alignment and philosophy while refining teaching skills.",
      syllabus: "Advanced asana techniques, Sequencing & class planning, Adjustments & assists, Advanced philosophy, Pranayama mastery, Energy anatomy, and mentored teaching practice.",
      duration: "28 Days / Intermediate Level",
      accreditation: "Yoga Alliance RYT 300",
      batches: [],
      price: 34999,
      deposit: 0,
      teacherId: "",
      image: "https://images.unsplash.com/photo-1758599879795-536d5f203de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwYXNhbmFzJTIwcG9zZXN8ZW58MXx8fHwxNzYwNjExMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "4",
      title: "500 Hour Multi-style Yoga Teacher Training",
      description: "Complete transformative journey from foundation to mastery. Integrates traditional yoga helping you build strong foundation, deepen knowledge and refine teaching skills.",
      syllabus: "Comprehensive asana mastery, Teaching methodology & ethics, In-depth anatomy, Complete philosophy study, Advanced pranayama & meditation, Business of yoga, and extensive teaching practicum.",
      duration: "54 Days / Beginner to Advance",
      accreditation: "Yoga Alliance RYT 500",
      batches: [],
      price: 65000,
      deposit: 0,
      teacherId: "",
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMGluZGlhfGVufDF8fHx8MTc2MDYxMTI5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];
}