import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Circle, Clock } from "lucide-react";

interface Course {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
}

interface RotatingCoursesMenuProps {
  courses: Course[];
  onNavigate: (tab: string) => void;
}

export function RotatingCoursesMenu({ courses, onNavigate }: RotatingCoursesMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (isPaused || courses.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % courses.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, courses.length]);

  if (courses.length === 0) return null;

  const activeCourse = courses[activeIndex];
  const radius = 180; // Radius for the circular menu (dots)
  const tileRadius = 280; // Radius for the course tiles (further out)

  return (
    <div className="relative py-16 overflow-hidden pb-32">
      {/* Rotating Background Elements - OPTIMIZED: Slower rotation (changed from 60s to 120s) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <div className="text-[400px] text-primary font-serif">ॐ</div>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary mb-4">Explore Our Courses</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Navigate through our transformative yoga teacher training programs
            </p>
          </motion.div>
        </div>

        {/* Circular Rotating Menu */}
        <div 
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Center Active Course Display */}
          <div className="relative z-20 flex items-center justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCourse.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white via-primary/5 to-secondary/10 rounded-2xl p-8 shadow-2xl border-2 border-primary/20 max-w-lg backdrop-blur-sm">
                  {/* Om Symbol Decoration */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-serif">ॐ</span>
                  </div>

                  {/* Course Content */}
                  <div className="text-center space-y-4 pt-4">
                    <h3 className="text-primary leading-tight">
                      {activeCourse.title}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        {activeCourse.duration}
                      </span>
                      <span className="text-primary">•</span>
                      <span className="text-secondary">
                        ₹{activeCourse.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activeCourse.description.length > 120 
                        ? activeCourse.description.substring(0, 120) + "..." 
                        : activeCourse.description}
                    </p>

                    {/* Course Level Badge */}
                    <div className="flex justify-center pt-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full border border-primary/20">
                        <Sparkles className="w-3 h-3" />
                        {activeCourse.title.includes('200') ? 'Beginner Level' : 
                         activeCourse.title.includes('300') ? 'Intermediate Level' : 
                         activeCourse.title.includes('500') ? 'Advanced Level' : 
                         'All Levels'}
                      </span>
                    </div>

                    <Button 
                      className="bg-primary hover:bg-primary/90 mt-4 group"
                      onClick={() => onNavigate("courses")}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Circular Course Tiles with Enroll Buttons */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {courses.map((course, index) => {
              const angle = (360 / courses.length) * index - 90; // Start from top
              const dotX = Math.cos((angle * Math.PI) / 180) * radius;
              const dotY = Math.sin((angle * Math.PI) / 180) * radius;
              const tileX = Math.cos((angle * Math.PI) / 180) * tileRadius;
              const tileY = Math.sin((angle * Math.PI) / 180) * tileRadius;
              const isActive = index === activeIndex;

              return (
                <div key={course.id}>
                  {/* Course Tile */}
                  <motion.div
                    className="absolute pointer-events-auto"
                    style={{
                      left: `calc(50% + ${tileX}px)`,
                      top: `calc(50% + ${tileY}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.15, y: -5 }}
                  >
                    <div className={`bg-white rounded-lg shadow-lg border-2 p-4 w-48 transition-all duration-300 ${
                      isActive 
                        ? 'border-primary shadow-primary/20 shadow-2xl' 
                        : 'border-primary/20 hover:border-primary/50'
                    }`}>
                      {/* Om Symbol Badge */}
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-2xl font-serif transition-colors ${
                          isActive ? 'text-primary' : 'text-primary/30'
                        }`}>ॐ</span>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-gradient-to-br from-primary to-secondary rounded-full"
                          />
                        )}
                      </div>

                      {/* Course Name */}
                      <h4 className={`text-sm mb-2 leading-tight transition-colors ${
                        isActive ? 'text-primary' : 'text-charcoal'
                      }`}>
                        {course.title}
                      </h4>

                      {/* Duration & Price */}
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-secondary">₹{course.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Enroll Now Button */}
                      <Button
                        size="sm"
                        className={`w-full text-xs transition-all ${
                          isActive 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'bg-primary/80 hover:bg-primary'
                        }`}
                        onClick={() => onNavigate("courses")}
                      >
                        Enroll Now
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </motion.div>

                  {/* Navigation Dot */}
                  <motion.button
                    className="absolute pointer-events-auto cursor-pointer group"
                    style={{
                      left: `calc(50% + ${dotX}px)`,
                      top: `calc(50% + ${dotY}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Dot */}
                    <motion.div
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-br from-primary to-secondary shadow-lg' 
                          : 'bg-gray-300 group-hover:bg-primary/50'
                      }`}
                      animate={{
                        scale: isActive ? [1, 1.3, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    />

                    {/* Connecting Line to Center (when active) */}
                    {isActive && (
                      <motion.div
                        className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-primary to-transparent origin-left"
                        style={{
                          width: `${Math.sqrt(dotX * dotX + dotY * dotY)}px`,
                          transform: `translate(-50%, -50%) rotate(${Math.atan2(dotY, dotX)}rad)`,
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 0.3, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Center Circle Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-2 border-secondary/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* Navigation Indicator */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {courses.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group"
              aria-label={`Go to course ${index + 1}`}
            >
              <motion.div
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-gradient-to-r from-primary to-secondary' 
                    : 'w-2 bg-gray-300 group-hover:bg-primary/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            </button>
          ))}
        </div>

        {/* Sanskrit Shloka */}
        <div className="text-center mt-12 pt-8 border-t border-primary/20">
          <p className="text-secondary italic text-lg">योगः कर्मसु कौशलम्</p>
          <p className="text-sm text-muted-foreground mt-2">Yogaḥ Karmasu Kauśalam</p>
          <p className="text-xs text-muted-foreground">Yoga is skill in action</p>
        </div>
      </div>
    </div>
  );
}