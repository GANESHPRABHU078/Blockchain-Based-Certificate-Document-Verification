import { Link } from "react-router-dom";
import { ArrowUpRight, Download, FileImage, QrCode, Sparkles } from "lucide-react";
import {
  AdminSidebar,
  DataList,
  DualTrendChart,
  GlassPanel,
  GlowCard,
  MetricTile,
  MiniBarChart,
  PageTransition,
  ShellSection,
  StatusPill,
  TableLike,
  ToggleRow,
  TopbarUtility,
} from "../components/experience";
import {
  adminBanners,
  adminSidebarLinks,
  adminStats,
  adminTopActions,
  adminWelcome,
  blockchainTransactions,
  categoryBreakdown,
  heatmapRows,
  issueFormFields,
  issuanceSummary,
  issuanceToggles,
  issuanceTrend,
  networkHealth,
  recentCredentials,
  registryColumns,
  verificationTraffic,
} from "../data/experienceData";
import { downloadTextFile } from "../lib/utils";

export default function AdminDashboardPage() {
  return (
    <PageTransition>
      <div className="grid gap-6 lg:grid-cols-[295px_minmax(0,1fr)]">
        <AdminSidebar links={adminSidebarLinks} />

        <div className="stack-xl">
          <TopbarUtility />

          <ShellSection
            eyebrow="Issuer Control Center"
            title={adminWelcome.title}
            description={adminWelcome.subtitle}
            actions={
              <>
                <button
                  className="button-secondary"
                  onClick={() => downloadTextFile("credential-registry-export.txt", JSON.stringify(recentCredentials, null, 2))}
                  type="button"
                >
                  Export Registry
                </button>
                <a className="button-primary" href="#issue">Ready for on-chain issuance</a>
              </>
            }
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {adminStats.map((stat) => (
                <MetricTile key={stat.label} {...stat} />
              ))}
            </div>
          </ShellSection>

          <GlassPanel>
            <div className="flex flex-wrap items-center gap-3">
              {adminTopActions.map((action, index) => (
                <StatusPill key={action} tone={["cyan", "violet", "emerald", "amber"][index]}>
                  {action}
                </StatusPill>
              ))}
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {adminBanners.map((item) => (
                <GlowCard key={item}>
                  <p className="text-lg font-semibold text-[var(--heading)]">{item}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">Proof anchored, ready to share.</p>
                </GlowCard>
              ))}
            </div>
          </GlassPanel>

          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <GlassPanel>
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-eyebrow">Issuance Trend Over Time</p>
                  <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Credential velocity across the network</h3>
                </div>
                <StatusPill tone="emerald">Network issuance rising</StatusPill>
              </div>
              <div className="mt-8">
                <MiniBarChart data={issuanceTrend} />
              </div>
            </GlassPanel>

            <GlassPanel>
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-eyebrow">Verification Traffic</p>
                  <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Demand for proof by day</h3>
                </div>
                <StatusPill tone="cyan">Verification endpoint active</StatusPill>
              </div>
              <div className="mt-8">
                <DualTrendChart data={verificationTraffic} />
              </div>
            </GlassPanel>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <GlassPanel>
              <p className="section-eyebrow">Credential Categories Breakdown</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {categoryBreakdown.map((item, index) => (
                  <GlowCard key={item.label}>
                    <div className="flex items-center justify-between">
                      <p className="text-[var(--text)]">{item.label}</p>
                      <StatusPill tone={["cyan", "violet", "emerald", "amber", "sky"][index]}>{item.value}</StatusPill>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel>
              <p className="section-eyebrow">Issuer Performance Heatmap</p>
              <div className="mt-6 space-y-3">
                {heatmapRows.map((row) => (
                  <div key={row.label} className="progress-row">
                    <div>
                      <p className="font-semibold text-[var(--text)]">{row.label}</p>
                      <p className="text-sm text-[var(--muted)]">Issuer identity verified</p>
                    </div>
                    <div className="min-w-[180px] flex-1">
                      <DualTrendChart data={[{ label: "Perf", primary: row.primary, secondary: row.secondary }]} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
            <GlassPanel id="issue">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Issue New Credential</p>
                  <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Ready for premium issuance</h3>
                  <p className="mt-3 max-w-3xl text-[var(--muted)]">
                    Grouped fields, helper text, AI scan controls, QR setup, and ownership mapping all live in one
                    flagship workspace for secure, elegant issuance.
                  </p>
                </div>
                <StatusPill tone="violet">Wallet signer online</StatusPill>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {issueFormFields.slice(0, 7).map((field) => (
                  <label key={field.label}>
                    <span className="field-label">{field.label}</span>
                    <div className="input-shell">
                      <input placeholder={field.placeholder} />
                    </div>
                    <p className="helper-copy">{field.helper}</p>
                  </label>
                ))}

                {issueFormFields.slice(7).map((field) => (
                  <label key={field.label} className="md:col-span-2">
                    <span className="field-label">{field.label}</span>
                    <div className="textarea-shell">
                      <textarea placeholder={field.placeholder} />
                    </div>
                    <p className="helper-copy">{field.helper}</p>
                  </label>
                ))}

                <div className="md:col-span-2">
                  <span className="field-label">Upload File</span>
                  <div className="dropzone">
                    <div className="flex items-center gap-4">
                      <div className="brand-emblem h-14 w-14 rounded-[1.25rem]">
                        <div className="brand-emblem__core">
                          <FileImage className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-[var(--heading)]">Drop certificate file here</p>
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          Supports PDF, signed image, and credential proof documents
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {issuanceToggles.map((item, index) => (
                  <ToggleRow
                    key={item}
                    label={item}
                    hint={
                      index === 0
                        ? "Public verification enabled through QR and credential ID."
                        : index === 1
                          ? "Mint as collectible or soulbound record."
                          : index === 2
                            ? "Expose live trust proof to the public portal."
                            : index === 3
                              ? "Run forensic analysis before anchoring."
                              : "Use for records without formal expiry."
                    }
                  />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="button-primary" type="button">Credential anchored successfully</button>
                <button className="button-secondary" type="button">Save as issuance draft</button>
              </div>
            </GlassPanel>

            <div className="stack-xl">
              <GlassPanel>
                <p className="section-eyebrow">Issuance Summary</p>
                <div className="mt-6 space-y-3">
                  {issuanceSummary.map(([label, value]) => (
                    <div key={label} className="progress-row">
                      <span className="text-[var(--muted)]">{label}</span>
                      <span className="text-right text-[var(--text)]">{value}</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel>
                <p className="section-eyebrow">Live QR Preview</p>
                <div className="scan-frame mt-5 flex items-center justify-center">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white p-6 text-slate-900 shadow-2xl">
                    <QrCode className="h-36 w-36" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--muted)]">Verification endpoint is now live. Scan beam and public route prepared.</p>
              </GlassPanel>

              <GlassPanel>
                <p className="section-eyebrow">Network Health</p>
                <div className="mt-5 space-y-3">
                  <div className="progress-row">
                    <span>{networkHealth.uptime}</span>
                    <StatusPill tone="emerald">Stable</StatusPill>
                  </div>
                  <div className="progress-row">
                    <span>{networkHealth.engine}</span>
                    <StatusPill tone="cyan">Operational</StatusPill>
                  </div>
                  <div className="progress-row">
                    <span>{networkHealth.anchor}</span>
                    <StatusPill tone="amber">Pending batch</StatusPill>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>

          <GlassPanel>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="section-eyebrow">Credential Registry</p>
                <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Premium registry surface</h3>
              </div>
              <Link className="button-secondary" to="/analytics">
                Open Analytics
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8">
              <TableLike
                columns={registryColumns}
                rows={recentCredentials.map((item) => [
                  <span key={`${item.id}-id`} className="font-semibold">{item.id}</span>,
                  <span key={`${item.id}-holder`}>{item.holder}</span>,
                  <span key={`${item.id}-type`}>{item.type}</span>,
                  <span key={`${item.id}-issuer`}>{item.issuer}</span>,
                  <span key={`${item.id}-issued`}>{item.issuedOn}</span>,
                  <StatusPill key={`${item.id}-verification`} tone="emerald">{item.verificationStatus}</StatusPill>,
                  <StatusPill key={`${item.id}-nft`} tone="violet">{item.nftStatus}</StatusPill>,
                  <StatusPill key={`${item.id}-risk`} tone={item.aiRisk === "Manual Review" ? "amber" : "cyan"}>{item.aiRisk}</StatusPill>,
                  <span key={`${item.id}-verifications`}>{item.verifications}</span>,
                  <div key={`${item.id}-actions`} className="flex flex-wrap gap-2">
                    <button className="button-secondary px-4 py-2" type="button">View</button>
                    <button className="button-secondary px-4 py-2" type="button">Share</button>
                    <button className="button-secondary px-4 py-2" type="button">Download</button>
                    <button className="button-secondary px-4 py-2" type="button">Revoke</button>
                    <button className="button-ghost px-0 py-2 text-[var(--accent-cyan)]" type="button">Open on Chain</button>
                  </div>,
                ])}
              />
            </div>
          </GlassPanel>

          <section className="split-grid">
            <GlassPanel>
              <p className="section-eyebrow">Recent Blockchain Transactions</p>
              <div className="mt-6 space-y-3">
                {blockchainTransactions.map((tx) => (
                  <GlowCard key={tx.hash}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[var(--text)]">{tx.hash}</p>
                      <StatusPill tone={tx.status === "Confirmed" ? "emerald" : "amber"}>{tx.status}</StatusPill>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="data-item">
                        <p>Gas</p>
                        <strong>{tx.gas}</strong>
                      </div>
                      <div className="data-item">
                        <p>Confirmation Time</p>
                        <strong>{tx.time}</strong>
                      </div>
                      <div className="data-item">
                        <p>Status Glow</p>
                        <strong>{tx.status}</strong>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel>
              <p className="section-eyebrow">Success State</p>
              <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Credential anchored successfully</h3>
              <p className="mt-3 text-[var(--muted)]">
                Verification endpoint is now live. Ownership record linked to wallet. AI scan complete. Blockchain
                record confirmed.
              </p>
              <div className="mt-6">
                <DataList
                  items={[
                    ["Credential ID", "CDN-2026-04012"],
                    ["Document Fingerprint", "0x18f2...9ac7"],
                    ["IPFS CID", "bafybeicrednova012"],
                    ["Blockchain Readiness", "Confirmed"],
                    ["NFT Mint Option", "Enabled"],
                  ]}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="button-primary" to="/verify">Open public verification</Link>
                <button className="button-secondary" type="button">
                  <Download className="h-4 w-4" />
                  Export issuance packet
                </button>
                <button className="button-secondary" type="button">
                  <Sparkles className="h-4 w-4" />
                  Open AI Integrity Lab
                </button>
              </div>
            </GlassPanel>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
