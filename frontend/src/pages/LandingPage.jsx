import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  FileBadge2,
  Globe2,
  LockKeyhole,
  Quote,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  CTAInline,
  DataList,
  GlassPanel,
  GlowCard,
  GridDivider,
  HeroBadge,
  MetricTile,
  OrbitVisual,
  PageTransition,
  ShellSection,
  StatusPill,
} from "../components/experience";
import CredentialRadarSection from "../components/ui/credential-radar-section";
import DynamicBorderAnimationsCard from "../components/ui/dynamic-border-animations-card";
import {
  brand,
  coreInnovations,
  ecosystemCards,
  footerLinkGroups,
  heroOrbitIcons,
  heroSceneCards,
  landingHeroStats,
  landingQuotes,
  whyItMatters,
  workflowSteps,
} from "../data/experienceData";

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="stack-xl">
        <section className="hero-grid min-h-[calc(100vh-7rem)]">
          <div className="space-y-8">
            <HeroBadge>
              <Sparkles className="h-3.5 w-3.5" />
              Elite trust infrastructure for verified achievement
            </HeroBadge>

            <div className="space-y-6">
              <h1 className="hero-title">
                Trust, Anchored On-Chain.
                <span className="gradient block">The Future of Verified Achievement.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Issue, verify, and share credentials with wallet-linked, chain-backed proof.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/admin" className="button-primary">
                Launch Credential Network
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/verify" className="button-secondary">
                Verify a Credential
              </Link>
              <Link to="/network" className="button-ghost">
                Explore the Ecosystem
              </Link>
            </div>

            <div className="stats-grid">
              {landingHeroStats.map((item) => (
                <MetricTile key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="showcase-board">
              <OrbitVisual icons={heroOrbitIcons} />
              {heroSceneCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.16 + index * 0.12 }}
                    className={`showcase-poster ${
                      index === 0
                        ? "showcase-poster--primary"
                        : index === 1
                          ? "showcase-poster--secondary"
                          : "showcase-poster--tertiary"
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <StatusPill tone={card.tone}>{card.badge}</StatusPill>
                        <Icon className="h-5 w-5 text-[var(--accent-cyan)]" />
                      </div>
                      <div className="showcase-poster__media mt-5" />
                      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{card.subtitle}</p>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--heading)]">{card.title}</h3>
                      <div className="showcase-poster__grid">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="showcase-center-badge">
                <BadgeCheck className="h-14 w-14 text-[var(--accent-cyan)]" />
              </div>
            </div>
          </div>
        </section>

        <GridDivider />

        <ShellSection
          eyebrow="Why It Matters"
          title="A clear answer to fraud and broken trust."
          description="Faster trust with less manual work."
        >
          <div className="cards-grid">
            {whyItMatters.map((item) => (
              <GlowCard key={item.title} className="feature-card">
                <StatusPill tone="emerald">Trust Layer</StatusPill>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--heading)]">{item.title}</h3>
              </GlowCard>
            ))}
          </div>
        </ShellSection>

        <ShellSection
          eyebrow="Core Innovations"
          title="Core capabilities, shown with clarity."
          description="The essential platform capabilities."
        >
          <div className="cards-grid">
            {coreInnovations.map((feature) => {
              const Icon = feature.icon;
              return (
                <GlowCard key={feature.title} className="feature-card stack-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="brand-emblem h-14 w-14 rounded-[1.35rem]">
                      <div className="brand-emblem__core">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <StatusPill tone="violet">{feature.badge}</StatusPill>
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--heading)]">{feature.title}</h3>
                  <p className="font-medium text-[var(--accent-cyan)]">{feature.summary}</p>
                </GlowCard>
              );
            })}
          </div>
        </ShellSection>

        <ShellSection
          eyebrow="Verification Surface"
          title="A single visual for how the trust stack works together."
          description="Issuer identity, AI analysis, QR access, and chain-backed proof in one frame."
        >
          <CredentialRadarSection />
        </ShellSection>

        <ShellSection
          eyebrow="How It Works"
          title="From source file to trusted proof."
          description="Hash, store, anchor, verify."
        >
          <div className="grid gap-4 lg:grid-cols-6">
            {workflowSteps.map((item, index) => (
              <GlowCard key={item.step} className="feature-card">
                <StatusPill tone={index % 2 === 0 ? "cyan" : "violet"}>{item.step}</StatusPill>
                <h3 className="mt-4 text-xl font-semibold text-[var(--heading)]">{item.title}</h3>
              </GlowCard>
            ))}
          </div>
        </ShellSection>

        <ShellSection
          eyebrow="Ecosystem"
          title="One trust network, tailored to every participant."
          description="One network for every participant."
        >
          <div className="cards-grid">
            {ecosystemCards.map((card) => {
              const Icon = card.icon;
              return (
                <GlassPanel key={card.title}>
                  <div className="flex items-start gap-4">
                    <div className="brand-emblem h-12 w-12 rounded-[1.2rem]">
                      <div className="brand-emblem__core">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--heading)]">{card.title}</h3>
                      <p className="mt-2 font-medium text-[var(--accent-cyan)]">{card.value}</p>
                    </div>
                  </div>
                </GlassPanel>
              );
            })}
          </div>
        </ShellSection>

        <section className="split-grid">
          <GlassPanel>
            <p className="section-eyebrow">Trust Signals</p>
            <div className="visual-panel mt-5">
              <div className="metric-cluster">
                {[
                  ["Protected", "50K+"],
                  ["Scan Time", "<3s"],
                  ["Confidence", "99.9%"],
                ].map(([label, value]) => (
                  <div key={label} className="metric-chip">
                    <span className="text-sm text-[var(--muted)]">{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <div className="visual-ring visual-ring--c" />
              <div className="visual-ring visual-ring--b" />
              <div className="visual-ring visual-ring--a" />

              <div className="visual-core">
                <ShieldCheck className="h-10 w-10 text-[var(--accent-cyan)]" />
              </div>

              <div className="visual-card-stack">
                <div className="visual-float-card">
                  <div className="flex items-center justify-between">
                    <span className="hero-badge">AI Scan</span>
                    <Zap className="h-4 w-4 text-[var(--accent-cyan)]" />
                  </div>
                  <p className="mt-4 text-sm text-[var(--muted)]">Forgery checks, metadata review, and live match scoring.</p>
                </div>
                <div className="visual-float-card visual-float-card--offset">
                  <div className="flex items-center justify-between">
                    <span className="hero-badge">Ownership</span>
                    <LockKeyhole className="h-4 w-4 text-[var(--accent-emerald)]" />
                  </div>
                  <p className="mt-4 text-sm text-[var(--muted)]">Wallet-linked proof with chain-backed verification.</p>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="section-eyebrow">Credential Canvas</p>
            <div className="visual-panel mt-5">
              <div className="absolute left-6 top-6 max-w-[220px] rounded-[1.5rem] border border-white/10 bg-[rgba(10,16,35,0.74)] p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Credential Preview</p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--heading)]">B.Sc Computer Science</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">Nova Institute of Technology</p>
              </div>
              <div className="absolute right-6 top-8 rounded-[1.4rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <FileBadge2 className="h-14 w-14 text-[var(--accent-violet)]" />
              </div>
              <div className="absolute bottom-8 left-8 right-8 grid gap-4 md:grid-cols-2">
                {landingQuotes.map((quote) => (
                  <GlowCard key={quote}>
                    <div className="flex items-start gap-3">
                      <Quote className="mt-1 h-5 w-5 text-[var(--accent-violet)]" />
                      <p className="text-base leading-7 text-[var(--text)]">{quote}</p>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </GlassPanel>
        </section>

        <GlassPanel>
          <div className="hero-grid min-h-[360px]">
            <div className="space-y-5">
              <p className="section-eyebrow">Final Call To Action</p>
              <h2 className="section-title">Build a trust layer for the credential economy.</h2>
              <div className="flex flex-wrap gap-3">
                <Link to="/admin" className="button-primary">Launch Credential Network</Link>
                <Link to="/verify" className="button-secondary">Verify a Credential</Link>
              </div>
            </div>

            <DynamicBorderAnimationsCard />
          </div>
        </GlassPanel>

        <footer className="glass-panel">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="brand-emblem">
                  <div className="brand-emblem__core">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <p className="brand-name">{brand.uiName}</p>
                  <p className="brand-subtitle">{brand.projectName}</p>
                </div>
              </div>
              <p className="mt-4 max-w-md leading-7 text-[var(--muted)]">{brand.summary}</p>
            </div>

            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{group.title}</p>
                <div className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <p key={link} className="text-[var(--text)]">{link}</p>
                  ))}
                </div>
                <div className="mt-4">
                  <CTAInline to="/verify">Open verification portal</CTAInline>
                </div>
              </div>
            ))}

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Newsletter</p>
              <div className="input-shell mt-4">
                <input placeholder="Enter your work email" />
              </div>
              <a className="button-primary mt-4 w-full" href="mailto:contact@crednova.io?subject=CredNova%20Launch%20Updates">
                Get launch updates
              </a>
              <div className="mt-5">
                <DataList
                  items={[
                    ["Product Summary", "Flagship trust-tech frontend"],
                    ["Primary CTA", "Build a trust layer for the credential economy"],
                  ]}
                  columns={1}
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
