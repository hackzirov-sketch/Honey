import { motion } from "framer-motion";

export interface TypingIndicatorProps {
  label?: string;
}

const dotDelays = [0, 0.16, 0.32] as const;

export function TypingIndicator({ label = "typing..." }: TypingIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-1">
        {dotDelays.map((delay, idx) => (
          <motion.span
            key={`${label}-${idx}`}
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.95, delay }}
            className="h-1.5 w-1.5 rounded-full bg-sky-100"
          />
        ))}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">{label}</span>
    </div>
  );
}
