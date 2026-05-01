import { useMemo } from "react";
import { motion } from "framer-motion";

export interface VoiceWaveProps {
  durationLabel: string;
  playing?: boolean;
  bars?: number;
}

export function VoiceWave({ durationLabel, playing = false, bars = 18 }: VoiceWaveProps) {
  const seeds = useMemo(
    () => Array.from({ length: bars }, (_, index) => 0.3 + ((index % 6) / 10)),
    [bars],
  );

  return (
    <div className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-xl">
      <div className="flex h-7 flex-1 items-center gap-[3px]">
        {seeds.map((seed, index) => (
          <motion.span
            key={`bar-${index}`}
            className="w-[3px] rounded-full bg-cyan-100/90"
            animate={
              playing
                ? {
                    height: [`${28 + seed * 30}%`, `${72 - seed * 18}%`, `${44 + seed * 26}%`],
                    opacity: [0.5, 1, 0.65],
                  }
                : { height: `${22 + seed * 18}%`, opacity: 0.4 }
            }
            transition={{
              repeat: playing ? Number.POSITIVE_INFINITY : 0,
              duration: 0.7 + (index % 4) * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{durationLabel}</span>
    </div>
  );
}
