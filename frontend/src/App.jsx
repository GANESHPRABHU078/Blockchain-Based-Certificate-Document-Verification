import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { AppNav, CinematicBackdrop } from "./components/experience";
import { navLinks } from "./data/experienceData";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const WalletLoginPage = lazy(() => import("./pages/WalletLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const VerifyCertificatePage = lazy(() => import("./pages/VerifyCertificatePage"));
const QrVerificationPage = lazy(() => import("./pages/QrVerificationPage"));
const UserWalletPage = lazy(() => import("./pages/UserWalletPage"));
const PublicProfilePage = lazy(() => import("./pages/PublicProfilePage"));
const NetworkPage = lazy(() => import("./pages/NetworkPage"));
const NftGalleryPage = lazy(() => import("./pages/NftGalleryPage"));
const AIIntegrityPage = lazy(() => import("./pages/AIIntegrityPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function RouteLoading() {
  return (
    <div className="route-loader">
      <p className="section-eyebrow">Loading Interface</p>
      <h2 className="section-title mt-4">Preparing the CredNova experience.</h2>
      <div className="mt-8 space-y-3">
        <div className="skeleton-block h-4 w-full" />
        <div className="skeleton-block h-4 w-5/6" />
        <div className="skeleton-block h-28 w-full" />
      </div>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <CinematicBackdrop />
      <AppNav links={navLinks} user={user} />
      <main className="page-shell">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<WalletLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboardPage />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/verify" element={<VerifyCertificatePage />} />
            <Route path="/qr" element={<QrVerificationPage />} />
            <Route path="/wallet" element={<UserWalletPage />} />
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/gallery" element={<NftGalleryPage />} />
            <Route path="/ai" element={<AIIntegrityPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile/:slug" element={<PublicProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
