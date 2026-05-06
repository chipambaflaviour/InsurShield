import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function RenewalPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const mockPolicies = [
    { id: '1', vehicle: 'Toyota Corolla (ABC 1234)', expiry: '2023-11-01', status: 'Expired', insurer: 'Madison General' },
    { id: '2', vehicle: 'Nissan Hardbody (XYZ 9876)', expiry: '2024-05-10', status: 'Expiring Soon', insurer: 'Professional Insurance' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 1000);
  };

  const { clearInsurers, toggleInsurer, setQuoteStatus, setVehicleDetails } = useStore();

  const handleRenew = (policy) => {
    const oldInsurer = {
      id: policy.id,
      name: policy.insurer,
      coverage: 'Renewal Comprehensive Policy',
      inspectionRules: 'NOT REQUIRED', 
      timing: 'IMMEDIATE',
      method: 'AUTO-RENEWAL'
    };

    clearInsurers();
    toggleInsurer(oldInsurer);
    setVehicleDetails({
      make: policy.vehicle.split(' ')[0],
      model: policy.vehicle.split(' ')[1] || 'Vehicle',
      year: '2020',
      chassisNumber: 'RENEWAL-VERIFIED'
    });
    setQuoteStatus('pending');
    navigate('/waiting');
  };

  return (
    <div className="flex flex-col items-center py-12 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">autorenew</span>
          </div>
          <h2 className="text-[24px] font-bold text-primary">Renew Policy</h2>
          <p className="text-[14px] text-on-surface-variant">Find your existing policies by Phone or NRC.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input 
              className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-[16px] outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Enter Phone or NRC" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center">
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              ) : (
                <span className="material-symbols-outlined text-[20px]">search</span>
              )}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {searched && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
              <h3 className="font-bold text-[18px] text-primary mt-6 mb-2">Your Vehicles</h3>
              {mockPolicies.map(policy => (
                <div key={policy.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary">directions_car</span>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-semibold text-on-surface">{policy.vehicle}</h4>
                      <div className="text-[12px] text-on-surface-variant mt-1">
                        Insurer: {policy.insurer} <br />
                        Expiry: <span className={policy.status === 'Expired' ? 'text-error font-bold' : 'text-orange-500 font-bold'}>{policy.expiry}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleRenew(policy)} className="w-full md:w-auto px-6 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Request New Quote
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-8">
          <button onClick={() => navigate('/')} className="text-primary font-semibold hover:underline text-[14px]">Back to Home</button>
        </div>
      </motion.div>
    </div>
  );
}
