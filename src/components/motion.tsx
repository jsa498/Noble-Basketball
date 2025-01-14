'use client';

import { motion } from 'framer-motion';

export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;
export const MotionSection = motion.section; 

interface GlowingButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  className?: string;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  text,
  onClick,
  href,
  className = ''
}) => {
  // Glow and scale animation
  const buttonAnimation = {
    initial: { 
      scale: 1,
      boxShadow: '0 0 0 rgba(16, 185, 129, 0)'
    },
    animate: {
      scale: [1, 1.02, 1],
      boxShadow: [
        '0 0 0 rgba(16, 185, 129, 0)',
        '0 0 20px rgba(16, 185, 129, 0.4)',
        '0 0 0 rgba(16, 185, 129, 0)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)',
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      variants={buttonAnimation}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`
        relative inline-block px-8 py-3 
        bg-gradient-to-r from-emerald-500 to-emerald-600
        text-white font-semibold rounded-full
        transition-all duration-300
        hover:from-emerald-600 hover:to-emerald-700
        ${className}
      `}
    >
      <span className="relative z-10">{text}</span>
      <motion.div
        className="absolute -inset-1 rounded-full blur-lg z-0 bg-emerald-500/30"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.a>
  );
}; 