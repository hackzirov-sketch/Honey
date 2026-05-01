import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { springSnappy } from "@/features/premium/motion";

type ButtonTone = "honey" | "cyan" | "neutral" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
  icon?: ReactNode;
  active?: boolean;
}

const toneClassMap: Record<ButtonTone, string> = {
  honey:
    "border-amber-300/40 bg-gradient-to-br from-amber-300/28 via-amber-200/15 to-transparent text-amber-100 hover:shadow-[0_14px_40px_rgba(255,184,0,0.28)]",
  cyan:
    "border-sky-200/35 bg-gradient-to-br from-sky-300/22 via-cyan-200/12 to-transparent text-cyan-100 hover:shadow-[0_14px_40px_rgba(56,189,248,0.25)]",
  neutral:
    "border-white/20 bg-white/10 text-white hover:shadow-[0_14px_34px_rgba(15,23,42,0.36)] hover:bg-white/14",
  danger:
    "border-rose-200/30 bg-rose-400/18 text-rose-100 hover:shadow-[0_14px_34px_rgba(244,63,94,0.28)]",
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-[11px]",
  md: "h-11 px-4 text-xs",
  lg: "h-12 px-5 text-sm",
};

export function GlassButton({
  children,
  icon,
  tone = "neutral",
  size = "md",
  className = "",
  active = false,
  ...props
}: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={springSnappy}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-2xl border backdrop-blur-xl",
        "font-extrabold uppercase tracking-[0.16em] transition-all duration-300",
        toneClassMap[tone],
        sizeClassMap[size],
        active ? "ring-2 ring-white/35" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </motion.button>
  );
}
