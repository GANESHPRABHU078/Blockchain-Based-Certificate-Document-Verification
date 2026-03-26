import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink, Eye, QrCode, Share2 } from "lucide-react";
import {
  DataList,
  EmptyState,
  GlassPanel,
  GlowCard,
  MetricTile,
  PageTransition,
  ShellSection,
  StatusPill,
} from "../components/experience";
import {
  emptyWalletMessage,
  featuredProfile,
  profileHighlights,
  walletCredentials,
  walletIdentityChips,
  walletMetrics,
  walletTabs,
} from "../data/experienceData";
import { copyToClipboard, downloadTextFile } from "../lib/utils";

export default function UserWalletPage() {
  const [activeTab, setActiveTab] = useState(walletTabs[0]);
  const [selectedCredential, setSelectedCredential] = useState(walletCredentials[0]);

  const visibleCredentials = useMemo(() => {
    if (activeTab === "All Credentials") return walletCredentials;
    return walletCredentials.filter((credential) => credential.category === activeTab);
  }, [activeTab]);

  const handleShare = async (credential) => {
    await copyToClipboard(`${window.location.origin}/verify?certId=${credential.id}`);
  };

  const handleDownload = (credential) => {
    downloadTextFile(
      `${credential.id}-verified-copy.txt`,
      `Credential: ${credential.title}\nIssuer: ${credential.issuer}\nVerification: ${credential.verificationStatus}\nWallet: ${credential.walletOwner}`
    );
  };

  return (
    <PageTransition>
      <div className="stack-xl">
        <section className="hero-grid">
          <GlassPanel>
            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="section-eyebrow">Prestige Student Credential Wallet</p>
                <h1 className="section-title mt-4">Your verified achievements in one secure profile.</h1>
                <p className="section-description">
                  View trusted credentials, ownership details, and share-ready proof from one wallet.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {walletIdentityChips.map((chip, index) => (
                    <StatusPill key={chip} tone={["emerald", "cyan", "violet", "amber"][index]}>
                      {chip}
                    </StatusPill>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/profile/${featuredProfile.slug}`} className="button-primary">Open Public Profile</Link>
                  <button className="button-secondary" onClick={() => handleShare(selectedCredential)} type="button">
                    Share Verified Credential
                  </button>
                  <button className="button-secondary" onClick={() => handleDownload(selectedCredential)} type="button">
                    Download Verified Copy
                  </button>
                </div>
              </div>

              <GlowCard className="min-w-[300px] max-w-[360px]">
                <div className="flex items-center gap-4">
                  <div className="avatar-chip h-16 w-16 rounded-[1.5rem] text-xl">AM</div>
                  <div>
                    <p className="text-2xl font-semibold text-[var(--heading)]">{featuredProfile.name}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{featuredProfile.wallet}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {profileHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="progress-row">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-[var(--accent-cyan)]" />
                          <span className="text-sm text-[var(--text)]">{item.label}</span>
                        </div>
                        <StatusPill tone="emerald">Live</StatusPill>
                      </div>
                    );
                  })}
                </div>
              </GlowCard>
            </div>
          </GlassPanel>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {walletMetrics.map((metric) => (
              <MetricTile key={metric.label} {...metric} />
            ))}
          </div>
        </section>

        <ShellSection
          eyebrow="Credential Library"
          title="Your credential library."
          description="Browse verified records with the trust details that matter most."
        >
          <div className="flex flex-wrap gap-3">
            {walletTabs.map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "button-primary" : "button-secondary"}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="cards-grid">
            {visibleCredentials.map((credential) => (
              <GlowCard key={credential.id} className="credential-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <StatusPill tone="cyan">{credential.category}</StatusPill>
                    <h3 className="mt-4 text-2xl font-semibold text-[var(--heading)]">{credential.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{credential.issuer}</p>
                  </div>
                  <StatusPill tone="violet">{credential.nftBadge}</StatusPill>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="data-item">
                    <p>Date Issued</p>
                    <strong>{credential.dateIssued}</strong>
                  </div>
                  <div className="data-item">
                    <p>Verification Status</p>
                    <strong>{credential.verificationStatus}</strong>
                  </div>
                  <div className="data-item">
                    <p>QR Access</p>
                    <strong>{credential.qrAccess}</strong>
                  </div>
                  <div className="data-item">
                    <p>Ownership Status</p>
                    <strong>{credential.ownership}</strong>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="progress-row">
                    <span>Blockchain hash snippet</span>
                    <span>{credential.hashSnippet}</span>
                  </div>
                  <div className="progress-row">
                    <span>Verification count</span>
                    <span>{credential.verificationCount}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <button className="button-secondary" onClick={() => setSelectedCredential(credential)} type="button">
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                  <button className="button-secondary" onClick={() => handleShare(credential)} type="button">
                    <Share2 className="h-4 w-4" />
                    Share Verified Credential
                  </button>
                  <Link className="button-secondary" to={`/verify?certId=${encodeURIComponent(credential.id)}`}>
                    <QrCode className="h-4 w-4" />
                    Open Public Verification
                  </Link>
                </div>
              </GlowCard>
            ))}
          </div>
        </ShellSection>

        <section className="split-grid">
          <GlassPanel>
            <p className="section-eyebrow">Credential Detail Experience</p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">{selectedCredential.title}</h3>
            <p className="mt-3 text-[var(--muted)]">Full record visibility for trust and portability.</p>
            <div className="mt-6">
              <DataList
                items={[
                  ["Credential ID", selectedCredential.id],
                  ["Credential Holder", featuredProfile.name],
                  ["Issued By", selectedCredential.issuer],
                  ["Category", selectedCredential.category],
                  ["Date Issued", selectedCredential.dateIssued],
                  ["Expiry Date", selectedCredential.expiryDate],
                  ["IPFS Hash", selectedCredential.ipfsHash],
                  ["Blockchain Transaction", selectedCredential.transaction],
                  ["Wallet Owner", selectedCredential.walletOwner],
                  ["Token ID", selectedCredential.tokenId],
                  ["Verification History", selectedCredential.verificationCount],
                  ["AI Integrity Score", selectedCredential.integrityScore],
                  ["Credential Notes", selectedCredential.notes],
                ]}
              />
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="section-eyebrow">Portfolio Actions</p>
            <div className="mt-6 grid gap-3">
              <button className="button-secondary w-full justify-between" onClick={() => handleShare(selectedCredential)} type="button">
                <span>Share Verified Credential</span>
                <Share2 className="h-4 w-4" />
              </button>
              <button className="button-secondary w-full justify-between" onClick={() => handleDownload(selectedCredential)} type="button">
                <span>Download Verified Copy</span>
                <Download className="h-4 w-4" />
              </button>
              <button className="button-secondary w-full justify-between" type="button">
                <span>View Blockchain Record</span>
                <ExternalLink className="h-4 w-4" />
              </button>
              <Link className="button-secondary w-full justify-between" to={`/verify?certId=${encodeURIComponent(selectedCredential.id)}`}>
                <span>Open Public Verification</span>
                <QrCode className="h-4 w-4" />
              </Link>
              <button
                className="button-primary w-full justify-between"
                onClick={() => downloadTextFile("credential-portfolio.txt", JSON.stringify(walletCredentials, null, 2))}
                type="button"
              >
                <span>Export Credential Portfolio</span>
                <Download className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-semibold text-[var(--heading)]">Public profile share card</p>
              <p className="mt-3 text-[var(--muted)]">
                Your verified achievements, unified in one secure profile.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusPill tone="emerald">Verified Holder</StatusPill>
                <StatusPill tone="cyan">Public Profile Enabled</StatusPill>
                <StatusPill tone="violet">NFT Credential Collector</StatusPill>
              </div>
            </div>
          </GlassPanel>
        </section>

        <EmptyState
          title="No credentials have been issued to this wallet yet."
          description={emptyWalletMessage}
          action={<Link to="/network" className="button-secondary">Explore trusted issuers</Link>}
        />
      </div>
    </PageTransition>
  );
}
