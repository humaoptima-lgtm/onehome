'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

/**
 * AnimatePresence wrapper for page transitions
 * Uses framer-motion for smooth enter/exit animations
 */
export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.3,
          ease: [0, 0, 0.2, 1], // ease-out
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
