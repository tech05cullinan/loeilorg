import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence, useVelocity, useTransform } from 'motion/react';

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text' | 'click'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity for stretching effect
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  
  const scaleX = useTransform(velocityX, [-3000, 0, 3000], [1.5, 1, 1.5]);
  const scaleY = useTransform(velocityY, [-3000, 0, 3000], [0.5, 1, 0.5]);
  const rotate = useTransform([velocityX, velocityY], ([vx, vy]) => {
    return Math.atan2(vy as number, vx as number) * (180 / Math.PI);
  });

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trailing dots for gooey effect
  const trail1X = useSpring(cursorX, { damping: 15, stiffness: 150 });
  const trail1Y = useSpring(cursorY, { damping: 15, stiffness: 150 });
  const trail2X = useSpring(cursorX, { damping: 10, stiffness: 100 });
  const trail2Y = useSpring(cursorY, { damping: 10, stiffness: 100 });

  const moveCursor = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    if (magneticTarget) {
      const rect = magneticTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      cursorX.set(centerX + distanceX * 0.3);
      cursorY.set(centerY + distanceY * 0.3);
    } else {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, mouseX, mouseY, isVisible, magneticTarget]);

  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickable = target.closest('a, button, .cursor-pointer') as HTMLElement;
    const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span, li');

    if (clickable) {
      setCursorState('hover');
      setMagneticTarget(clickable);
    } else if (isText && !clickable) {
      setCursorState('text');
      setMagneticTarget(null);
    } else {
      setCursorState('default');
      setMagneticTarget(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [moveCursor, handleMouseOver]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  const variants = {
    default: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '2px solid rgba(212, 175, 55, 0.6)',
      borderRadius: '50%',
    },
    hover: {
      width: 88,
      height: 88,
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
      border: '2px solid rgba(212, 175, 55, 0.9)',
      borderRadius: '50%',
    },
    text: {
      width: 3,
      height: 36,
      backgroundColor: 'rgba(212, 175, 55, 1)',
      border: '0px solid transparent',
      borderRadius: '2px',
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] hidden md:block">
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: 'url(#goo)' }}>
        {/* Trailing Dots */}
        <motion.div
          className="fixed top-0 left-0 w-3 h-3 bg-gold/50 rounded-full z-[999998]"
          style={{
            x: trail1X,
            y: trail1Y,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isVisible ? 1 : 0,
          }}
        />
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 bg-gold/30 rounded-full z-[999997]"
          style={{
            x: trail2X,
            y: trail2Y,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isVisible ? 1 : 0,
          }}
        />

        {/* Main Dot */}
        <motion.div
          className="fixed top-0 left-0 w-5 h-5 bg-gold rounded-full z-[999999]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isVisible ? 1 : 0,
            scale: isClicked ? 0.5 : 1,
          }}
        />
        
        {/* Outer Ring */}
        <motion.div
          className="fixed top-0 left-0 z-[999998] flex items-center justify-center mix-blend-difference"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isVisible ? 1 : 0,
            scaleX,
            scaleY,
            rotate,
          }}
          variants={variants}
          animate={cursorState}
          transition={{ 
            type: 'spring', 
            damping: 20, 
            stiffness: 200,
            mass: 0.5
          }}
        >
          {cursorState === 'hover' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full rounded-full bg-gold/20 blur-sm"
            />
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.8, x: mouseX.get(), y: mouseY.get() }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-10 h-10 border-2 border-gold rounded-full -translate-x-1/2 -translate-y-1/2"
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -z-10"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible && cursorState === 'hover' ? 0.5 : 0,
        }}
      />
    </div>
  );
};
