import { ExternalLink, Share2 } from "lucide-react";
import { DataList, GlassPanel, GlowCard, PageTransition, ShellSection, StatusPill } from "../components/experience";
import { nftCards, nftExplainer } from "../data/experienceData";
import { copyToClipboard, downloadTextFile } from "../lib/utils";

export default function NftGalleryPage() {
  return (
    <PageTransition>
      <div className="stack-xl">
        <ShellSection
          eyebrow="Luxury NFT Credential Gallery"
          title="NFT-Style Certificate Display"
          description="A premium NFT-style view for verified, wallet-linked certificates."
        >
          <div className="cards-grid">
            {nftCards.map((card, index) => (
              <GlowCard key={card.tokenId} className="nft-card">
                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-4">
                  <div
                    className={`h-56 rounded-[1.35rem] bg-gradient-to-br ${
                      index === 0
                        ? "from-cyan-500/35 via-violet-500/20 to-emerald-400/30"
                        : index === 1
                          ? "from-fuchsia-500/30 via-violet-500/20 to-cyan-500/30"
                          : "from-amber-400/30 via-rose-500/20 to-violet-500/30"
                    }`}
                  />
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-[var(--heading)]">{card.title}</h3>
                <p className="mt-2 text-[var(--muted)]">{card.holderName} • {card.issuer}</p>

                <div className="mt-6">
                  <DataList
                    items={[
                      ["Minted On", card.mintedOn],
                      ["Token ID", card.tokenId],
                      ["Wallet Owner", card.walletOwner],
                      ["Verification Badge", card.verificationBadge],
                      ["Soulbound Status", card.soulboundStatus],
                    ]}
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {card.labels.map((label, badgeIndex) => (
                    <StatusPill key={label} tone={["violet", "emerald", "cyan", "amber", "sky"][badgeIndex] || "cyan"}>
                      {label}
                    </StatusPill>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    className="button-secondary"
                    onClick={() => downloadTextFile(`${card.tokenId.replace("#", "token-")}-metadata.json`, JSON.stringify(card, null, 2), "application/json")}
                    type="button"
                  >
                    View Metadata
                  </button>
                  <button className="button-secondary" onClick={() => window.open("https://sepolia.etherscan.io", "_blank")} type="button">
                    <ExternalLink className="h-4 w-4" />
                    Open on Blockchain
                  </button>
                  <button className="button-secondary" onClick={() => copyToClipboard(`${window.location.origin}/gallery`)} type="button">
                    <Share2 className="h-4 w-4" />
                    Share NFT Credential
                  </button>
                </div>
              </GlowCard>
            ))}
          </div>
        </ShellSection>

        <GlassPanel>
          <p className="section-eyebrow">NFT Credential Ownership</p>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--heading)]">Collectible presentation with cryptographic trust.</h3>
          <p className="mt-3 text-[var(--muted)]">{nftExplainer}</p>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
