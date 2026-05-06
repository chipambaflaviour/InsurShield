import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InsurerDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const [quotePremium, setQuotePremium] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');

  const requests = [
    { id: 'QR-9901', vehicle: '2024 Tesla Model Y', time: '2 mins ago', priority: 'High Priority', value: '$52,000', client: 'Platinum', usage: 'Private', coverage: 'Comprehensive' },
    { id: 'QR-9895', vehicle: '2022 BMW X5', time: '15 mins ago', priority: 'Standard', value: '$68,500', client: 'Private', usage: 'Commercial', coverage: 'Third Party, Fire & Theft' },
    { id: 'QR-9890', vehicle: '2019 Toyota Hilux', time: '1 hour ago', priority: 'Standard', value: '$25,000', client: 'Corporate', usage: 'Commercial', coverage: 'Comprehensive' }
  ];

  const handleProcess = (req) => {
    setSelectedRequest(req);
    setActiveView('process_quote');
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setActiveView('dashboard');
      setSelectedRequest(null);
      setQuotePremium('');
      setQuoteNotes('');
    }, 800);
  };

  if (activeView === 'process_quote' && selectedRequest) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 w-full max-w-4xl mx-auto px-4 mt-8">
        <div className="flex items-center gap-4 mb-6">
          <span onClick={() => setActiveView('dashboard')} className="material-symbols-outlined cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">arrow_back</span>
          <h2 className="text-[24px] font-bold text-primary">Process Quotation: {selectedRequest.id}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Request Details provided by user */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[16px] font-bold text-primary mb-4 border-b pb-2">Client & Vehicle Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Vehicle</p>
                <p className="text-[16px] font-semibold">{selectedRequest.vehicle}</p>
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Estimated Value</p>
                <p className="text-[16px] font-semibold">{selectedRequest.value}</p>
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Declared Usage</p>
                <p className="text-[16px] font-semibold text-primary bg-primary/10 inline-block px-2 py-1 rounded mt-1">{selectedRequest.usage}</p>
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Requested Coverage</p>
                <p className="text-[16px] font-semibold">{selectedRequest.coverage}</p>
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Client Profile</p>
                <p className="text-[16px] font-semibold">{selectedRequest.client}</p>
              </div>
            </div>
          </div>

          {/* Quotation Form for the worker */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/20">
            <h3 className="text-[16px] font-bold text-primary mb-4 border-b pb-2">Create Quotation</h3>
            <form onSubmit={handleSubmitQuote} className="space-y-6">
              <div>
                <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase block mb-2">Calculated Premium ($)</label>
                <input required type="number" value={quotePremium} onChange={e => setQuotePremium(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 1200" />
              </div>
              <div>
                <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase block mb-2">Special Conditions / Notes</label>
                <textarea rows="3" value={quoteNotes} onChange={e => setQuoteNotes(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Requires tracking device installation..."></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">send</span> Send Quote to Client
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 w-full max-w-7xl mx-auto px-4">
      {/* Welcome Header */}
      <section className="mt-8 mb-8 flex justify-between items-start">
        <div>
          <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant mb-1 uppercase">DASHBOARD OVERVIEW</p>
          <h2 className="text-[32px] font-bold text-primary leading-tight">Welcome, Insurer Team</h2>
          <p className="text-[14px] text-secondary">You have 12 new quote requests pending review today.</p>
        </div>
        <div className="relative cursor-pointer bg-white p-3 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
          <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100 flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase">Urgent</div>
          <span className="material-symbols-outlined text-red-600 text-2xl">hourglass_top</span>
          <p className="text-[10px] font-bold tracking-[0.05em] text-red-900 uppercase">Waiting Quotes</p>
          <p className="text-[32px] font-bold text-red-700 leading-tight">12</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-100 flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase">Action Req</div>
          <span className="material-symbols-outlined text-amber-600 text-2xl">description</span>
          <p className="text-[10px] font-bold tracking-[0.05em] text-amber-900 uppercase">Waiting Policy Docs</p>
          <p className="text-[32px] font-bold text-amber-700 leading-tight">05</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
          <p className="text-[10px] font-bold tracking-[0.05em] text-secondary uppercase">Active Policies</p>
          <p className="text-[32px] font-bold text-primary leading-tight">152</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
          <span className="material-symbols-outlined text-green-600 text-2xl">autorenew</span>
          <p className="text-[10px] font-bold tracking-[0.05em] text-secondary uppercase">Returning Customers</p>
          <p className="text-[32px] font-bold text-primary leading-tight">18</p>
        </div>
      </section>

      {/* Performance Chart Placeholder */}
      <section className="mb-8 bg-[#3d2d2a] rounded-xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[12px] font-bold tracking-[0.05em] text-[#94a0ff] mb-2 uppercase">WEEKLY PERFORMANCE</p>
          <div className="flex items-end gap-2 h-24 mb-4">
            <div className="w-full bg-red-900/40 rounded-t-sm h-[40%]"></div>
            <div className="w-full bg-red-900/40 rounded-t-sm h-[65%]"></div>
            <div className="w-full bg-red-900/40 rounded-t-sm h-[50%]"></div>
            <div className="w-full bg-red-800 rounded-t-sm h-[85%]"></div>
            <div className="w-full bg-red-900/40 rounded-t-sm h-[45%]"></div>
            <div className="w-full bg-red-900/40 rounded-t-sm h-[60%]"></div>
            <div className="w-full bg-red-900/40 rounded-t-sm h-[30%]"></div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[20px] font-semibold">+12.5%</p>
              <p className="text-[10px] opacity-70">CONVERSION RATE</p>
            </div>
            <span className="material-symbols-outlined text-[#ffb4a8]">trending_up</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/20 to-transparent pointer-events-none"></div>
      </section>

      {/* Recent Quote Requests (Compacted List View) */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[20px] font-semibold text-on-surface">Recent Requests for Quotation</h3>
          <button className="text-primary font-semibold text-[14px]">View All</button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {requests.map((req, idx) => (
              <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">directions_car</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[16px] font-semibold text-primary">{req.vehicle}</p>
                      {req.priority === 'High Priority' && (
                        <span className="px-2 py-[2px] bg-red-50 text-red-900 text-[10px] font-bold rounded uppercase">High Priority</span>
                      )}
                    </div>
                    <p className="text-[12px] text-on-surface-variant">
                      ID: {req.id} • Value: {req.value} • Usage: {req.usage}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:w-auto w-full justify-between md:justify-end">
                  <span className="text-[12px] text-secondary">{req.time}</span>
                  <button onClick={() => handleProcess(req)} className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white font-semibold text-[14px] rounded-lg transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">edit_document</span> Process
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Returning Customers Module */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[20px] font-semibold text-on-surface">Returning Customers (Renewals)</h3>
          <button className="text-primary font-semibold text-[14px]">View Pipeline</button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-green-600 text-3xl">event_repeat</span>
          </div>
          <h4 className="text-[18px] font-bold text-primary mb-2">Renewal Pipeline</h4>
          <p className="text-[14px] text-on-surface-variant max-w-md mx-auto">
            18 clients have policies expiring in the next 30 days. Automated quote renewals have been sent from the aggregator.
          </p>
          <button className="mt-6 px-6 py-3 bg-white border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors">
            Manage Renewals Module
          </button>
        </div>
      </section>
    </motion.div>
  );
}
