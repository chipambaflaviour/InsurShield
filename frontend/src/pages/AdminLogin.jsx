import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center py-12 px-6 bg-surface-container-lowest">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
            </div>
            <h2 className="text-[24px] font-bold text-primary mb-2">Admin Portal</h2>
            <p className="text-[14px] text-on-surface-variant">Sign in to manage insurers, rules, and quotes.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase block">Admin Email</label>
              <Input 
                type="email" 
                placeholder="admin@insurshield.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase block">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={!email || !password || loading}>
              {loading ? 'Authenticating...' : 'Secure Login'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
