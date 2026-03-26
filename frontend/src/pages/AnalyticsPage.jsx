import { Activity, ShieldCheck } from "lucide-react";
import { DualTrendChart, GlassPanel, GlowCard, MetricTile, MiniBarChart, PageTransition, ShellSection, StatusPill } from "../components/experience";
import { analyticsInsightCards, analyticsStats, issuanceTrend, verificationTraffic } from "../data/experienceData";

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <div className="stack-xl">
        <ShellSection
          eyebrow="Analytics and Intelligence Layer"
          title="Network intelligence in one view."
          description="Track issuance growth, verification demand, top issuers, and AI risk trends."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {analyticsStats.map((item) => (
              <MetricTile key={item.label} {...item} />
            ))}
          </div>
        </ShellSection>

        <section className="split-grid">
          <GlassPanel>
            <p className="section-eyebrow">Total Issuance Growth</p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Credential creation momentum</h3>
            <div className="mt-8">
              <MiniBarChart data={issuanceTrend} />
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="section-eyebrow">Verification Requests by Day</p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Demand for proof across the week</h3>
            <div className="mt-8">
              <DualTrendChart data={verificationTraffic} />
            </div>
          </GlassPanel>
        </section>

        <section className="split-grid">
          <GlassPanel>
            <p className="section-eyebrow">Signal Heatmap</p>
            <div className="mt-6 space-y-5">
              <div className="mini-heatmap">
                {Array.from({ length: 18 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="metric-chip">
                  <span className="text-sm text-[var(--muted)]">Peak demand</span>
                  <strong>Fri</strong>
                </div>
                <div className="metric-chip">
                  <span className="text-sm text-[var(--muted)]">Risk queue</span>
                  <strong>12 files</strong>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="section-eyebrow">Insight Signals</p>
            <div className="mt-6 grid gap-4">
              {analyticsInsightCards.map((item, index) => (
                <GlowCard key={item}>
                  <div className="flex items-center justify-between gap-3">
                    <StatusPill tone={["cyan", "violet", "amber"][index]}>{index === 0 ? "Trend" : index === 1 ? "Leader" : "Alert"}</StatusPill>
                    {index === 2 ? <ShieldCheck className="h-5 w-5 text-[var(--accent-amber)]" /> : <Activity className="h-5 w-5 text-[var(--accent-cyan)]" />}
                  </div>
                  <p className="mt-4 text-xl font-semibold text-[var(--heading)]">{item}</p>
                </GlowCard>
              ))}
            </div>
          </GlassPanel>
        </section>
      </div>
    </PageTransition>
  );
}
