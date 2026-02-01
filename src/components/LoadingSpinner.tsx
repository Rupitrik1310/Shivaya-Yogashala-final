import shivaLogo from '../assets/shivaya-yoga-logo.webp';
import { motion } from 'motion/react';

export function LoadingSpinner() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-white via-primary/5 to-secondary/5 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="text-center space-y-8">
        {/* Soft floating lotus petals background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-primary/10"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -20,
                scale: 0.5 + Math.random() * 0.5
              }}
              animate={{ 
                y: window.innerHeight + 20,
                x: Math.random() * window.innerWidth,
                rotate: 360
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.8
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Soft breathing circles */}
          <div className="relative flex items-center justify-center">
            {/* Outer soft glow */}
            <motion.div
              className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Middle breathing circle */}
            <motion.div
              className="absolute w-40 h-40 rounded-full border border-primary/20"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            {/* Inner breathing circle */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border border-secondary/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Logo with gentle float and fade */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src={shivaLogo} 
                alt="Loading..." 
                className="w-28 h-28 object-contain drop-shadow-lg"
              />
            </motion.div>
          </div>

          {/* Soft text with fade animation */}
          <motion.div 
            className="space-y-3 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-primary/80 tracking-widest text-sm">
                ॐ
              </p>
            </motion.div>
            
            <motion.p 
              className="text-xs text-muted-foreground/70 tracking-wide"
              animate={{ opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              Preparing your journey...
            </motion.p>
          </motion.div>

          {/* Soft flowing progress dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/40"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
