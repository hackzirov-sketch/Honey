import { type Transition, type Variants } from "framer-motion";

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 24,
  mass: 0.85,
};

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...springSmooth, staggerChildren: 0.07, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -16, filter: "blur(6px)", transition: { duration: 0.2 } },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springSnappy },
};

export const messageBubbleVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springSnappy },
};

export const reactionPopVariants: Variants = {
  idle: { scale: 1, y: 0 },
  active: {
    scale: [1, 1.32, 0.96, 1],
    y: [0, -3, 0],
    transition: { duration: 0.34, times: [0, 0.35, 0.7, 1] },
  },
};

export const floatingCardHover = {
  whileHover: {
    scale: 1.03,
    y: -4,
    boxShadow:
      "0 24px 64px rgba(9, 13, 24, 0.32), 0 0 0 1px rgba(255,255,255,0.26), 0 0 30px rgba(255,184,0,0.2)",
  },
  whileTap: { scale: 0.98 },
  transition: springSnappy,
} as const;
