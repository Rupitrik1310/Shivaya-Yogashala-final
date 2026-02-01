import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FloatingYogaElements() {
  // PERFORMANCE OPTIMIZED: Reduced from 14 to 4 elements
  // Simplified animation variants
  const floatingVariants = {
    animate: (custom: number) => ({
      y: [0, -20, 0], // Reduced from -30
      opacity: [0.1, 0.2, 0.1], // Reduced opacity changes
      transition: {
        duration: 10 + custom, // Slower animations
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom * 0.8,
      },
    }),
  };

  // Reduced to only 4 floating elements for better performance
  const floatingElements = [
    // Om symbol
    { 
      emoji: "ॐ",
      size: "text-4xl", 
      opacity: "opacity-10", 
      top: "10%", 
      left: "8%", 
      delay: 0 
    },
    // Lotus
    { 
      emoji: "🪷",
      size: "text-3xl", 
      opacity: "opacity-15", 
      top: "70%", 
      right: "10%", 
      delay: 1.5 
    },
    // Om symbol
    { 
      emoji: "ॐ",
      size: "text-3xl", 
      opacity: "opacity-10", 
      top: "30%", 
      right: "15%", 
      delay: 3 
    },
    // Lotus
    { 
      emoji: "🪷",
      size: "text-4xl", 
      opacity: "opacity-12", 
      top: "60%", 
      left: "12%", 
      delay: 4.5 
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.opacity}`}
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
          }}
          variants={floatingVariants}
          custom={element.delay}
          animate="animate"
        >
          {element.emoji}
        </motion.div>
      ))}
      
      {/* Reduced rotating elements from 3 to 1 */}
      <motion.div
        className="absolute w-16 h-16 rounded-full border border-primary/5"
        style={{ top: "50%", left: "50%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 20, // Slower
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}