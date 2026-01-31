  import { MandalaWatermark } from "./MandalaWatermark";
  import { Button } from "./ui/button";
  import { Card, CardContent } from "./ui/card";
  import { Flower, Heart, Users, Award } from "lucide-react";
  import { ImageWithFallback } from "./figma/ImageWithFallback";
  import shivaLogo from "../assets/shivaya-yoga-logo.webp";
  import { CertificationStamps } from "./CertificationStamps";
  import { motion, LazyMotion, domAnimation } from "motion/react";
  import { LoadingSpinner } from "./LoadingSpinner";
  import { useState, useEffect } from "react";
  import {
    projectId,
    publicAnonKey,
  } from "../utils/supabase/info";
  import {
    Clock,
    Calendar,
    ArrowRight,
    Star,
    Circle,
    Flame,
    HandMetal,
    Sparkles,
    Flower2,
  } from "lucide-react";
  import { RotatingCoursesMenu } from "./RotatingCoursesMenu";
  import { Badge } from "./ui/badge";
  
  interface Course {
    id: string;
    title: string;
    description: string;
    duration: string;
    price: number;
    image: string;
    batches: { startDate: string; endDate: string }[];
  }
  
  interface HomePageProps {
    onNavigate: (tab: string) => void;
  }
  
  export function HomePage({ onNavigate }: HomePageProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
  
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
          throw new Error(
            `HTTP error! status: ${response.status}`,
          );
        }
  
        const data = await response.json();
        if (data.success && data.courses) {
          setCourses(data.courses);
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
      // Fallback course data when API is unavailable
      setCourses([
        {
          id: "1",
          title: "200-Hour Multi-Style Yoga Teacher Training",
          description:
            "Comprehensive foundation course covering Hatha, Ashtanga, and traditional yoga philosophy. Perfect for beginners starting their yoga teaching journey.",
          duration: "25 Days",
          price: 0,
          image:
            "https://images.unsplash.com/photo-1758797315487-b3b225dff7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          batches: [],
        },
        {
          id: "2",
          title: "300-Hour Advanced Yoga Teacher Training",
          description:
            "Advanced training for experienced practitioners seeking deeper mastery in Ashtanga Vinyasa and traditional yoga practices.",
          duration: "28 Days",
          price: 0,
          image:
            "https://images.unsplash.com/photo-1588286840104-8957b019727f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          batches: [],
        },
        {
          id: "3",
          title: "500-Hour Complete Yoga Teacher Training",
          description:
            "Complete comprehensive program combining 200hr and 300hr training for ultimate yoga mastery and teacher certification.",
          duration: "54 Days",
          price: 0,
          image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          batches: [],
        },
        {
          id: "4",
          title: "100-Hour Hatha Yoga Teacher Training",
          description:
            "Focused Hatha Yoga training covering traditional asanas, pranayama, and meditation techniques for beginners.",
          duration: "14 Days",
          price: 28000,
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          batches: [],
        },
      ]);
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
  
    const testimonials = [
      {
        name: "Priya Sharma",
        country: "Delhi, India",
        text: "Shivaya Yogashala transformed my understanding of yoga. The spiritual depth and authentic Hatha Yoga teaching changed my life completely. The teachers are truly masters of their craft.",
        rating: 5,
      },
      {
        name: "Rajesh Kumar",
        country: "Mumbai, India",
        text: "The ashram environment is perfect for deep learning. The teachers are highly experienced and the traditional approach to yoga here is unparalleled. Highly recommended!",
        rating: 5,
      },
      {
        name: "Ananya Patel",
        country: "Bangalore, India",
        text: "I came as a complete beginner and left as a confident yoga teacher. The 200hr Multistyle YTT course is comprehensive and covers everything from asanas to philosophy beautifully.",
        rating: 5,
      },
    ];
  
    return (
  <LazyMotion features={domAnimation}>
    <div className="relative">
        <MandalaWatermark />
  
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1715307588998-42d25a276b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMGhpbWFsYXlhc3xlbnwxfHx8fDE3NjIwMDc2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Yoga in Himalayas"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
            {/* Additional color overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10" />
          </div>
  
          <div className="container mx-auto px-4 py-20 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex justify-center mb-6">
                {/* Shiva Logo - No Background Overlay */}
                <motion.img
                  src={shivaLogo}
                  alt="Shiva Logo"
                  className="w-48 h-48 object-contain relative z-10"
                  style={{
                    filter:
                      "drop-shadow(0 20px 40px rgba(10, 147, 150, 0.3))",
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                />
              </div>
  
              <h1
  className="text-4xl md:text-6xl text-primary"
  style={{
    textShadow:
      "0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.1)",
    WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
  }}
>
  Yoga Teacher Training in Rishikesh
</h1>
              <h2 className="text-2xl md:text-3xl text-secondary">
                Yoga Teacher Training Centre
                <br />
                (Rishikesh, India)
              </h2>
  
              <div className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="floating-text"
                >
                  Namaste to all. Thank you for visiting the
                  well-equipped{" "}
                  <span className="highlight-text">
                    Shivaya Yogashala
                  </span>{" "}
                  teacher training centre - the perfect place to
                  start your journey and experience a{" "}
                  <span className="highlight-text">
                    life transforming journey
                  </span>{" "}
                  through yoga practice and meditation.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="floating-text"
                  style={{ animationDelay: "0.3s" }}
                >
                  Our{" "}
                  <span className="highlight-text">(YTTC)</span>{" "}
                  is designed for those who wish to deepen their
                  practice and share the ancient wisdom of yoga
                  with the world. Rooted in traditional teachings
                  from{" "}
                  <span className="highlight-text">
                    Rishikesh
                  </span>
                  , the birthplace of yoga - our program combines{" "}
                  <span className="highlight-text">
                    philosophy, asana, pranayama, meditation
                  </span>{" "}
                  and teaching methodology.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="floating-text"
                  style={{ animationDelay: "0.6s" }}
                >
                  Whether you are a beginner or an experienced
                  practitioner, this course guides you to{" "}
                  <span className="highlight-text">
                    connect with your inner self
                  </span>
                  , develop confidence as a teacher and live the{" "}
                  <span className="highlight-text">
                    true yogic lifestyle
                  </span>
                  .
                </motion.p>
              </div>
  
              {/* Certification Stamps */}
              <div className="py-8">
                <CertificationStamps />
              </div>
  
              <div className="flex flex-wrap gap-4 justify-center pt-6">
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
                  onClick={() => onNavigate("contact")}
                >
                  Apply Now
                </Button>
              </div>
  
              {/* Sanskrit Shloka 1 */}
              <div className="pt-6 border-t border-primary/20 mt-8">
                <p className="text-secondary italic text-lg">
                  योगः चित्तवृत्ति निरोधः
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Yogaḥ Citta-Vṛtti-Nirodhaḥ
                </p>
                <p className="text-xs text-muted-foreground">
                  Yoga is the cessation of the fluctuations of the
                  mind
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Welcome Message & Certification Section */}
  
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-primary mb-4">
                Why Choose Shivaya Yogashala?
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto" />
            </div>
  
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Rotating Courses Menu Section - Interactive Navigator */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 relative overflow-hidden border-y-2 border-primary/10">
          <MandalaWatermark />
          <RotatingCoursesMenu
            courses={courses}
            onNavigate={onNavigate}
          />
        </section>
  
        {/* Detailed Course Listings Section */}
        <section className="py-20 bg-white relative overflow-hidden">
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
                  Our Yoga Teacher Training Courses
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
              {courses.length > 0 ? (
                courses.map((course, index) => (
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
                            src={
                              course.image ||
                              "https://images.unsplash.com/photo-1588286840104-8957b019727f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                            }
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                                {course.duration}
                              </span>
                              <span>|</span>
                              <span className="flex items-center gap-1">
                                <strong className="text-foreground">
                                  Level:
                                </strong>
                                {course.title.includes("200")
                                  ? " Beginner"
                                  : course.title.includes("300")
                                    ? " Intermediate"
                                    : course.title.includes("500")
                                      ? " Beginner to Advanced"
                                      : course.title.includes(
                                            "100",
                                          )
                                        ? " Beginner"
                                        : " All Levels"}
                              </span>
                            </div>
                          </div>
  
                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {course.description}
                          </p>
  
                          {/* Course Highlights with Checkmarks */}
                          <div className="space-y-2 pt-2">
                            {course.title.includes("200") && (
                              <>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    Foundational Yoga Knowledge
                                  </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    Develop Teaching Skills
                                  </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    Understand Alignment and
                                    Safety
                                  </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    200 Hours Multi-Style YTTC
                                    Rishikesh
                                  </span>
                                </div>
                              </>
                            )}
                            {course.title.includes("300") && (
                              <>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    300 Hours Multi-Style Yoga
                                    Teacher Training Rishikesh
                                  </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    Intermediate to Advanced Yoga
                                    Teacher Training Rishikesh
                                  </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    Ashtanga Vinyasa Yoga Teacher
                                    Training Rishikesh
                                  </span>
                                </div>
                              </>
                            )}
                            {course.title.includes("500") && (
                              <>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    Advanced 500-hr Yoga Teacher
                                    Training Rishikesh
                                  </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    Advanced Ashtanga Yoga Teacher
                                    Training Rishikesh
                                  </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <span className="text-primary mt-0.5">
                                    ✓
                                  </span>
                                  <span>
                                    Advanced Hatha Yoga Teacher
                                    Training Rishikesh
                                  </span>
                                </div>
                              </>
                            )}
                            {!course.title.includes("200") &&
                              !course.title.includes("300") &&
                              !course.title.includes("500") && (
                                <>
                                  <div className="flex items-start gap-2 text-sm">
                                    <span className="text-primary mt-0.5">
                                      ✓
                                    </span>
                                    <span>
                                      Yoga Alliance certified
                                      curriculum
                                    </span>
                                  </div>
                                  <div className="flex items-start gap-2 text-sm">
                                    <span className="text-primary mt-0.5">
                                      ✓
                                    </span>
                                    <span>
                                      Traditional Hatha & Ashtanga
                                      Vinyasa techniques
                                    </span>
                                  </div>
                                  <div className="flex items-start gap-2 text-sm">
                                    <span className="text-primary mt-0.5">
                                      ✓
                                    </span>
                                    <span>
                                      Pranayama, Meditation & Yoga
                                      Philosophy
                                    </span>
                                  </div>
                                </>
                              )}
                          </div>
  
                          {/* CTA Buttons */}
                          <div className="flex flex-wrap gap-3 pt-4">
                            <Button
                              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white shadow-md rounded-full px-6"
                              onClick={() =>
                                onNavigate("courses")
                              }
                            >
                              Enroll Now
                            </Button>
                            <Button
                              variant="outline"
                              className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/5 rounded-full px-6"
                              onClick={() =>
                                onNavigate("contact")
                              }
                            >
                              Enquire via Email TTC
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))
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
                              src="https://images.unsplash.com/photo-1758797315487-b3b225dff7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHRyYWluaW5nJTIwaW5kaWF8ZW58MXx8fHwxNzYyMTY5NjgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
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
                              src="https://images.unsplash.com/photo-1588286840104-8957b019727f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
            {courses.length > 0 && (
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
                    courses or contact us for personalized
                    guidance
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
                      Apply Now
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
        <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
          <MandalaWatermark />
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1610978710007-758ad97bb3e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB5b2dhJTIwbWVkaXRhdGlvbiUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NjA2MTEyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-primary mb-4">
                What Our Students Say
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto" />
            </div>
  
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-2 border-secondary/20"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {Array.from({
                        length: testimonial.rating,
                      }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-secondary fill-secondary"
                        />
                      ))}
                    </div>
                    <p className="italic">"{testimonial.text}"</p>
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
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
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
                Apply for Next Batch
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
</LazyMotion>
);
  }