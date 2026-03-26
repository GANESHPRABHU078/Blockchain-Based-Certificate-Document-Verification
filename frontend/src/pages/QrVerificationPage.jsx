import { Camera, QrCode } from "lucide-react";
import { GlassPanel, GlowCard, PageTransition, ShellSection, StatusPill } from "../components/experience";
import { qrLiveSteps } from "../data/experienceData";

export default function QrVerificationPage() {
  return (
    <PageTransition>
      <div className="stack-xl">
        <ShellSection
          eyebrow="QR Verification"
          title="A dedicated scan experience for instant trust."
          description="This page creates a cinematic scan moment with a premium camera frame, animated scan line, and live verification stages."
        >
          <section className="split-grid">
            <GlassPanel>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Scan Frame</p>
                  <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Point the camera at any credential QR</h3>
                </div>
                <StatusPill tone="cyan">Camera ready</StatusPill>
              </div>
              <div className="scan-frame mt-6 p-6">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Camera className="h-4 w-4" />
                    Live QR intake
                  </div>
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/5">
                    <QrCode className="h-12 w-12 text-[var(--accent-cyan)]" />
                  </div>
                  <p className="text-center text-sm text-[var(--muted)]">Keep the QR centered until the blockchain record locks and the verification endpoint opens.</p>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel>
              <p className="section-eyebrow">Progressive Verification States</p>
              <div className="mt-6 space-y-3">
                {qrLiveSteps.map((step, index) => (
                  <GlowCard key={step}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[var(--text)]">{step}</span>
                      <StatusPill tone={index < 3 ? "emerald" : "cyan"}>{index < 3 ? "Complete" : "Active"}</StatusPill>
                    </div>
                  </GlowCard>
                ))}
              </div>
              <GlowCard className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-[var(--heading)]">Valid credential</h3>
                  <StatusPill tone="emerald">Blockchain record confirmed</StatusPill>
                </div>
                <p className="mt-3 text-[var(--muted)]">Proof anchored, ready to share. Public verification enabled. Ownership status verified.</p>
              </GlowCard>
            </GlassPanel>
          </section>
        </ShellSection>
      </div>
    </PageTransition>
  );
}
