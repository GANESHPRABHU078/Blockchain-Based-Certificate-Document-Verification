import React, { useEffect, useRef } from "react";
import { BrainCircuit, FileSearch, QrCode, Wallet } from "lucide-react";

const cardFeatures = [
  {
    title: "AI Analysis",
    description: "Detect fake and tampered documents.",
    icon: BrainCircuit,
  },
  {
    title: "QR Verify",
    description: "Open public proof in seconds.",
    icon: QrCode,
  },
  {
    title: "Wallet Proof",
    description: "Link ownership to the holder.",
    icon: Wallet,
  },
  {
    title: "Fast Checks",
    description: "Verify records with one lookup.",
    icon: FileSearch,
  },
];

export default function DynamicBorderAnimationsCard() {
  const topRef = useRef(null);
  const rightRef = useRef(null);
  const bottomRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    let frameId = 0;

    const animateBorder = () => {
      const now = Date.now() / 1000;
      const speed = 0.5;

      const topX = Math.sin(now * speed) * 100;
      const rightY = Math.cos(now * speed) * 100;
      const bottomX = Math.sin(now * speed + Math.PI) * 100;
      const leftY = Math.cos(now * speed + Math.PI) * 100;

      if (topRef.current) topRef.current.style.transform = `translateX(${topX}%)`;
      if (rightRef.current) rightRef.current.style.transform = `translateY(${rightY}%)`;
      if (bottomRef.current) bottomRef.current.style.transform = `translateX(${bottomX}%)`;
      if (leftRef.current) leftRef.current.style.transform = `translateY(${leftY}%)`;

      frameId = requestAnimationFrame(animateBorder);
    };

    frameId = requestAnimationFrame(animateBorder);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,28,0.96),rgba(10,16,35,0.82))] p-8 shadow-2xl md:p-12">
      <div className="absolute left-0 top-0 h-0.5 w-full overflow-hidden">
        <div
          ref={topRef}
          className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
        />
      </div>

      <div className="absolute right-0 top-0 h-full w-0.5 overflow-hidden">
        <div
          ref={rightRef}
          className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-fuchsia-500/60 to-transparent"
        />
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden">
        <div
          ref={bottomRef}
          className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
        />
      </div>

      <div className="absolute left-0 top-0 h-full w-0.5 overflow-hidden">
        <div
          ref={leftRef}
          className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-fuchsia-500/60 to-transparent"
        />
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="text-white">Smarter Credential</span>{" "}
          <span className="bg-gradient-to-r from-orange-400 to-fuchsia-500 bg-clip-text text-transparent">
            Protection
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-300 md:text-base">
          AI checks, QR verification, wallet ownership, and NFT-style presentation in one trust layer.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {cardFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm transition-all hover:border-orange-500/30"
              >
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20">
                    <Icon className="h-5 w-5 text-orange-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="mt-8 rounded-xl bg-gradient-to-r from-orange-600 to-fuchsia-600 px-8 py-3 font-medium text-white transition-all hover:-translate-y-1 hover:from-orange-500 hover:to-fuchsia-500">
          Explore More
        </button>
      </div>

      <div className="absolute right-4 top-4 h-3 w-3 animate-pulse rounded-full bg-orange-500" />
      <div className="absolute bottom-4 left-4 h-3 w-3 animate-pulse rounded-full bg-fuchsia-500" />
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/10 blur-xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-xl" />
    </div>
  );
}
