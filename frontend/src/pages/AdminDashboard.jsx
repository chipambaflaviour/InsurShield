import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { insurersList, addInsurer } = useStore();
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'manage_insurers', 'add_insurer', 'recover_link'

  // Form state
  const [newInsurerName, setNewInsurerName] = useState('');
  const [newInsurerCoverage, setNewInsurerCoverage] = useState('');
  const [newInsurerPrice, setNewInsurerPrice] = useState('');

  const [searchPlate, setSearchPlate] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearchLink = (e) => {
    e.preventDefault();
    if (searchPlate) {
      setSearchResult({
        plate: searchPlate.toUpperCase(),
        phone: '097XXXXXXX',
        status: 'Awaiting Payment',
        link: `https://insurshield.com/track/${Math.random().toString(36).substring(7)}`
      });
    }
  };

  const handleAddInsurer = (e) => {
    e.preventDefault();
    if (newInsurerName && newInsurerCoverage && newInsurerPrice) {
      addInsurer({
        name: newInsurerName,
        coverage: newInsurerCoverage,
        price: parseFloat(newInsurerPrice),
        status: 'Active'
      });
      setNewInsurerName('');
      setNewInsurerCoverage('');
      setNewInsurerPrice('');
      setActiveView('manage_insurers');
    }
  };

  if (activeView === 'add_insurer') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 w-full max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span onClick={() => setActiveView('dashboard')} className="material-symbols-outlined cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">arrow_back</span>
          <h2 className="text-[24px] font-bold text-primary">Onboard New Insurer</h2>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleAddInsurer} className="space-y-6">
            <div>
              <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase block mb-2">Company Name</label>
              <input required value={newInsurerName} onChange={e => setNewInsurerName(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Shield Life Insurance" />
            </div>
            <div>
              <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase block mb-2">Default Coverage Plan</label>
              <input required value={newInsurerCoverage} onChange={e => setNewInsurerCoverage(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Premium Health" />
            </div>
            <div>
              <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase block mb-2">Base Annual Premium ($)</label>
              <input required type="number" value={newInsurerPrice} onChange={e => setNewInsurerPrice(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 1500" />
            </div>
            <button type="submit" className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all">
              Save Insurance Company
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  if (activeView === 'recover_link') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 w-full max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span onClick={() => setActiveView('dashboard')} className="material-symbols-outlined cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">arrow_back</span>
          <h2 className="text-[24px] font-bold text-primary">Recover Tracking Link</h2>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSearchLink} className="space-y-6">
            <div>
              <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase block mb-2">Search by Plate Number or Phone</label>
              <input required value={searchPlate} onChange={e => setSearchPlate(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] outline-none focus:ring-2 focus:ring-primary uppercase tracking-widest font-bold" placeholder="e.g. BAA 1234" />
            </div>
            <button type="submit" className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">search</span> Search Database
            </button>
          </form>

          {searchResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-surface-container-low border border-outline-variant rounded-xl space-y-4">
              <h3 className="text-[16px] font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span> Active Session Found
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Plate Number</span>
                  <span className="font-semibold text-primary">{searchResult.plate}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Status</span>
                  <span className="font-semibold text-primary">{searchResult.status}</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 mt-2">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">Secure Tracking Link</span>
                <code className="text-[12px] text-blue-600 break-all">{searchResult.link}</code>
              </div>
              <div className="flex gap-4 pt-2">
                <button className="flex-1 bg-white border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">sms</span> SMS Link
                </button>
                <button className="flex-1 bg-white border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">content_copy</span> Copy Link
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  if (activeView === 'manage_insurers') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span onClick={() => setActiveView('dashboard')} className="material-symbols-outlined cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">arrow_back</span>
            <h2 className="text-[24px] font-bold text-primary">Manage Insurers</h2>
          </div>
          <button onClick={() => setActiveView('add_insurer')} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-[20px]">add</span> Add Insurer
          </button>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto shadow-sm">
          <div className="p-4 bg-gray-50 border-b border-gray-100 grid grid-cols-4 font-bold text-[12px] text-on-surface-variant uppercase tracking-wider">
            <div>Company Name</div>
            <div>Coverage Plan</div>
            <div>Base Premium</div>
            <div className="text-right">Status</div>
          </div>
          <div className="divide-y divide-gray-50">
            {insurersList.map(insurer => (
              <div key={insurer.id} className="p-4 grid grid-cols-4 items-center hover:bg-gray-50 transition-colors">
                <div className="font-semibold text-primary">{insurer.name}</div>
                <div className="text-[14px] text-on-surface-variant">{insurer.coverage}</div>
                <div className="text-[14px] text-on-surface-variant">${insurer.price}</div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{insurer.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 w-full">
      {/* Welcome Header */}
      <section>
        <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant mb-1 uppercase">Overview Dashboard</p>
        <h2 className="text-[32px] font-bold text-primary leading-tight">Welcome, Alex Sterling</h2>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Requests */}
        <div className="bg-white p-5 rounded-xl shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between aspect-square">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-red-50 rounded-lg">
              <span className="material-symbols-outlined text-primary text-2xl">request_quote</span>
            </div>
          </div>
          <div>
            <h3 className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant mb-1 uppercase">Total Requests</h3>
            <p className="text-[24px] font-semibold text-primary">1,284</p>
            <span className="text-[10px] text-green-600 font-bold">+12% vs last month</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-primary p-5 rounded-xl shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] border border-primary-container flex flex-col justify-between aspect-square">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-white/10 rounded-lg">
              <span className="material-symbols-outlined text-white text-2xl">payments</span>
            </div>
          </div>
          <div>
            <h3 className="text-[12px] font-bold tracking-[0.05em] text-white/70 mb-1 uppercase">Revenue (USD)</h3>
            <p className="text-[24px] font-semibold text-white">$42.8K</p>
            <span className="text-[10px] text-white/50 font-bold">≈ ZMW 1.1M</span>
          </div>
        </div>

        {/* Insurers */}
        <div className="bg-white p-5 rounded-xl shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between aspect-square">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-secondary text-2xl">business</span>
            </div>
          </div>
          <div>
            <h3 className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant mb-1 uppercase">Active Insurers</h3>
            <p className="text-[24px] font-semibold text-primary">{insurersList.length}</p>
            <span className="text-[10px] text-green-600 font-bold">+1 new today</span>
          </div>
        </div>

        {/* Claims */}
        <div className="bg-white p-5 rounded-xl shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between aspect-square">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-error-container rounded-lg">
              <span className="material-symbols-outlined text-error text-2xl">report_problem</span>
            </div>
          </div>
          <div>
            <h3 className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant mb-1 uppercase">Claims Pending</h3>
            <p className="text-[24px] font-semibold text-primary">89</p>
            <span className="text-[10px] text-error font-bold">+5 new today</span>
          </div>
        </div>
      </section>

      {/* Revenue Trends Chart (Reduced bar sizes) */}
      <section className="bg-white p-6 rounded-2xl shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-[20px] font-semibold text-primary">Revenue Trends</h3>
            <p className="text-[14px] text-on-surface-variant">Comparative growth analysis</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-red-50 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">USD</span>
            <span className="bg-gray-100 text-gray-50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-secondary">ZMW</span>
          </div>
        </div>
        <div className="relative h-24 w-full mt-4 flex items-end justify-between gap-1">
          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-red-50/20 to-transparent"></div>
          <div className="h-[20%] w-full bg-primary/10 rounded-t-sm relative group">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-primary text-white text-[10px] px-2 py-1 rounded transition-opacity">12k</div>
          </div>
          <div className="h-[30%] w-full bg-primary/20 rounded-t-sm relative group"></div>
          <div className="h-[25%] w-full bg-primary/30 rounded-t-sm relative group"></div>
          <div className="h-[50%] w-full bg-primary/50 rounded-t-sm relative group"></div>
          <div className="h-[45%] w-full bg-primary/60 rounded-t-sm relative group"></div>
          <div className="h-[80%] w-full bg-primary rounded-t-sm relative group"></div>
          <div className="h-[65%] w-full bg-primary/80 rounded-t-sm relative group"></div>
        </div>
        <div className="flex justify-between mt-4 text-[12px] font-bold tracking-[0.05em] text-on-surface-variant opacity-60">
          <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
        </div>
      </section>

      {/* Quick Actions & Transactions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-[20px] font-semibold text-primary mb-4">Quick Management</h3>
          <div className="space-y-4">
            <button onClick={() => setActiveView('manage_insurers')} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">manage_accounts</span>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-primary">Manage Insurers</p>
                  <p className="text-[14px] text-on-surface-variant">{insurersList.length} active partners</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary">chevron_right</span>
            </button>
            <button onClick={() => setActiveView('add_insurer')} className="w-full flex items-center justify-between p-4 bg-primary text-white border border-primary-container rounded-xl shadow-md hover:bg-primary-container active:scale-[0.98] transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">domain_add</span>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-white">Onboard New Insurer</p>
                  <p className="text-[14px] text-white/80">Add provider & configure rules</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-white">add_circle</span>
            </button>
            <button onClick={() => setActiveView('recover_link')} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all text-left border-l-4 border-l-orange-500">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-500">support_agent</span>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-primary">Recover Tracking Link</p>
                  <p className="text-[14px] text-on-surface-variant">Assist clients with lost links</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-[20px] font-semibold text-primary">Recent Activity</h3>
            <span className="text-[12px] font-bold tracking-[0.05em] text-primary cursor-pointer uppercase">View All</span>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sarah" />
              </div>
              <div className="flex-grow">
                <p className="text-[14px] font-bold text-primary">Sarah Jenkins</p>
                <p className="text-[12px] text-on-surface-variant">Auto Insurance Policy • $1,200</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] px-2 py-1 bg-green-50 text-green-700 font-bold rounded uppercase">Paid</span>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="David" />
              </div>
              <div className="flex-grow">
                <p className="text-[14px] font-bold text-primary">David Lungu</p>
                <p className="text-[12px] text-on-surface-variant">Life Premium Claim • Pending</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] px-2 py-1 bg-yellow-50 text-yellow-700 font-bold rounded uppercase">Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
