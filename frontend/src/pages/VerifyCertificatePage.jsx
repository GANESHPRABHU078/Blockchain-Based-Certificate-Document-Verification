import { useMemo, useState } from "react";
import { AlertTriangle, Download, Search, ShieldCheck, UploadCloud } from "lucide-react";
import {
  DataList,
  GlassPanel,
  GlowCard,
  PageTransition,
  RingScore,
  ShellSection,
  StatusPill,
} from "../components/experience";
import {
  trustSeals,
  verificationModules,
  verificationProgress,
  verificationResultDetails,
  verificationStates,
} from "../data/experienceData";
import { downloadTextFile } from "../lib/utils";

export default function VerifyCertificatePage() {
  const [searchValue, setSearchValue] = useState("CDN-2026-04012");
  const [activeModule, setActiveModule] = useState("Verify by ID");

  const result = useMemo(() => {
    const value = searchValue.toUpperCase();
    if (value.includes("REV")) return verificationStates.revoked;
    if (value.includes("BAD") || value.includes("INV")) return verificationStates.invalid;
    if (value.includes("RISK") || value.includes("SUS")) return verificationStates.suspicious;
    return verificationStates.valid;
  }, [searchValue]);

  return (
    <PageTransition>
      <div className="stack-xl">
        <ShellSection
          eyebrow="Advanced Public Verification Portal"
          title="Verify Any Credential Instantly"
          description="Search by credential ID, upload a file, or scan a QR code to validate authenticity against the blockchain record."
        >
          <div className="cards-grid">
            {verificationModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <GlowCard key={module.title} className="feature-card">
                  <div className="brand-emblem h-14 w-14 rounded-[1.35rem]">
                    <div className="brand-emblem__core">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-[var(--heading)]">{module.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">{module.description}</p>
                  <button
                    className={activeModule === module.title ? "button-primary mt-6 w-full" : "button-secondary mt-6 w-full"}
                    onClick={() => setActiveModule(module.title)}
                    type="button"
                  >
                    {module.cta}
                  </button>
                </GlowCard>
              );
            })}
          </div>
        </ShellSection>

        <section className="split-grid">
          <GlassPanel>
            <p className="section-eyebrow">Verification Inputs</p>
            <div className="mt-5 space-y-5">
              <label>
                <span className="field-label">Verify by ID</span>
                <div className="input-shell">
                  <Search className="h-4 w-4 text-[var(--muted)]" />
                  <input
                    placeholder="Enter credential ID"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                  />
                </div>
              </label>

              <div>
                <span className="field-label">Upload for Comparison</span>
                <div className="dropzone">
                  <div className="flex items-center gap-4">
                    <div className="brand-emblem h-14 w-14 rounded-[1.25rem]">
                      <div className="brand-emblem__core">
                        <UploadCloud className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[var(--heading)]">Upload certificate or official document</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">Run authenticity check against the blockchain-linked source.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="field-label">Scan QR Code</span>
                <div className="scan-frame p-6">
                  <div className="flex h-full flex-col justify-between">
                    <p className="text-lg font-semibold text-[var(--heading)]">Scan and Open</p>
                    <p className="text-sm text-[var(--muted)]">
                      Position a printed certificate or digital proof inside the frame to open a live verification endpoint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-eyebrow">Verification Result</p>
                <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">{result.label}</h3>
              </div>
              <StatusPill tone={result.tone}>{result.tone === "emerald" ? "Proof you can trust" : "Review required"}</StatusPill>
            </div>

            <p className="mt-4 text-[var(--muted)]">{result.message}</p>

            <div className="mt-6">
              <DataList
                items={[
                  ["Credential ID", searchValue],
                  ...verificationResultDetails,
                ]}
              />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
              <RingScore value={result.tone === "rose" ? "41.2%" : result.tone === "amber" ? "78.4%" : result.tone === "violet" ? "63.9%" : "97.8%"} label="AI Integrity Score" caption="AI scan complete" />
              <GlowCard>
                <p className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">Downloadable verification report</p>
                <p className="mt-3 leading-7 text-[var(--muted)]">
                  Export a polished verification report with credential metadata, chain proof, IPFS reference, NFT status, issuer confirmation, and verification timestamp.
                </p>
                <button
                  className="button-secondary mt-5"
                  onClick={() =>
                    downloadTextFile(
                      `${searchValue.toLowerCase()}-verification-report.txt`,
                      `Status: ${result.label}\nMessage: ${result.message}\nCredential ID: ${searchValue}`
                    )
                  }
                  type="button"
                >
                  <Download className="h-4 w-4" />
                  Download Analysis Report
                </button>
              </GlowCard>
            </div>
          </GlassPanel>
        </section>

        <section className="split-grid">
          <GlassPanel>
            <p className="section-eyebrow">Verification Progress Interface</p>
            <div className="progress-stack mt-6">
              {verificationProgress.map((step, index) => (
                <div key={step} className="progress-row">
                  <span>{step}</span>
                  <StatusPill tone={index < 4 ? "emerald" : "cyan"}>{index < 4 ? "Complete" : "Finalizing"}</StatusPill>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="section-eyebrow">Trust Seal Area</p>
            <div className="mt-6 grid gap-3">
              {trustSeals.map((seal, index) => (
                <GlowCard key={seal}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-[var(--accent-cyan)]" />
                      <span className="text-[var(--text)]">{seal}</span>
                    </div>
                    <StatusPill tone={["emerald", "cyan", "violet"][index]}>{index === 0 ? "Verified" : "Active"}</StatusPill>
                  </div>
                </GlowCard>
              ))}
            </div>
          </GlassPanel>
        </section>

        <GlassPanel>
          <div className="flex items-start gap-4">
            <div className="brand-emblem h-12 w-12 rounded-[1.2rem]">
              <div className="brand-emblem__core">
                <AlertTriangle className="h-5 w-5 text-[var(--accent-rose)]" />
              </div>
            </div>
            <div>
              <p className="section-eyebrow">Tampering Alert Strip</p>
              <h3 className="mt-4 text-2xl font-semibold text-[var(--heading)]">Tampering risk elevated</h3>
              <p className="mt-3 text-[var(--muted)]">
                Potential manipulation detected. Manual review is recommended when the uploaded file no longer matches the original cryptographic fingerprint.
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
