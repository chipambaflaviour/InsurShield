import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary/20">
      <header className="bg-white border-b border-gray-100 shadow-sm fixed top-0 h-16 w-full z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary cursor-pointer active:opacity-70">menu</span>
          <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">InsurShield</Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-primary font-semibold font-sans text-sm transition-colors cursor-pointer">Home</Link>
          <Link to="/renewal" className="text-gray-600 font-sans text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer px-3 py-2 rounded-lg">Policies</Link>
          <Link to="/admin-login" className="text-gray-600 font-sans text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer px-3 py-2 rounded-lg">Support</Link>
          <Link to="/insurer" className="text-gray-600 font-sans text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer px-3 py-2 rounded-lg">Insurer Portal</Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary cursor-pointer active:opacity-70">notifications</span>
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant overflow-hidden">
            <span className="material-symbols-outlined text-gray-500 text-sm">person</span>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-24 flex-1">
        <Outlet />
      </main>
      
      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-2xl">
        <Link to="/" className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1 cursor-pointer active:scale-95 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Home</span>
        </Link>
        <Link to="/renewal" className="flex flex-col items-center justify-center text-gray-500 hover:text-primary cursor-pointer active:scale-95 transition-transform">
          <span className="material-symbols-outlined">shield</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Policies</span>
        </Link>
        <Link to="/admin-login" className="flex flex-col items-center justify-center text-gray-500 hover:text-primary cursor-pointer active:scale-95 transition-transform">
          <span className="material-symbols-outlined">headset_mic</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Support</span>
        </Link>
        <Link to="/insurer" className="flex flex-col items-center justify-center text-gray-500 hover:text-primary cursor-pointer active:scale-95 transition-transform">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
