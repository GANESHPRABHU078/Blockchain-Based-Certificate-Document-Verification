import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { 
  BarChart3, FileText, Users, ShieldCheck, QrCode, Settings, 
  LogOut, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { href: '/admin', icon: BarChart3, label: 'Dashboard', role: ['ADMIN', 'INSTITUTION_ADMIN'] },
    { href: '/certificates', icon: FileText, label: 'Certificates', role: ['ADMIN', 'INSTITUTION_ADMIN'] },
    { href: '/institutions', icon: Users, label: 'Institutions', role: ['ADMIN'] },
    { href: '/verify', icon: ShieldCheck, label: 'Verify', role: ['ADMIN', 'INSTITUTION_ADMIN'] },
    { href: '/qr', icon: QrCode, label: 'QR Scanner', role: ['ADMIN', 'INSTITUTION_ADMIN'] },
    { href: '/settings', icon: Settings, label: 'Settings', role: ['ADMIN', 'INSTITUTION_ADMIN'] },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="glass-card h-screen flex flex-col shadow-2xl border-r border-gray-200/50 dark:border-slate-800/50"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200/30 dark:border-slate-800/30">
        {!collapsed && (
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🪙</span>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Admin Console
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                {user?.role || 'Admin'}
              </p>
            </div>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          if (item.role && !item.role.includes(user?.role)) return null;
          
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'group flex items-center gap-4 p-4 rounded-2xl font-medium text-sm transition-all duration-300 relative overflow-hidden',
                isActive 
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-xl' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:bg-primary-500/10 dark:hover:bg-slate-800/50 hover:shadow-lg'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                isActive ? 'bg-white/20 backdrop-blur-sm shadow-lg' : 'group-hover:scale-110'
              )}>
                <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-current')} />
              </div>
              {!collapsed && <span>{item.label}</span>}
              {isActive && (
                <motion.div 
                  className="absolute right-4 w-2 h-12 bg-white/50 rounded-full"
                  layoutId="sidebar-active"
                  transition={{ type: 'spring', bounce: 0 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/30 dark:border-slate-800/30 mt-auto">
        <div className="flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-all duration-300 cursor-pointer" onClick={logout}>
          <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
            <LogOut className="w-5 h-5 text-white" />
          </div>
          {!collapsed && <span className="font-medium text-slate-700 dark:text-slate-300">Logout</span>}
        </div>
      </div>
    </motion.aside>
  );
}
