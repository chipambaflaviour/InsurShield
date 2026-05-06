import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function QuotesComparisonPage() {
  const navigate = useNavigate();
  const { selectedInsurers, setSelectedQuote } = useStore();

  const handleSelectQuote = (quote) => {
    setSelectedQuote(quote);
    navigate('/payment');
  };

  const readyCount = Math.max(1, Math.ceil(selectedInsurers.length / 2));
  const readyInsurers = selectedInsurers.slice(0, readyCount);
  const pendingInsurers = selectedInsurers.slice(readyCount);

  const quotes = React.useMemo(() => {
    return readyInsurers.map(insurer => ({
      ...insurer,
      price: Math.floor(Math.random() * 3000) + 1500,
    })).sort((a, b) => a.price - b.price);
  }, [selectedInsurers.length]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      {/* Summary Banner */}
      <section className="max-w-5xl mx-auto mb-8">
        <div className="bg-primary text-white p-6 rounded-xl shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-[28px] md:text-[32px] font-bold mb-2">Quote Comparison</h1>
              <p className="text-[14px] opacity-90">Auto Insurance Coverage</p>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto gap-4 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 mt-2 md:mt-0">
              <div className="text-left md:text-right">
                <p className="text-[12px] font-bold tracking-[0.05em] uppercase text-white/70">Request ID</p>
                <p className="text-[16px] font-semibold tracking-wider">#SHIELD-{Math.floor(10000 + Math.random() * 90000)}</p>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-right">
                <p className="text-[12px] font-bold tracking-[0.05em] uppercase text-white/70">Expires In</p>
                <p className="text-[16px] font-semibold text-white">48 Hours</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Filters & Toggles */}
      <section className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-white border border-outline-variant rounded-full text-[12px] font-bold tracking-[0.05em] text-primary cursor-pointer hover:bg-surface-container transition-colors">Best Value</span>
          <span className="px-4 py-2 bg-white border border-outline-variant rounded-full text-[12px] font-bold tracking-[0.05em] text-secondary cursor-pointer hover:bg-surface-container transition-colors">Lowest Price</span>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-surface-container-low p-1 rounded-full border border-outline-variant">
          <button className="px-4 py-1 bg-white shadow-sm rounded-full text-[14px] font-semibold text-primary">List View</button>
          <button className="px-4 py-1 text-secondary text-[14px] font-semibold hover:text-primary">Grid View</button>
        </div>
      </section>

      {/* Quote Cards */}
      <section className="max-w-5xl mx-auto space-y-6">
        {quotes.map((quote, idx) => (
          <div key={quote.id} className={`bg-white border ${idx === 0 ? 'border-l-4 border-l-tertiary-container shadow-lg' : 'border-gray-100 shadow-sm'} rounded-xl overflow-hidden flex flex-col lg:flex-row transition-all hover:translate-y-[-2px] hover:shadow-xl`}>
            <div className="p-6 flex-1 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center p-2">
                    <span className="material-symbols-outlined text-4xl text-gray-300">business</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-primary">{quote.name}</h3>
                    <div className="flex items-center gap-1 text-on-tertiary-container text-[#94a0ff]">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-[12px] font-bold tracking-[0.05em]">4.9 · {quote.coverage} Coverage</span>
                    </div>
                  </div>
                </div>
                {idx === 0 && (
                  <span className="bg-tertiary-fixed text-[#000c61] px-3 py-1 rounded-full text-[12px] font-bold tracking-[0.05em]">RECOMMENDED</span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(quote.benefits || ['Third Party Property Damage', 'Medical Expenses', 'Theft & Fire']).map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`material-symbols-outlined ${idx === 0 ? 'text-[#00137f]' : 'text-secondary'}`}>check_circle</span>
                    <span className="text-[14px] text-on-surface-variant">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${idx === 0 ? 'bg-surface-container-low' : 'bg-white'} lg:w-72 p-6 flex flex-col justify-center items-center text-center`}>
              <p className="text-[12px] font-bold tracking-[0.05em] text-secondary mb-1">ANNUAL PREMIUM</p>
              <div className="mb-6">
                <span className={`text-4xl font-extrabold ${idx === 0 ? 'text-primary' : 'text-on-surface'}`}>K {quote.price.toLocaleString()}</span>
                <span className="text-[14px] text-secondary">/year</span>
              </div>
              <button 
                onClick={() => handleSelectQuote(quote)} 
                className={`w-full py-4 rounded-lg font-semibold transition-all active:scale-[0.98] ${idx === 0 ? 'bg-primary text-white hover:bg-primary-container shadow-md shadow-primary/20' : 'border-2 border-primary text-primary hover:bg-red-50'}`}
              >
                Select This Quote
              </button>
              <p className="mt-4 text-[12px] font-bold tracking-[0.05em] text-on-surface-variant cursor-pointer hover:underline">View Policy Details</p>
            </div>
          </div>
        ))}
      </section>

      {/* Pending Quotes Section */}
      {pendingInsurers.length > 0 && (
        <section className="max-w-5xl mx-auto mt-8">
          <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl">
            <div className="flex items-start gap-3 mb-4">
              <span className="material-symbols-outlined text-orange-500 animate-pulse">hourglass_empty</span>
              <div>
                <h3 className="text-[16px] font-semibold text-orange-900">Preparing Quotes ({pendingInsurers.length})</h3>
                <p className="text-[14px] text-orange-800/80">The following companies are still calculating your custom premium. You can wait for their response or proceed with the ready quotes above.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pendingInsurers.map((insurer) => (
                <div key={insurer.id} className="bg-white/60 backdrop-blur-sm border border-orange-200/50 p-4 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-orange-300">
                    <span className="material-symbols-outlined">{insurer.icon || 'business'}</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-orange-900">{insurer.name}</p>
                    <p className="text-[12px] text-orange-700/70">Awaiting response...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="max-w-5xl mx-auto mt-12 mb-12">
        <div className="bg-surface-container border border-outline-variant p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-3xl">headset_mic</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-[24px] font-semibold text-primary mb-2">Need help choosing?</h2>
            <p className="text-[16px] text-on-surface-variant">Our private insurance advisors are available for a 1-on-1 consultation to compare these benefits in detail.</p>
          </div>
          <button className="px-8 py-3 bg-[#3d2d2a] text-white rounded-lg font-semibold hover:bg-primary transition-colors whitespace-nowrap shadow-lg">
            Schedule a Call
          </button>
        </div>
      </section>
    </motion.div>
  );
}
