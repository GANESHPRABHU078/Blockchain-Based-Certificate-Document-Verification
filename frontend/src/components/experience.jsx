import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  Menu,
  MoonStar,
  Search,
  Shield,
  Sparkles,
  SunMedium,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import { brand, featuredProfile } from "../data/experienceData";

export function useThemePreference(defaultTheme = "dark") {
  const [theme, setTheme] = useState(() => localStorage.getItem("ddcn-theme") || defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
    localStorage.setItem("ddcn-theme", theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme((value) => (value === "dark" ? "light" : "dark")),
  };
}

export function CinematicBackdrop() {
  return (
    <div aria-hidden="true" className="backdrop-stage">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <div className="spotlight spotlight-a" />
      <div className="spotlight spotlight-b" />
      <div className="mesh-grid" />
      <div className="particle-field">
        {Array.from({ length: 32 }).map((_, index) => (
          <span
            key={index}
            className="particle"
            style={{
              left: `${(index * 11) % 100}%`,
              top: `${(index * 17) % 100}%`,
              animationDelay: `${(index % 6) * 0.8}s`,
              animationDuration: `${11 + (index % 5) * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function BrandLockup() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="brand-emblem">
        <div className="brand-emblem__core">
          <Shield className="h-5 w-5" />
        </div>
      </div>
      <div>
        <p className="brand-name">{brand.uiName}</p>
        <p className="brand-subtitle">{brand.projectName}</p>
      </div>
    </Link>
  );
}

export function AppNav({ links, user }) {
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState("");
  const { theme, toggleTheme } = useThemePreference();
  const navigate = useNavigate();
  const { connectAndLogin } = useAuth();

  const handleConnectWallet = async () => {
    if (user) {
      navigate(user.role === "USER" ? "/wallet" : "/admin");
      setOpen(false);
      return;
    }

    setConnecting(true);
    setConnectError("");
    try {
      const loggedInUser = await connectAndLogin();
      navigate(loggedInUser.role === "USER" ? "/wallet" : "/admin");
      setOpen(false);
    } catch (error) {
      setConnectError(error?.response?.data?.error || error?.message || "Wallet connection failed");
      navigate("/login");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <header className="site-topbar">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <BrandLockup />

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <NavLink key={link.href} to={link.href} className={({ isActive }) => cn("nav-link", isActive && "nav-link--active")}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme" type="button">
            {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </button>
          <button className="status-chip status-chip--subtle" onClick={() => navigate("/network")} type="button">
            <Sparkles className="h-3.5 w-3.5" />
            Trusted Network Live
          </button>
          <button className="button-primary" onClick={handleConnectWallet} type="button" disabled={connecting}>
            <Wallet className="h-4 w-4" />
            {connecting ? "Connecting..." : user ? "Open Workspace" : "Connect Wallet"}
          </button>
        </div>

        <button className="icon-button xl:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" type="button">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mb-4 overflow-hidden rounded-[28px] border border-white/10 bg-[var(--surface-strong)] p-4 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink key={link.href} to={link.href} className="nav-link" onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 flex gap-2">
                <button className="button-secondary flex-1 justify-center" onClick={toggleTheme} type="button">
                  {theme === "dark" ? "Light Theme" : "Dark Theme"}
                </button>
                <button className="button-primary flex-1 justify-center" onClick={handleConnectWallet} type="button" disabled={connecting}>
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </button>
              </div>
              {connectError ? <p className="mt-3 text-sm text-[var(--accent-rose)]">{connectError}</p> : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function ShellSection({ eyebrow, title, description, actions, children, className }) {
  return (
    <section className={cn("stack-xl", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
          <h1 className="section-title">{title}</h1>
          {description ? <p className="section-description">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function GlassPanel({ children, className }) {
  return <div className={cn("glass-panel", className)}>{children}</div>;
}

export function GlowCard({ children, className }) {
  return <div className={cn("glow-card", className)}>{children}</div>;
}

export function MetricTile({ label, value, delta, tone = "cyan" }) {
  return (
    <GlowCard className="metric-tile">
      <div className="flex items-center justify-between gap-3">
        <span className={cn("tone-dot", `tone-dot--${tone}`)} />
        {delta ? <span className="status-chip status-chip--subtle">{delta}</span> : null}
      </div>
      <div>
        <p className="metric-value">{value}</p>
        <p className="metric-label">{label}</p>
      </div>
    </GlowCard>
  );
}

export function MiniBarChart({ data }) {
  return (
    <div className="bar-chart">
      {data.map((item) => (
        <div key={item.label} className="bar-chart__column">
          <div className="bar-chart__track">
            <motion.div
              className="bar-chart__bar"
              initial={{ height: 0 }}
              whileInView={{ height: `${item.value}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function DualTrendChart({ data }) {
  return (
    <div className="trend-chart">
      {data.map((item) => (
        <div key={item.label} className="trend-chart__row">
          <span>{item.label}</span>
          <div className="trend-chart__bars">
            <motion.div
              className="trend-chart__bar trend-chart__bar--primary"
              initial={{ width: 0 }}
              whileInView={{ width: `${item.primary}%` }}
              viewport={{ once: true, margin: "-40px" }}
            />
            <motion.div
              className="trend-chart__bar trend-chart__bar--secondary"
              initial={{ width: 0 }}
              whileInView={{ width: `${item.secondary}%` }}
              viewport={{ once: true, margin: "-40px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RingScore({ value, label, caption }) {
  const numeric = useMemo(() => Number.parseFloat(String(value).replace("%", "")) || 0, [value]);
  return (
    <div className="ring-score">
      <div
        className="ring-score__dial"
        style={{
          background: `conic-gradient(var(--accent-cyan) 0 ${numeric}%, rgba(255,255,255,0.08) ${numeric}% 100%)`,
        }}
      >
        <div className="ring-score__core">
          <span>{value}</span>
          <small>{label}</small>
        </div>
      </div>
      {caption ? <p className="text-center text-sm text-[var(--muted)]">{caption}</p> : null}
    </div>
  );
}

export function ToggleRow({ label, hint, defaultChecked = true }) {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <button type="button" className="toggle-row" onClick={() => setEnabled((value) => !value)}>
      <div>
        <p className="font-medium text-[var(--text)]">{label}</p>
        {hint ? <p className="mt-1 text-sm text-[var(--muted)]">{hint}</p> : null}
      </div>
      <span className={cn("toggle", enabled && "toggle--on")}>
        <span className="toggle__thumb">{enabled ? <Check className="h-3 w-3" /> : null}</span>
      </span>
    </button>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <GlassPanel className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <Sparkles className="h-7 w-7 text-[var(--accent-cyan)]" />
      </div>
      <h3 className="text-2xl font-semibold text-[var(--text)]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </GlassPanel>
  );
}

export function SkeletonBlock({ className }) {
  return <div className={cn("skeleton-block", className)} />;
}

export function StatusPill({ children, tone = "cyan", className }) {
  return <span className={cn("status-pill", `status-pill--${tone}`, className)}>{children}</span>;
}

export function SearchField({ placeholder = "Search", className }) {
  return (
    <label className={cn("search-field", className)}>
      <Search className="h-4 w-4 text-[var(--muted)]" />
      <input placeholder={placeholder} />
    </label>
  );
}

export function TopbarUtility() {
  const navigate = useNavigate();

  return (
    <GlassPanel className="topbar-utility">
      <div>
        <p className="section-eyebrow">Issuer Command Layer</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span>Institution OS</span>
          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
          <span>Credential Issuance</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <SearchField placeholder="Search credential, wallet, institution" className="min-w-[280px]" />
        <StatusPill tone="violet">{featuredProfile.wallet}</StatusPill>
        <button className="icon-button" onClick={() => navigate("/settings")} type="button" aria-label="Open notifications">
          <Bell className="h-4 w-4" />
        </button>
        <div className="avatar-chip">
          <span>CN</span>
        </div>
      </div>
    </GlassPanel>
  );
}

export function PageTransition({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

export function CTAInline({ to, children }) {
  return (
    <Link to={to} className="cta-inline">
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function GridDivider() {
  return <div className="grid-divider" aria-hidden="true" />;
}

export function HeroBadge({ children }) {
  return <span className="hero-badge">{children}</span>;
}

export function DataList({ items, columns = 2 }) {
  return (
    <div className={cn("grid gap-3", columns === 1 ? "grid-cols-1" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
      {items.map(([label, value]) => (
        <div key={label} className="data-item">
          <p>{label}</p>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export function OrbitVisual({ icons = [] }) {
  return (
    <div className="orbit-visual">
      <div className="orbit-visual__center">
        <div className="brand-emblem brand-emblem--large">
          <div className="brand-emblem__core">
            <Shield className="h-7 w-7" />
          </div>
        </div>
      </div>
      {[0, 1, 2].map((ring) => (
        <div key={ring} className={`orbit-ring orbit-ring--${ring + 1}`} />
      ))}
      {icons.map((Icon, index) => (
        <div key={index} className={`orbit-node orbit-node--${index + 1}`}>
          <Icon className="h-5 w-5" />
        </div>
      ))}
    </div>
  );
}

export function AdminSidebar({ links }) {
  return (
    <aside className="glass-panel admin-sidebar hidden h-fit min-w-[285px] lg:block">
      <p className="section-eyebrow">Operations Layer</p>
      <div className="mt-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink key={link.href} to={link.href} className={({ isActive }) => cn("sidebar-link", isActive && "sidebar-link--active")}>
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="sidebar-promo">
        <p className="text-sm font-medium text-[var(--text)]">Issuer authenticated</p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          CredNova signing node is healthy. Verification services are online. Next anchor window closes shortly.
        </p>
      </div>
    </aside>
  );
}

export function TableLike({ columns, rows }) {
  return (
    <div className="table-like">
      <div className="table-like__head" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="table-like__row" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
            {row.map((cell, cellIndex) => (
              <Fragment key={cellIndex}>{cell}</Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
