import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative min-h-[calc(100vh-64px)] flex items-center px-6 md:px-8 overflow-hidden bg-white">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center lg:text-left mt-8 lg:mt-0">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[12px] font-bold tracking-[0.05em] mb-6">
              PRIVATE CLIENT SOLUTIONS
            </span>
            <h1 className="text-[32px] md:text-[40px] font-bold text-on-background mb-6 max-w-xl leading-tight tracking-tight">
              The definitive shield for your most <span className="text-primary">valuable assets.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-on-surface-variant mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Experience a new standard in insurance aggregation. We bridge the gap between digital agility and private banking prestige for discerning clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/insurance-type')}
                className="bg-primary text-on-primary font-semibold text-[16px] px-8 py-4 rounded-xl shadow-lg hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Get Insurance
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button 
                onClick={() => navigate('/renewal')}
                className="border-2 border-on-surface text-on-surface font-semibold text-[16px] px-6 py-4 rounded-xl hover:bg-on-surface/5 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Renew
                <span className="material-symbols-outlined">refresh</span>
              </button>
              <button 
                onClick={() => navigate('/track')}
                className="border-2 border-transparent bg-surface-container-low text-primary font-semibold text-[16px] px-6 py-4 rounded-xl hover:bg-surface-container transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
              >
                Track Request
                <span className="material-symbols-outlined">track_changes</span>
              </button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-[12px] font-bold tracking-[0.05em]">Lloyd's Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                <span className="text-[12px] font-bold tracking-[0.05em]">ISO 27001</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -top-12 -right-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-tertiary-fixed-dim/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                alt="Premium Vehicle" 
                className="w-full h-full object-cover aspect-[4/3]" 
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-bold tracking-[0.05em] text-primary mb-1">REAL-TIME QUOTES</p>
                  <p className="text-[20px] font-semibold">Global Portfolio Coverage</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-primary">analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-surface-container-low">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[24px] md:text-[32px] font-bold mb-4">Precision Engineering for Peace of Mind</h2>
            <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
              We leverage advanced algorithms to curate policy selections from the world's most reputable insurers, tailored to your unique risk profile.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h3 className="text-[20px] font-semibold mb-4">Unified Insurer Ecosystem</h3>
                <p className="text-[16px] text-on-surface-variant max-w-md">
                  Access 50+ tier-one insurance providers through a single, streamlined interface. No more redundant forms or fragmented management.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-sm flex flex-col justify-between relative group overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <h3 className="text-[20px] font-semibold mb-4">60-Second Quoting</h3>
                <p className="text-on-primary/80 text-[14px]">
                  Our rapid-assessment engine analyzes your data to deliver legally binding quotes in under a minute.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <h3 className="text-[20px] font-semibold mb-4">Concierge Claims</h3>
              <p className="text-[16px] text-on-surface-variant">
                Experience zero-friction claim handling. Our dedicated advocacy team manages the bureaucracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold tracking-tighter text-white mb-4">Insur<span className="text-primary">Shield</span></h2>
              <p className="text-[14px] text-gray-400 max-w-md">
                The premier digital insurance aggregator providing seamless, real-time vehicle coverage from top-tier underwriters. 
                Experience unparalleled security and rapid claims processing.
              </p>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-white uppercase tracking-[0.05em] mb-4">Company</h4>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Our Partners</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-white uppercase tracking-[0.05em] mb-4">Legal</h4>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-gray-500">
              &copy; {new Date().getFullYear()} InsurShield Aggregator Ltd. All rights reserved. 
              Regulated by the Pensions and Insurance Authority (PIA). <span className="font-semibold text-gray-400 block mt-1">Engineered by Axis Solutions.</span>
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
