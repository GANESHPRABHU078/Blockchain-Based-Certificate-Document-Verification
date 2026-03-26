import { AlertTriangle, Download, FileSearch2, Flag } from "lucide-react";
import { DataList, GlassPanel, GlowCard, PageTransition, RingScore, ShellSection, StatusPill } from "../components/experience";
import { aiMetrics, aiStages, aiSummaries } from "../data/experienceData";
import { downloadTextFile } from "../lib/utils";

export default function AIIntegrityPage() {
  return (
    <PageTransition>
      <div className="stack-xl">
        <ShellSection
          eyebrow="AI Integrity Lab"
          title="Forensic Document Intelligence"
          description="AI analysis for fake document detection, tampering checks, and authenticity scoring."
        >
          <section className="split-grid">
            <GlassPanel>
              <p className="section-eyebrow">Dramatic Upload Experience</p>
              <div className="dropzone mt-5">
                <p className="text-lg font-semibold text-[var(--heading)]">Drop credential for AI analysis</p>
                <p className="mt-2 text-sm text-[var(--muted)]">Animated scanner beam, metadata extraction, and source-linked comparison begin immediately.</p>
              </div>

              <div className="scan-frame mt-6 p-6">
                <div className="progress-stack">
                  {aiStages.map((step, index) => (
                    <div key={step} className="progress-row">
                      <span>{step}</span>
                      <StatusPill tone={index < 3 ? "emerald" : "cyan"}>{index < 3 ? "Complete" : "Running"}</StatusPill>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>

            <GlassPanel>
              <RingScore value="97.8%" label="Authenticity Score" caption="No suspicious modifications detected." />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {aiMetrics.map((metric) => (
                  <GlowCard key={metric.label}>
                    <p className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">{metric.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-[var(--heading)]">{metric.value}</p>
                    <StatusPill tone={metric.tone} className="mt-3">{metric.value}</StatusPill>
                  </GlowCard>
                ))}
              </div>
            </GlassPanel>
          </section>
        </ShellSection>

        <section className="split-grid">
          <GlassPanel>
            <p className="section-eyebrow">Summary Results</p>
            <div className="mt-6 space-y-3">
              {aiSummaries.map((summary, index) => (
                <GlowCard key={summary}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[var(--text)]">{summary}</span>
                    <StatusPill tone={["emerald", "amber", "rose", "violet"][index]}>{index === 0 ? "Authentic" : index === 1 ? "Low Risk" : index === 2 ? "High Risk" : "Suspicious"}</StatusPill>
                  </div>
                </GlowCard>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="section-eyebrow">Recommendation Panel</p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">AI scan complete</h3>
            <p className="mt-3 text-[var(--muted)]">
              Structural match is strong. Metadata consistency remains high. Signature pattern and source-linked
              version comparison indicate an authentic document with low tampering risk.
            </p>
            <div className="mt-6">
              <DataList
                items={[
                  ["Recommendation", "Accept as authentic"],
                  ["Tampering Risk", "Low Risk"],
                  ["Metadata Consistency", "99.1%"],
                  ["Source Match", "Blockchain-linked version confirmed"],
                  ["Confidence Level", "High"],
                  ["Integrity Marker", "Stable"],
                ]}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="button-primary"
                onClick={() => downloadTextFile("ai-analysis-report.txt", "AI scan complete\nRecommendation: Accept as authentic")}
                type="button"
              >
                <Download className="h-4 w-4" />
                Download Analysis Report
              </button>
              <button className="button-secondary" type="button">
                <FileSearch2 className="h-4 w-4" />
                Open Verification Record
              </button>
              <button className="button-secondary" type="button">
                <Flag className="h-4 w-4" />
                Flag for Manual Review
              </button>
            </div>
          </GlassPanel>
        </section>

        <GlassPanel>
          <div className="flex items-start gap-4">
            <div className="brand-emblem h-12 w-12 rounded-[1.2rem]">
              <div className="brand-emblem__core">
                <AlertTriangle className="h-5 w-5 text-[var(--accent-amber)]" />
              </div>
            </div>
            <div>
              <p className="section-eyebrow">Forensic Guidance</p>
              <p className="mt-4 text-[var(--muted)]">
                Use the AI lab when verification needs more than a hash match. It surfaces metadata inconsistency,
                structural drift, suspicious edits, and recommended next actions in one premium analysis surface.
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
