import { type ReactNode } from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { springSnappy } from "@/features/premium/motion";

type GlowTone = "honey" | "cyan" | "neutral";

export interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "title"> {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  glow?: GlowTone;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const glowClassMap: Record<GlowTone, string> = {
  honey: "hover:shadow-[0_26px_70px_rgba(255,184,0,0.24)]",
  cyan: "hover:shadow-[0_26px_70px_rgba(56,189,248,0.23)]",
  neutral: "hover:shadow-[0_24px_64px_rgba(9,13,24,0.32)]",
};

export function GlassCard({
  title,
  subtitle,
  children,
  className = "",
  glow = "neutral",
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={springSnappy}
      className={[
        "rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-[0_20px_54px_rgba(7,9,17,0.35)] backdrop-blur-2xl",
        "transition-[box-shadow,background-color,border-color] duration-300",
        glowClassMap[glow],
        className,
      ].join(" ")}
      {...props}
    >
      {(title || subtitle) && (
        <header className="mb-3">
          {title && <h3 className="text-base font-extrabold tracking-tight text-white sm:text-lg">{title}</h3>}
          {subtitle && (
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </motion.div>
  );
}
