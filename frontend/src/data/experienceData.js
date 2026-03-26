import {
  Activity,
  BadgeCheck,
  Bell,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CheckCheck,
  CircleDashed,
  FileBadge2,
  FileCheck2,
  Fingerprint,
  Globe2,
  GraduationCap,
  HandCoins,
  IdCard,
  Landmark,
  LayoutDashboard,
  Medal,
  Network,
  Orbit,
  QrCode,
  ScanSearch,
  ScrollText,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRoundCheck,
  Wallet,
} from "lucide-react";

export const brand = {
  uiName: "CredNova",
  projectName: "Decentralized Digital Credential Network",
  tagline: "Trust, Anchored On-Chain",
  summary: "Blockchain-powered credential issuance, fake document detection with AI analysis, and NFT-style certificate display.",
};

export const featuredProfile = {
  name: "Aarav Mehta",
  wallet: "0x4D9b...A812",
  slug: "aarav-mehta",
  initials: "AM",
  contactEmail: "contact@crednova.io",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/network", label: "Network" },
  { href: "/wallet", label: "Credentials" },
  { href: "/verify", label: "Verify" },
  { href: "/ai", label: "AI Scanner" },
  { href: "/gallery", label: "NFT Gallery" },
  { href: "/admin", label: "Institutions" },
  { href: "/settings", label: "Contact" },
];

export const heroOrbitIcons = [ShieldCheck, QrCode, Wallet, Building2, BrainCircuit, BadgeCheck];

export const landingHeroStats = [
  { label: "Credentials Protected", value: "50,000+", delta: "Real-Time Trust Layer", tone: "cyan" },
  { label: "Trusted Issuers", value: "500+", delta: "Global Issuer Graph", tone: "violet" },
  { label: "Verification Confidence", value: "99.9%", delta: "AI + Chain Match", tone: "emerald" },
  { label: "QR Validation", value: "Live", delta: "Instant Public Proof", tone: "amber" },
];

export const heroSceneCards = [
  {
    title: "Own Credentials. Prove Instantly. Trust Globally.",
    subtitle: "Wallet-linked proof",
    badge: "On-Chain",
    tone: "cyan",
    icon: Wallet,
    detail: "Ownership record linked to wallet with public verification enabled.",
  },
  {
    title: "Where Academic Trust Meets Blockchain Intelligence",
    subtitle: "AI scanner online",
    badge: "AI Powered",
    tone: "violet",
    icon: BrainCircuit,
    detail: "Tampering patterns, metadata drift, and structural edits surfaced in one forensic pane.",
  },
  {
    title: "The Future of Verified Achievement",
    subtitle: "Institution network",
    badge: "Tamper-Proof",
    tone: "emerald",
    icon: Building2,
    detail: "Multi-institution issuance, NFT credential minting, QR proof, and programmable trust.",
  },
];

export const whyItMatters = [
  {
    title: "Fraud loses its hiding place",
    copy: "Manual checks create delay and uncertainty. CredNova replaces them with cryptographic proof and clear issuer visibility.",
  },
  {
    title: "Digital achievement becomes owned capital",
    copy: "Credentials stop being static PDFs. They become portable, wallet-owned records that travel with the holder.",
  },
  {
    title: "Trust scales without human bottlenecks",
    copy: "Verification becomes a programmable layer for hiring, admissions, and audit workflows.",
  },
];

export const coreInnovations = [
  {
    icon: QrCode,
    title: "QR Certificate Verification",
    summary: "Scan once. Validate instantly.",
    description: "Every certificate can expose a live verification endpoint with issuer confirmation, blockchain match, and verification timestamp.",
    badge: "Real-Time",
  },
  {
    icon: Wallet,
    title: "Digital Credential Wallet",
    summary: "A premium home for verified achievement.",
    description: "Students and professionals hold degrees, certifications, awards, and government records in a wallet-linked, portfolio-grade profile.",
    badge: "On-Chain",
  },
  {
    icon: Network,
    title: "Multi-Institution Network",
    summary: "Shared trust across many issuers.",
    description: "Universities, companies, public authorities, and training platforms issue into one auditable credential network.",
    badge: "Tamper-Proof",
  },
  {
    icon: IdCard,
    title: "NFT-Style Certificate Display",
    summary: "Verified achievement with a premium NFT-style presentation.",
    description: "Show certificates as collectible-style, wallet-friendly proof while preserving issuer trust.",
    badge: "Soulbound",
  },
  {
    icon: BrainCircuit,
    title: "AI Fake Document Detection",
    summary: "AI analysis flags forged or suspicious files before trust is granted.",
    description: "Detect metadata inconsistencies, suspicious edits, and layout deviations against the source-linked version.",
    badge: "AI Powered",
  },
];

export const workflowSteps = [
  {
    step: "Upload",
    title: "Upload source credential",
    description: "Drop the official file into a guided issuance workspace built for precision.",
  },
  {
    step: "Fingerprint",
    title: "Generate document fingerprint",
    description: "A cryptographic hash is created from the exact source document to lock its integrity.",
  },
  {
    step: "Store on IPFS",
    title: "Store on IPFS",
    description: "The signed source record is preserved with decentralized availability and retrieval.",
  },
  {
    step: "Anchor to Blockchain",
    title: "Anchor to blockchain",
    description: "An immutable proof entry is committed on-chain for public verification and auditability.",
  },
  {
    step: "Mint Credential",
    title: "Mint wallet-linked credential",
    description: "Optionally mint an NFT credential and connect ownership to the candidate wallet address.",
  },
  {
    step: "Verify Anywhere",
    title: "Verify anywhere",
    description: "Use ID, QR, wallet profile, or file comparison to confirm authenticity in seconds.",
  },
];

export const ecosystemCards = [
  {
    title: "Students",
    icon: GraduationCap,
    value: "Portable proof of achievement",
    description: "Own degrees, certifications, internships, and awards in one trusted, shareable credential wallet.",
  },
  {
    title: "Institutions",
    icon: Building2,
    value: "Programmable issuance at scale",
    description: "Replace fragmented manual workflows with on-chain issuance, QR delivery, and AI-assisted integrity controls.",
  },
  {
    title: "Recruiters",
    icon: BriefcaseBusiness,
    value: "Decision-ready verification",
    description: "Validate a candidate instantly with direct evidence instead of unverifiable screenshots or email chains.",
  },
  {
    title: "Public Authorities",
    icon: Landmark,
    value: "Auditable trust infrastructure",
    description: "Build transparent credential ecosystems for licensing, scholarships, public services, and regulated certification.",
  },
];

export const landingQuotes = [
  "Designed for the future of trusted digital achievement.",
  "From issuance to verification, every credential becomes cryptographic proof.",
];

export const footerLinkGroups = [
  { title: "Platform", links: ["Launch Credential Network", "Verify a Credential", "Trusted Issuer Network", "NFT Credential Gallery"] },
  { title: "Resources", links: ["API Access", "Developer Docs", "System Status", "Security"] },
  { title: "Follow", links: ["LinkedIn", "X", "GitHub", "Product Updates"] },
];

export const adminSidebarLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin#issue", label: "Issue Credential", icon: ScrollText },
  { href: "/admin#registry", label: "Credential Registry", icon: FileBadge2 },
  { href: "/verify", label: "Verification Requests", icon: ScanSearch },
  { href: "/gallery", label: "NFT Credentials", icon: IdCard },
  { href: "/ai", label: "AI Integrity Lab", icon: BrainCircuit },
  { href: "/network", label: "Institutions", icon: Building2 },
  { href: "/analytics", label: "Analytics", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export const adminTopActions = [
  "Issue credential",
  "Export registry",
  "Sync blockchain",
  "Open AI integrity lab",
];

export const adminStats = [
  { label: "Total Credentials Anchored", value: "52,844", delta: "+12.4% MoM", tone: "cyan" },
  { label: "Active Credentials", value: "51,992", delta: "Blockchain record confirmed", tone: "emerald" },
  { label: "Revoked Records", value: "184", delta: "Policy-enforced removals", tone: "rose" },
  { label: "Verification Requests Today", value: "8,412", delta: "Proof demand elevated", tone: "amber" },
  { label: "NFT Credentials Minted", value: "17,204", delta: "Soulbound-first collection", tone: "violet" },
  { label: "AI Risk Flags", value: "12", delta: "Manual review queue", tone: "sky" },
  { label: "Network Institutions", value: "538", delta: "Trusted issuer network", tone: "cyan" },
  { label: "Verification Success Rate", value: "99.92%", delta: "Verification endpoint active", tone: "emerald" },
];

export const issuanceTrend = [
  { label: "Jan", value: 34 },
  { label: "Feb", value: 42 },
  { label: "Mar", value: 48 },
  { label: "Apr", value: 57 },
  { label: "May", value: 61 },
  { label: "Jun", value: 68 },
  { label: "Jul", value: 76 },
];

export const verificationTraffic = [
  { label: "Mon", primary: 58, secondary: 40 },
  { label: "Tue", primary: 74, secondary: 48 },
  { label: "Wed", primary: 78, secondary: 52 },
  { label: "Thu", primary: 86, secondary: 60 },
  { label: "Fri", primary: 94, secondary: 64 },
  { label: "Sat", primary: 62, secondary: 38 },
  { label: "Sun", primary: 48, secondary: 30 },
];

export const categoryBreakdown = [
  { label: "Degrees", value: "38%" },
  { label: "Certifications", value: "27%" },
  { label: "Internships", value: "14%" },
  { label: "Awards", value: "11%" },
  { label: "Government Documents", value: "10%" },
];

export const heatmapRows = [
  { label: "Nova Institute", primary: 92, secondary: 64 },
  { label: "Axiom University", primary: 80, secondary: 58 },
  { label: "CipherGrid", primary: 71, secondary: 50 },
  { label: "National Skills Authority", primary: 96, secondary: 70 },
];

export const issueFormFields = [
  { label: "Student Full Name", placeholder: "Enter the legal name", helper: "Use the exact name printed on the credential." },
  { label: "Credential Title", placeholder: "Enter credential title", helper: "Match the official title on the issued document." },
  { label: "Credential Type", placeholder: "Degree, Certification, Internship, Award, Skill Badge", helper: "Choose the format that best represents the official achievement." },
  { label: "Issuing Institution", placeholder: "Nova Institute of Technology", helper: "This issuer identity will appear in the public verification record." },
  { label: "Issue Date", placeholder: "YYYY-MM-DD", helper: "The issuance date will be included in the immutable record." },
  { label: "Expiry Date", placeholder: "Leave blank for permanent credentials", helper: "Only use an expiry date when the credential has a formal validity limit." },
  { label: "Candidate Wallet Address", placeholder: "0x...", helper: "This wallet will receive ownership of the credential." },
  { label: "Credential Description", placeholder: "Describe honors, specialization, accreditation, or cohort context.", helper: "A refined description improves public trust and portfolio presentation." },
  { label: "Supporting Metadata", placeholder: "Program code, GPA honors, skill map, accreditation tags", helper: "Attach structured metadata for AI scan context and portfolio filtering." },
];

export const issuanceToggles = [
  "Generate QR Verification",
  "Mint as NFT Credential",
  "Enable Public Verification",
  "Run AI Integrity Scan",
  "Mark as Permanent Credential",
];

export const issuanceSummary = [
  ["Preview Thumbnail", "Bachelor of Computer Science / premium blue seal"],
  ["Document Fingerprint", "0x18f2...9ac7"],
  ["IPFS Upload Status", "Pinned and replicated"],
  ["Blockchain Readiness", "Ready for anchor window"],
  ["NFT Mint Option", "Soulbound credential available"],
];

export const registryColumns = [
  "Credential ID",
  "Holder",
  "Type",
  "Issuer",
  "Issued On",
  "Verification Status",
  "NFT Status",
  "AI Risk",
  "Verifications",
  "Actions",
];

export const recentCredentials = [
  {
    id: "CDN-2026-04012",
    holder: featuredProfile.name,
    type: "Degree",
    issuer: "Nova Institute of Technology",
    title: "Bachelor of Computer Science",
    issuedOn: "March 18, 2026",
    verificationStatus: "Verification endpoint active",
    nftStatus: "Minted",
    aiRisk: "Low Risk",
    verifications: "142",
  },
  {
    id: "CDN-2026-03997",
    holder: "Maya Fernandes",
    type: "Certification",
    issuer: "Axiom Learning Network",
    title: "Applied AI Systems Certification",
    issuedOn: "March 17, 2026",
    verificationStatus: "Blockchain record confirmed",
    nftStatus: "Soulbound queued",
    aiRisk: "Authentic",
    verifications: "96",
  },
  {
    id: "CDN-2026-03941",
    holder: "Rohan Iyer",
    type: "Internship",
    issuer: "Synapse Innovation Lab",
    title: "Trust Engineering Internship",
    issuedOn: "March 16, 2026",
    verificationStatus: "Public verification enabled",
    nftStatus: "Not Minted",
    aiRisk: "Manual Review",
    verifications: "38",
  },
];

export const blockchainTransactions = [
  { hash: "0x9ab3...72fe", gas: "0.0032 ETH", time: "18 sec", status: "Confirmed" },
  { hash: "0x2f11...9cd2", gas: "0.0029 ETH", time: "54 sec", status: "Confirmed" },
  { hash: "0x7be2...19aa", gas: "0.0035 ETH", time: "2 min 11 sec", status: "Indexing" },
];

export const networkHealth = {
  uptime: "99.998% network uptime",
  engine: "Verification engine healthy",
  anchor: "Next anchor batch closes in 02m 41s",
};

export const walletMetrics = [
  { label: "Total Credentials", value: "12", delta: "Portfolio live", tone: "cyan" },
  { label: "Verified Achievements", value: "11", delta: "This credential is trusted by design", tone: "emerald" },
  { label: "NFT Credentials", value: "5", delta: "Collector profile active", tone: "violet" },
  { label: "Public Views", value: "1,284", delta: "Recruiter traffic rising", tone: "amber" },
  { label: "Institutions Connected", value: "4", delta: "Issuer identity verified", tone: "sky" },
];

export const walletIdentityChips = ["Verified Holder", "On-Chain Owner", "NFT Credential Collector", "Public Profile Enabled"];

export const walletTabs = [
  "All Credentials",
  "Degrees",
  "Certifications",
  "Internships",
  "Awards",
  "Skill Badges",
  "Government Documents",
];

export const walletCredentials = [
  {
    id: "CDN-2026-04012",
    title: "Bachelor of Computer Science",
    issuer: "Nova Institute of Technology",
    category: "Degrees",
    dateIssued: "March 18, 2026",
    expiryDate: "Permanent",
    verificationStatus: "Blockchain record confirmed",
    nftBadge: "Minted",
    qrAccess: "QR access active",
    hashSnippet: "0x18f2...9ac7",
    verificationCount: "143 verifications",
    ownership: "Ownership linked",
    ipfsHash: "bafybeicrednova012",
    transaction: "0x9ab3...72fe",
    walletOwner: featuredProfile.wallet,
    tokenId: "#44012",
    integrityScore: "98.8%",
    notes: "Graduated with distinction and blockchain systems concentration.",
  },
  {
    id: "CDN-2026-03862",
    title: "Applied AI Systems Certification",
    issuer: "Axiom Learning Network",
    category: "Certifications",
    dateIssued: "February 02, 2026",
    expiryDate: "February 02, 2029",
    verificationStatus: "Public verification enabled",
    nftBadge: "Soulbound",
    qrAccess: "QR access active",
    hashSnippet: "0x83cc...2fa9",
    verificationCount: "88 verifications",
    ownership: "Wallet owner verified",
    ipfsHash: "bafybeicrednova038",
    transaction: "0x6ce2...91bf",
    walletOwner: featuredProfile.wallet,
    tokenId: "#39811",
    integrityScore: "97.2%",
    notes: "Advanced credential with verified capstone submission.",
  },
  {
    id: "CDN-2025-09142",
    title: "Trust Engineering Internship",
    issuer: "Synapse Innovation Lab",
    category: "Internships",
    dateIssued: "November 24, 2025",
    expiryDate: "Permanent",
    verificationStatus: "Credential ownership linked",
    nftBadge: "Not Minted",
    qrAccess: "QR access active",
    hashSnippet: "0xa2fd...cc41",
    verificationCount: "41 verifications",
    ownership: "Public profile linked",
    ipfsHash: "bafybeicrednova091",
    transaction: "0x41bd...7ca2",
    walletOwner: featuredProfile.wallet,
    tokenId: "Not minted",
    integrityScore: "96.4%",
    notes: "Issued after successful completion of on-chain analytics project work.",
  },
];

export const profileHighlights = [
  { icon: UserRoundCheck, label: "Verified holder with public profile enabled" },
  { icon: Trophy, label: "5 NFT-backed achievements collected" },
  { icon: HandCoins, label: "4 issuers connected to one wallet identity" },
];

export const verificationModules = [
  {
    title: "Verify by ID",
    description: "Search a blockchain-linked record using a credential ID.",
    placeholder: "Enter credential ID",
    cta: "Verify Now",
    icon: FileCheck2,
  },
  {
    title: "Upload for Comparison",
    description: "Compare an uploaded certificate against the original cryptographic fingerprint.",
    placeholder: "Upload certificate or official document",
    cta: "Run Authenticity Check",
    icon: Binary,
  },
  {
    title: "Scan QR Code",
    description: "Open the credential verification endpoint directly from a QR proof layer.",
    placeholder: "Scan and open",
    cta: "Scan and Open",
    icon: QrCode,
  },
];

export const verificationProgress = [
  "Hashing document",
  "Querying blockchain",
  "Checking IPFS record",
  "Running AI integrity analysis",
  "Finalizing result",
];

export const verificationStates = {
  valid: {
    label: "Valid Credential",
    message: "This credential is authentic and matches the blockchain record.",
    tone: "emerald",
  },
  invalid: {
    label: "Invalid Credential",
    message: "The uploaded file does not match the original cryptographic fingerprint.",
    tone: "rose",
  },
  revoked: {
    label: "Revoked Credential",
    message: "This credential exists, but has been revoked by the issuer.",
    tone: "amber",
  },
  suspicious: {
    label: "Suspicious Document",
    message: "Potential manipulation detected. Manual review is recommended.",
    tone: "violet",
  },
};

export const trustSeals = ["Cryptographically Verified", "Anchored On-Chain", "Issuer Confirmed"];

export const institutionFilters = ["All", "Universities", "Companies", "Training Platforms", "Government Bodies", "Certification Authorities"];

export const networkInstitutions = [
  {
    name: "Nova Institute of Technology",
    type: "University",
    credentialsIssued: "8,420",
    successRate: "99.8%",
    blockchainStatus: "Active node",
    joinedSince: "January 2024",
    trustScore: "98.9",
    revokedRecords: "9",
    verificationTraffic: "34,281 monthly checks",
    wallet: "0x92Af...1d33",
    accent: "from-cyan-400/70 via-sky-500/40 to-blue-500/20",
  },
  {
    name: "CredAxis Enterprise Academy",
    type: "Company",
    credentialsIssued: "4,184",
    successRate: "99.4%",
    blockchainStatus: "Issuer verified",
    joinedSince: "August 2024",
    trustScore: "97.6",
    revokedRecords: "14",
    verificationTraffic: "16,204 monthly checks",
    wallet: "0x51ce...8a14",
    accent: "from-emerald-400/70 via-teal-500/40 to-cyan-500/20",
  },
  {
    name: "Axiom Learning Network",
    type: "Training Platform",
    credentialsIssued: "6,092",
    successRate: "99.1%",
    blockchainStatus: "Public issuer profile",
    joinedSince: "October 2024",
    trustScore: "96.8",
    revokedRecords: "21",
    verificationTraffic: "22,110 monthly checks",
    wallet: "0x64af...302b",
    accent: "from-violet-400/70 via-fuchsia-500/40 to-indigo-500/20",
  },
  {
    name: "National Skills Authority",
    type: "Government Body",
    credentialsIssued: "11,540",
    successRate: "99.95%",
    blockchainStatus: "Sovereign anchor",
    joinedSince: "February 2025",
    trustScore: "99.4",
    revokedRecords: "6",
    verificationTraffic: "51,880 monthly checks",
    wallet: "0x11ca...ff20",
    accent: "from-amber-300/70 via-orange-500/40 to-rose-500/20",
  },
];

export const nftCards = [
  {
    title: "Bachelor of Computer Science",
    holderName: featuredProfile.name,
    issuer: "Nova Institute of Technology",
    mintedOn: "March 18, 2026",
    tokenId: "#44012",
    walletOwner: featuredProfile.wallet,
    verificationBadge: "Verified",
    soulboundStatus: "Soulbound",
    labels: ["Minted", "Verified", "Owned", "Soulbound", "Publicly Viewable"],
  },
  {
    title: "Applied AI Systems Certification",
    holderName: "Maya Fernandes",
    issuer: "Axiom Learning Network",
    mintedOn: "March 12, 2026",
    tokenId: "#43790",
    walletOwner: "0x91C2...2F6B",
    verificationBadge: "Verified",
    soulboundStatus: "Soulbound",
    labels: ["Minted", "Verified", "Owned", "Soulbound"],
  },
  {
    title: "Trust Engineering Internship",
    holderName: "Rohan Iyer",
    issuer: "Synapse Innovation Lab",
    mintedOn: "February 28, 2026",
    tokenId: "#43004",
    walletOwner: "0xA12f...B433",
    verificationBadge: "Verified",
    soulboundStatus: "Publicly Viewable",
    labels: ["Minted", "Verified", "Owned", "Publicly Viewable"],
  },
];

export const aiMetrics = [
  { label: "Authenticity Score", value: "97.8%", tone: "emerald" },
  { label: "Tampering Risk", value: "Low Risk", tone: "amber" },
  { label: "Metadata Consistency", value: "99.1%", tone: "cyan" },
  { label: "Signature Pattern", value: "Stable", tone: "violet" },
  { label: "Structural Match", value: "98.4%", tone: "sky" },
  { label: "Confidence Level", value: "High", tone: "emerald" },
];

export const aiStages = [
  "Reading file structure",
  "Comparing metadata",
  "Evaluating integrity markers",
  "Matching against blockchain-linked source",
];

export const aiSummaries = [
  "No suspicious modifications detected.",
  "Potential tampering indicators found.",
  "Document structure deviates from the source-linked version.",
  "Metadata inconsistency requires manual validation.",
];

export const analyticsInsightCards = [
  "Verification demand increased by 28% this month",
  "Engineering certifications lead network issuance volume",
  "AI flagged 12 files for manual review",
];

export const analyticsStats = [
  { label: "Total issuance growth", value: "+18.6%", delta: "QoQ acceleration", tone: "cyan" },
  { label: "Verification requests by day", value: "8.4k", delta: "Peak on Friday", tone: "emerald" },
  { label: "Top issuing institutions", value: "Nova / National Skills Authority", delta: "Network leaders", tone: "violet" },
  { label: "Most verified credential types", value: "Engineering Certifications", delta: "Highest trust demand", tone: "amber" },
  { label: "Revocation trends", value: "0.34%", delta: "Stable and low", tone: "rose" },
  { label: "AI risk distribution", value: "12 elevated files", delta: "Manual review queue", tone: "sky" },
];

export const settingsGroups = [
  {
    title: "Institution Profile",
    icon: Building2,
    fields: ["Institution Name", "Contact Email", "Official Wallet Address"],
  },
  {
    title: "Wallet & Blockchain",
    icon: Wallet,
    fields: ["Official Wallet Address", "Network Environment", "Credential Visibility"],
  },
  {
    title: "Verification Rules",
    icon: CheckCheck,
    fields: ["Public Verification Enabled", "Auto-run AI Integrity Scan", "Authorized Issuer List"],
  },
  {
    title: "Notification Center",
    icon: Bell,
    fields: ["Email Alerts", "Webhook URL", "Verification Request Alerts"],
  },
  {
    title: "Theme & Personalization",
    icon: Sparkles,
    fields: ["Dark Mode", "Light Mode", "Dashboard Accent Profile"],
  },
  {
    title: "API & Integration",
    icon: Orbit,
    fields: ["API Key", "Webhook URL", "Integration Secret"],
  },
  {
    title: "Access Control",
    icon: Fingerprint,
    fields: ["Authorized Issuer List", "Admin Access Policy", "Review Queue Permissions"],
  },
  {
    title: "Security Preferences",
    icon: Shield,
    fields: ["Signer Rotation", "Session Timeout", "High-Risk Verification Alerts"],
  },
];

export const loginHighlights = [
  "Wallet-based access",
  "Verification tools online",
  "Issuer identity verified",
];

export const publicProfileSummary = [
  ["Wallet Address", featuredProfile.wallet],
  ["Profile Visibility", "Public profile enabled"],
  ["Trust Badge", "Verified Holder"],
  ["Portfolio Status", "Proof anchored, ready to share"],
];

export const qrLiveSteps = [
  "Camera initialized",
  "QR payload decoded",
  "Blockchain record confirmed",
  "Verification endpoint active",
];

export const verificationResultDetails = [
  ["Credential Title", "Bachelor of Computer Science"],
  ["Holder Name", featuredProfile.name],
  ["Issuer", "Nova Institute of Technology"],
  ["Date Issued", "March 18, 2026"],
  ["Record Status", "Active"],
  ["Blockchain Match", "Confirmed"],
  ["IPFS Reference", "bafybeicrednova012"],
  ["NFT Ownership", `Soulbound to ${featuredProfile.wallet}`],
  ["AI Integrity Score", "97.8%"],
  ["Verified At", "March 18, 2026, 19:42 IST"],
];

export const adminWelcome = {
  title: "Good evening, Issuer Admin",
  subtitle: "Your credential network is active and ready for issuance.",
};

export const adminBanners = [
  "Credential anchored successfully",
  "Verification endpoint is now live",
  "Ownership record linked to wallet",
];

export const emptyWalletMessage =
  "No credentials have been issued to this wallet yet. Once an institution anchors a record for you, it will appear here.";

export const nftExplainer =
  "NFT credentials combine verified achievement with blockchain-native ownership. Each token represents a cryptographically trusted record linked to the rightful holder.";

export const trustInsight =
  "Every issuer in this network is cryptographically identifiable and publicly auditable.";
