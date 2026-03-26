import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, ShieldCheck, Wallet } from "lucide-react";
import { GlassPanel, GlowCard, PageTransition } from "../components/experience";
import { loginHighlights } from "../data/experienceData";
import { useAuth } from "../context/AuthContext";

export default function WalletLoginPage() {
  const { connectAndLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const user = await connectAndLogin();
      setMessage(`Wallet connected: ${user.walletAddress}`);
      navigate(user.role === "USER" ? "/wallet" : "/admin");
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Wallet login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassPanel>
          <p className="section-eyebrow">Wallet Access Gateway</p>
          <h1 className="section-title mt-4">Enter CredNova through wallet identity.</h1>
          <p className="section-description">
            Connect once to open the issuer workspace, student wallet, or verification-facing public profile without passwords or manual account provisioning.
          </p>

          <div className="mt-8 space-y-4">
            {error ? (
              <div className="rounded-[1.3rem] border border-[rgba(255,127,152,0.24)] bg-[rgba(255,127,152,0.12)] px-4 py-4 text-sm text-[var(--text)]">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-[var(--accent-rose)]" />
                  <span>{error}</span>
                </div>
              </div>
            ) : null}
            {message ? (
              <div className="rounded-[1.3rem] border border-[rgba(85,242,177,0.24)] bg-[rgba(85,242,177,0.12)] px-4 py-4 text-sm text-[var(--text)]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent-emerald)]" />
                  <span>{message}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="button-primary" onClick={handleLogin} disabled={loading} type="button">
              <Wallet className="h-4 w-4" />
              {loading ? "Connecting..." : "Connect Wallet"}
            </button>
            <button className="button-secondary" onClick={() => navigate("/verify")} type="button">
              Open verification
            </button>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="section-eyebrow">Access Highlights</p>
          <div className="mt-6 space-y-4">
            {loginHighlights.map((item) => (
              <GlowCard key={item}>
                <div className="flex items-start gap-3">
                  <div className="brand-emblem h-12 w-12 rounded-[1.2rem]">
                    <div className="brand-emblem__core">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[var(--heading)]">{item}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">Wallet sign-in unlocks a role-aware, premium frontend surface.</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
