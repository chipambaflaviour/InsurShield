import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

const MOCK_INSURERS = [
  { id: '1', name: 'Prestige Assurance', coverage: 'Comprehensive Gold Plan', price: 1240, inspectionRules: 'NOT REQUIRED', timing: 'AFTER PAYMENT', method: 'SELF-CAPTURE', icon: 'verified', isBestValue: true },
  { id: '2', name: 'Global Guard', coverage: 'Elite Security Policy', price: 985.50, inspectionRules: 'REQUIRED', timing: 'BEFORE QUOTATION', method: 'PHYSICAL', icon: 'shield', isBestValue: false },
  { id: '3', name: 'ValueDirect', coverage: 'Essential Shield', price: 720, inspectionRules: 'OPTIONAL', timing: 'BEFORE PAYMENT', method: 'SELF-CAPTURE', icon: 'account_balance_wallet', isBestValue: false },
  { id: '4', name: 'Metro Safe', coverage: 'Standard Protection', price: 1105, inspectionRules: 'REQUIRED', timing: 'BEFORE QUOTATION', method: 'SELF-CAPTURE', icon: 'security', isBestValue: false },
];

export default function InsuranceCompaniesSelectionPage() {
  const navigate = useNavigate();
  const { selectedInsurers, toggleInsurer } = useStore();

  const handleContinue = () => {
    if (selectedInsurers.length > 0) {
      navigate('/quote-form');
    }
  };

  const isSelected = (insurerId) => selectedInsurers.some(i => i.id === insurerId);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-40 w-full max-w-4xl mx-auto px-4 pt-8">
      {/* Header & UX Guidance */}
      <div className="mb-8">
        <h2 className="text-[24px] font-semibold text-primary mb-2">Compare & Select Insurers</h2>
        <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-variant">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          <p className="text-[14px] text-on-surface-variant">
            Different insurers have different inspection requirements. Select up to 5 providers to proceed with detailed comparisons.
          </p>
        </div>
      </div>

      {/* Insurer Cards Grid */}
      <div className="space-y-4">
        {MOCK_INSURERS.map((insurer) => {
          const selected = isSelected(insurer.id);
          const disabled = !selected && selectedInsurers.length >= 5;

          return (
            <div 
              key={insurer.id}
              className={`bg-white rounded-xl shadow-sm transition-all ${insurer.isBestValue ? 'border-2 border-[#C5A059]' : selected ? 'border-2 border-primary' : 'border border-gray-100'} ${disabled ? 'opacity-50 pointer-events-none' : ''} p-4 relative overflow-hidden`}
            >
              {insurer.isBestValue && (
                <div className="absolute top-0 right-0 bg-[#C5A059] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">BEST VALUE</div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${selected ? 'bg-primary/10' : 'bg-surface-container'} rounded-lg flex items-center justify-center p-2`}>
                    <span className={`material-symbols-outlined ${selected ? 'text-primary' : 'text-primary'} text-3xl`}>{insurer.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-primary">{insurer.name}</h3>
                    <p className="text-[14px] text-secondary">{insurer.coverage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-bold tracking-[0.05em] text-secondary">ANNUAL PREMIUM</div>
                  <div className={`text-[24px] font-semibold ${selected ? 'text-primary' : 'text-primary'}`}>${insurer.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${insurer.inspectionRules === 'REQUIRED' ? 'bg-amber-50 text-amber-900 border-amber-100' : insurer.inspectionRules === 'NOT REQUIRED' ? 'bg-red-50 text-red-900 border-red-100' : 'bg-blue-50 text-blue-900 border-blue-100'}`}>
                  <span className="material-symbols-outlined text-[14px]">{insurer.inspectionRules === 'REQUIRED' ? 'photo_camera' : insurer.inspectionRules === 'NOT REQUIRED' ? 'fact_check' : 'playlist_add_check'}</span>
                  {insurer.inspectionRules}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {insurer.timing}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">smartphone</span>
                  {insurer.method}
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-50 pt-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <span className={`text-[16px] font-semibold ${selected ? 'text-primary' : 'text-slate-500'} group-active:opacity-70 transition-opacity`}>Select Insurer</span>
                  <input 
                    type="checkbox" 
                    checked={selected}
                    onChange={() => !disabled && toggleInsurer(insurer)}
                    className="w-6 h-6 rounded border-outline text-primary focus:ring-primary cursor-pointer"
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Insurers Summary Section (Floating Bottom) */}
      <section className="fixed md:bottom-0 bottom-16 left-0 right-0 bg-white shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)] border-t border-slate-100 z-40 pb-safe">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold tracking-[0.05em] text-primary">SELECTED INSURERS</span>
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{selectedInsurers.length} / 5</span>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {selectedInsurers.map(insurer => (
              <div key={insurer.id} className="flex-shrink-0 flex items-center gap-2 bg-red-50 border border-primary/20 p-2 rounded-lg pr-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">{insurer.icon || 'shield'}</span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-primary leading-none">{insurer.name.substring(0, 8)}...</div>
                  <div className="text-[10px] text-primary/70">${insurer.price}</div>
                </div>
              </div>
            ))}
            {selectedInsurers.length === 0 && (
              <div className="text-[12px] text-gray-400 py-2">No insurers selected yet.</div>
            )}
          </div>
          <button 
            onClick={handleContinue}
            disabled={selectedInsurers.length === 0}
            className="w-full bg-primary text-white text-[16px] font-semibold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50 disabled:pointer-events-none"
          >
            Proceed to Request Quote
          </button>
        </div>
      </section>
    </motion.div>
  );
}
