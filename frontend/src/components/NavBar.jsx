import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { 
  Home, Wallet, ShieldCheck, QrCode, Building, User, 
  Bell, Moon, Sun, Menu, X 
} from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/verify', icon: ShieldCheck, label: 'Verify' },
  { href: '/qr', icon: QrCode, label: 'QR Scan' },
  { href: '/network', icon: Building, label: 'Network' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/90 border-b border-gray-200/50 dark:border-slate-800/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">🪙</span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold bg-gradient-to-r from-gray-900 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent">
                CredentialNet
              </h1>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">Decentralized Network</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium text-sm transition-all duration-300 relative group ${
                    isActive 
                      ? 'bg-primary-500/10 text-primary-600 shadow-lg' 
                      : 'text-gray-600 dark:text-slate-400 hover:text-primary-600 hover:bg-primary-500/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 -ml-1 w-2 h-2 bg-primary-500 rounded-full shadow-lg" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="p-2 text-gray-500 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-500/10 rounded-xl transition-all duration-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                3
              </span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-500/10 rounded-xl transition-all duration-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm" onClick={logout}>
                  <User className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button>
                <Link to="/login">
                  <Wallet className="w-4 h-4" />
                  Connect
                </Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl text-gray-500 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm hover:bg-primary-500/10 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 text-gray-500" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
