import { useState } from "react";
import { GlassPanel, GlowCard, PageTransition, ShellSection, ToggleRow } from "../components/experience";
import { featuredProfile, settingsGroups } from "../data/experienceData";
import { downloadTextFile } from "../lib/utils";

const toggleFields = new Set([
  "Public Verification Enabled",
  "Auto-run AI Integrity Scan",
  "Email Alerts",
  "Dark Mode",
  "Light Mode",
]);

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <PageTransition>
      <div className="stack-xl">
        <ShellSection
          eyebrow="Settings, Security, and Integration Center"
          title="Controls for identity, verification, access, and integrations."
          description="Grouped panels keep advanced settings easier to scan and manage."
          actions={
            <>
              <button
                className="button-secondary"
                onClick={() => downloadTextFile("crednova-settings-export.txt", JSON.stringify(settingsGroups, null, 2))}
                type="button"
              >
                Export settings
              </button>
              <button className="button-primary" onClick={() => setSaved(true)} type="button">
                Save preferences
              </button>
            </>
          }
        >
          <div className="grid gap-5 xl:grid-cols-2">
            {settingsGroups.map((group) => {
              const Icon = group.icon;
              return (
                <GlassPanel key={group.title}>
                  <div className="flex items-center gap-3">
                    <div className="brand-emblem h-12 w-12 rounded-[1.2rem]">
                      <div className="brand-emblem__core">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <p className="section-eyebrow">{group.title}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {group.fields.map((field) => {
                      if (toggleFields.has(field)) {
                        return (
                          <ToggleRow
                            key={field}
                            label={field}
                            hint={`${field} can be managed per environment and issuer policy.`}
                            defaultChecked={field !== "Light Mode"}
                          />
                        );
                      }

                      return (
                        <label key={field}>
                          <span className="field-label">{field}</span>
                          <div className="input-shell">
                            <input
                              placeholder={
                                field === "Institution Name"
                                  ? "CredNova University Alliance"
                                  : field === "Contact Email"
                                    ? featuredProfile.contactEmail
                                    : field === "Official Wallet Address"
                                      ? featuredProfile.wallet
                                      : field === "Network Environment"
                                        ? "Sepolia / Mainnet staging"
                                        : field === "API Key"
                                          ? "crednova_live_****************"
                                          : field === "Webhook URL"
                                            ? "https://example.com/webhooks/crednova"
                                            : field === "Credential Visibility"
                                              ? "Public, private, or issuer-only"
                                              : field === "Authorized Issuer List"
                                                ? "Nova Institute, Axiom Learning, National Skills Authority"
                                                : field === "Admin Access Policy"
                                                  ? "Least privilege / approval required"
                                                  : field === "Review Queue Permissions"
                                                    ? "Compliance lead / issuer ops"
                                                    : field === "Signer Rotation"
                                                      ? "Every 90 days"
                                                      : field === "Session Timeout"
                                                        ? "30 minutes"
                                                        : "Configure value"
                              }
                            />
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </GlassPanel>
              );
            })}
          </div>
        </ShellSection>

        {saved ? (
          <GlassPanel>
            <p className="text-sm text-[var(--accent-emerald)]">
              Settings saved. Verification rules, automation, and issuer identity preferences updated.
            </p>
          </GlassPanel>
        ) : null}

        <GlassPanel>
          <p className="section-eyebrow">Control Surface</p>
          <div className="settings-visual mt-6">
            <div className="settings-visual__top">
              <div className="settings-visual__panel">
                <div className="absolute left-5 top-5 right-5 flex items-center justify-between rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-sm text-[var(--muted)]">Issuer identity</span>
                  <span className="text-sm font-semibold text-[var(--heading)]">{featuredProfile.wallet}</span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-[1rem] border border-white/10 bg-[rgba(5,10,24,0.68)] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Live policy</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--heading)]">Verification active</p>
                </div>
              </div>
              <div className="settings-visual__stack">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="settings-visual__bottom">
              <span />
              <span />
              <span />
            </div>
          </div>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
