import { Link } from "react-router-dom";
import { ExternalLink, Globe2, ShieldCheck } from "lucide-react";
import { DataList, GlassPanel, GlowCard, PageTransition, StatusPill } from "../components/experience";
import { featuredProfile, publicProfileSummary, walletCredentials } from "../data/experienceData";
import { downloadTextFile } from "../lib/utils";

export default function PublicProfilePage() {
  return (
    <PageTransition>
      <div className="stack-xl">
        <GlassPanel>
          <div className="hero-grid min-h-[280px]">
            <div>
              <p className="section-eyebrow">Public Credential Profile</p>
              <h1 className="section-title mt-4">{featuredProfile.name}</h1>
              <p className="section-description">Verified credential owner with public-ready academic, skill, and NFT-backed achievement records.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <StatusPill tone="emerald">Verified Holder</StatusPill>
                <StatusPill tone="cyan">Public Profile Enabled</StatusPill>
                <StatusPill tone="violet">On-Chain Owner</StatusPill>
              </div>
            </div>
            <GlowCard>
              <DataList items={publicProfileSummary} />
            </GlowCard>
          </div>
        </GlassPanel>

        <div className="cards-grid">
          {walletCredentials.map((credential) => (
            <GlowCard key={credential.id} className="credential-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">{credential.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--heading)]">{credential.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{credential.issuer}</p>
                </div>
                <StatusPill tone="emerald">Valid</StatusPill>
              </div>
              <div className="mt-6">
                <DataList
                  items={[
                    ["Credential ID", credential.id],
                    ["Date Issued", credential.dateIssued],
                    ["Verification Status", credential.verificationStatus],
                    ["NFT Badge", credential.nftBadge],
                  ]}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link className="button-secondary" to={`/verify?certId=${encodeURIComponent(credential.id)}`}>
                  <ShieldCheck className="h-4 w-4" />
                  Verify
                </Link>
                <button
                  className="button-secondary"
                  onClick={() => downloadTextFile(`${credential.id}-public-profile.txt`, `${credential.title}\n${credential.issuer}\n${credential.verificationStatus}`)}
                  type="button"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Document
                </button>
              </div>
            </GlowCard>
          ))}
        </div>

        <GlassPanel>
          <div className="flex items-center gap-3">
            <Globe2 className="h-5 w-5 text-[var(--accent-cyan)]" />
            <p className="text-[var(--muted)]">
              Public profiles let recruiters, institutions, and verifiers validate real achievement without email chains, screenshots, or unverifiable PDFs.
            </p>
          </div>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
