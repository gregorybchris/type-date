import { m, type Variants } from "motion/react";

export const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.022, delayChildren: 0.04 } },
};
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={listVariants} initial="hidden" animate="show">
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}
