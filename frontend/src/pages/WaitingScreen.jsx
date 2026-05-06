import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function WaitingScreen() {
  const navigate = useNavigate();
  const { setQuoteStatus } = useStore();

  useEffect(() => {
    // In production, this would wait for a webhook or push notification.
    // For this prototype, we'll keep the user here so they can see the Tracking Link concept.
  }, [navigate, setQuoteStatus]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 mx-auto w-full max-w-4xl flex flex-col items-center text-center">
      {/* Illustration Section */}
      <div className="mb-8 relative">
        <div className="absolute -inset-4 bg-primary-fixed/30 blur-2xl rounded-full"></div>
        <img 
          alt="Processing" 
          className="relative w-72 h-48 object-cover rounded-2xl shadow-xl border-4 border-white" 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        />
        <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <span className="material-symbols-outlined text-red-900 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        </div>
      </div>

      {/* Success Message */}
      <div className="mb-10">
        <h1 className="text-[32px] font-bold text-primary mb-3 leading-tight">Success! Your request is being processed.</h1>
        <p className="text-[18px] text-on-surface-variant max-w-lg mx-auto mb-4">
          Our underwriting team and partner insurers have received your application. We are now working to secure the most competitive premiums for your portfolio.
        </p>
        <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl text-left max-w-lg mx-auto">
          <p className="text-[14px] text-primary font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">sms</span>
            Tracking Link Sent
          </p>
          <p className="text-[14px] text-on-surface-variant mt-1">
            We've sent a secure tracking link to your provided contact number/email. You can leave this page. We'll notify you as soon as your quotes arrive!
          </p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-surface-container-high mb-10">
        <div className="flex justify-between items-start relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-1 bg-surface-container-high z-0">
            <div className="h-full w-1/2 bg-primary"></div>
          </div>
          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center w-1/3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-xl">check</span>
            </div>
            <span className="text-[12px] font-bold tracking-[0.05em] uppercase text-primary">Request Sent</span>
            <span className="text-[10px] text-on-surface-variant mt-1">Today, 2:14 PM</span>
          </div>
          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center w-1/3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-3 ring-4 ring-primary-fixed/50">
              <motion.span 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="material-symbols-outlined text-xl text-white" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                sync
              </motion.span>
            </div>
            <span className="text-[12px] font-bold tracking-[0.05em] uppercase text-primary">Insurers Reviewing</span>
            <span className="text-[10px] text-on-surface-variant mt-1">Active Now</span>
          </div>
          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center w-1/3">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-xl">description</span>
            </div>
            <span className="text-[12px] font-bold tracking-[0.05em] uppercase text-on-secondary-container">Quotes Ready</span>
            <span className="text-[10px] text-on-surface-variant mt-1">Estimated</span>
          </div>
        </div>
      </div>

      {/* Waiting Notice */}
      <div className="flex items-center gap-3 bg-[#ffdad4]/20 px-6 py-4 rounded-full border border-[#ffdad4]/40 mb-12">
        <span className="material-symbols-outlined text-primary">schedule</span>
        <p className="text-[16px] text-primary font-medium">Quotes will be ready within 24 hours</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pb-12">
        <button 
          onClick={() => navigate('/quotes-comparison')}
          className="bg-primary text-white font-semibold text-[16px] px-10 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">link</span>
          Simulate: Click Tracking Link
        </button>
      </div>
    </motion.div>
  );
}
