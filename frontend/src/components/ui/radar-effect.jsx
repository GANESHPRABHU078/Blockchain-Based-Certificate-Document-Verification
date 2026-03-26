"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const Circle = ({ className, idx = 0, ...rest }) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200/40",
        className
      )}
    />
  );
};

export const Radar = ({ className }) => {
  const circles = new Array(8).fill(1);

  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 10s linear infinite;
        }
      `}</style>
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[320px] items-end justify-center overflow-hidden bg-transparent sm:w-[400px]"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
      </div>
      {circles.map((_, idx) => (
        <Circle
          key={`circle-${idx}`}
          idx={idx}
          style={{
            height: `${(idx + 1) * 4}rem`,
            width: `${(idx + 1) * 4}rem`,
            border: `1px solid rgba(116, 243, 255, ${0.7 - idx * 0.07})`,
          }}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({ icon, text, delay = 0, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay }}
      className={twMerge(
        "relative z-50 flex flex-col items-center justify-center space-y-2",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] border border-cyan-200/10 bg-slate-950/90 shadow-inner shadow-cyan-400/10">
        {icon}
      </div>
      <div className="rounded-md px-2 py-1">
        <div className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
          {text}
        </div>
      </div>
    </motion.div>
  );
};
