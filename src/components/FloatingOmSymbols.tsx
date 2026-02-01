import { motion } from "motion/react";

export function FloatingOmSymbols() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Om Symbols */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`om-${i}`}
          className="absolute text-6xl text-primary/5"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            rotate: Math.random() * 360 
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ॐ
        </motion.div>
      ))}
    </div>
  );
}
