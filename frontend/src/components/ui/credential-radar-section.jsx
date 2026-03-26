"use client";

import {
  BadgeCheck,
  BrainCircuit,
  Building2,
  Network,
  QrCode,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { GlassPanel, StatusPill } from "../experience";
import { IconContainer, Radar } from "./radar-effect";

const radarCapabilities = [
  {
    text: "Issuer Trust",
    icon: Building2,
    delay: 0.15,
  },
  {
    text: "QR Validation",
    icon: QrCode,
    delay: 0.3,
  },
  {
    text: "AI Screening",
    icon: BrainCircuit,
    delay: 0.45,
  },
  {
    text: "On-chain Proof",
    icon: BadgeCheck,
    delay: 0.25,
  },
  {
    text: "Network Sync",
    icon: Network,
    delay: 0.4,
  },
  {
    text: "Live Scan",
    icon: ScanSearch,
    delay: 0.55,
  },
];

export default function CredentialRadarSection() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-5">
          <StatusPill tone="sky">Credential Radar</StatusPill>
          <h3 className="text-3xl font-semibold text-[var(--heading)] sm:text-4xl">
            Every trust signal converges into one live verification surface.
          </h3>
          <p className="max-w-2xl leading-8 text-[var(--muted)]">
            Institutions, AI integrity checks, QR scans, and blockchain confirmation all feed the same
            verification layer. The radar visual turns that product story into something users can read in seconds.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Explains the platform at a glance.",
              "No extra providers or state wiring required.",
              "Responsive layout keeps the radar centered on mobile and desktop.",
              "Lucide icons match the rest of the app.",
            ].map((item) => (
              <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-[var(--muted)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[32rem] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(116,243,255,0.14),transparent_38%),linear-gradient(180deg,rgba(4,12,28,0.95),rgba(5,8,22,0.78))] px-6 py-16">
          <div className="absolute inset-x-10 top-10 hidden items-center justify-between gap-4 md:flex">
            {radarCapabilities.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <IconContainer
                  key={item.text}
                  delay={item.delay}
                  text={item.text}
                  icon={<Icon className="h-7 w-7 text-[var(--accent-cyan)]" />}
                />
              );
            })}
          </div>

          <div className="absolute inset-x-16 bottom-10 hidden items-center justify-between gap-4 md:flex">
            {radarCapabilities.slice(3).map((item) => {
              const Icon = item.icon;
              return (
                <IconContainer
                  key={item.text}
                  delay={item.delay}
                  text={item.text}
                  icon={<Icon className="h-7 w-7 text-[var(--accent-emerald)]" />}
                />
              );
            })}
          </div>

          <div className="grid w-full gap-5 md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {radarCapabilities.slice(0, 4).map((item) => {
                const Icon = item.icon;
                return (
                  <IconContainer
                    key={item.text}
                    delay={item.delay}
                    text={item.text}
                    icon={<Icon className="h-6 w-6 text-[var(--accent-cyan)]" />}
                    className="space-y-1.5"
                  />
                );
              })}
            </div>
            <div className="mx-auto">
              <Radar className="scale-[0.72]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {radarCapabilities.slice(4).map((item) => {
                const Icon = item.icon;
                return (
                  <IconContainer
                    key={item.text}
                    delay={item.delay}
                    text={item.text}
                    icon={<Icon className="h-6 w-6 text-[var(--accent-emerald)]" />}
                    className="space-y-1.5"
                  />
                );
              })}
            </div>
          </div>

          <div className="hidden md:block">
            <Radar className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-50 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-cyan-300/20 bg-slate-950/95 shadow-[0_0_60px_rgba(116,243,255,0.12)]">
              <ShieldCheck className="h-10 w-10 text-[var(--accent-cyan)]" />
            </div>
          </div>

          <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        </div>
      </div>
    </GlassPanel>
  );
}
