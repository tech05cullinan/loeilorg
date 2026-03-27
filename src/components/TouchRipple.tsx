import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const TouchRipple = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const addRipple = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newRipple = {
        id: Date.now(),
        x: touch.clientX,
        y: touch.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    window.addEventListener('touchstart', addRipple, { passive: true });
    return () => window.removeEventListener('touchstart', addRipple);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] md:hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-10 h-10 border-2 border-gold/30 rounded-full"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
