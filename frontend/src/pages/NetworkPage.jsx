import { useMemo, useState } from "react";
import { Building2, Search } from "lucide-react";
import { DataList, GlassPanel, GlowCard, PageTransition, ShellSection, StatusPill } from "../components/experience";
import { institutionFilters, networkInstitutions, trustInsight } from "../data/experienceData";

const nodes = [
  { x: 14, y: 24 },
  { x: 42, y: 16 },
  { x: 76, y: 28 },
  { x: 64, y: 68 },
  { x: 34, y: 72 },
];

const lines = [
  { x: 14, y: 24, width: 31, rotate: -8 },
  { x: 42, y: 16, width: 33, rotate: 18 },
  { x: 42, y: 16, width: 38, rotate: 88 },
  { x: 34, y: 72, width: 30, rotate: -10 },
];

export default function NetworkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState(networkInstitutions[0]);

  const visibleInstitutions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return networkInstitutions.filter((institution) => {
      const matchesQuery =
        !normalizedQuery ||
        institution.name.toLowerCase().includes(normalizedQuery) ||
        institution.type.toLowerCase().includes(normalizedQuery);
      const matchesFilter = activeFilter === "All" || institution.type === activeFilter.slice(0, -1) || institution.type === activeFilter.slice(0, -2);
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);

  return (
    <PageTransition>
      <div className="stack-xl">
        <ShellSection
          eyebrow="Trusted Issuer Network"
          title="Explore the trusted issuer network."
          description="Search issuers, filter by type, and review trust signals in one place."
        >
          <div className="flex flex-wrap gap-3">
            <label className="search-field max-w-md">
              <Search className="h-4 w-4 text-[var(--muted)]" />
              <input
                placeholder="Search institutions, issuer type, blockchain status"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            {institutionFilters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "button-primary" : "button-secondary"}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="cards-grid">
            {visibleInstitutions.map((institution) => (
              <GlowCard key={institution.name} className="institution-card">
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-[1.3rem] bg-gradient-to-br ${institution.accent}`}>
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <StatusPill tone="emerald">{institution.blockchainStatus}</StatusPill>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-[var(--heading)]">{institution.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{institution.type}</p>
                <div className="mt-6">
                  <DataList
                    items={[
                      ["Credentials Issued", institution.credentialsIssued],
                      ["Verification Success Rate", institution.successRate],
                      ["Joined Since", institution.joinedSince],
                    ]}
                  />
                </div>
                <button className="button-secondary mt-6 w-full" onClick={() => setSelectedInstitution(institution)} type="button">
                  View Profile
                </button>
              </GlowCard>
            ))}
          </div>
        </ShellSection>

        <section className="split-grid">
          <GlassPanel>
            <p className="section-eyebrow">Network Graph Visualization</p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">Network activity at a glance</h3>
            <div className="network-map mt-6">
              {lines.map((line, index) => (
                <span
                  key={index}
                  className="network-map__line"
                  style={{
                    left: `${line.x}%`,
                    top: `${line.y}%`,
                    width: `${line.width}%`,
                    transform: `rotate(${line.rotate}deg)`,
                  }}
                />
              ))}
              {nodes.map((node, index) => (
                <span key={index} className="network-map__node" style={{ left: `${node.x}%`, top: `${node.y}%` }} />
              ))}
            </div>
            <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-[var(--muted)]">{trustInsight}</p>
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="section-eyebrow">Institution Profile Details</p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--heading)]">{selectedInstitution.name}</h3>
            <p className="mt-3 text-[var(--muted)]">Overview, blockchain identity, issued credentials, and trust score.</p>
            <div className="mt-6">
              <DataList
                items={[
                  ["Overview", selectedInstitution.type],
                  ["Blockchain Identity", selectedInstitution.wallet],
                  ["Issued Credentials", selectedInstitution.credentialsIssued],
                  ["Revoked Records", selectedInstitution.revokedRecords],
                  ["Verification Traffic", selectedInstitution.verificationTraffic],
                  ["Contact", "contact@crednova.io"],
                  ["Public Trust Score", selectedInstitution.trustScore],
                ]}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <StatusPill tone="cyan">Overview</StatusPill>
              <StatusPill tone="violet">Blockchain Identity</StatusPill>
              <StatusPill tone="emerald">Issued Credentials</StatusPill>
              <StatusPill tone="amber">Verification Traffic</StatusPill>
            </div>
          </GlassPanel>
        </section>
      </div>
    </PageTransition>
  );
}
