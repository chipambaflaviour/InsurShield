import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function PolicyConfirmationPage() {
  const navigate = useNavigate();
  const { userPhone, vehicleDetails, resetStore } = useStore();

  const [isGenerating, setIsGenerating] = React.useState(true);

  React.useEffect(() => {
    // Simulate real-world delay for insurer API to generate the official policy PDF
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    resetStore();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center py-12 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-6">
        
        {isGenerating ? (
          <div className="text-center space-y-6 mb-8 py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border-4 border-primary border-t-transparent"
            />
            <div>
              <h2 className="text-[24px] font-bold text-primary mb-2">Payment Confirmed</h2>
              <p className="text-[14px] text-on-surface-variant px-6">
                The insurer is currently generating your official policy documents. You may safely close this page, we will email and SMS you the PDF once it's ready.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.05em]">
              <span className="material-symbols-outlined text-[16px] animate-pulse">hourglass_top</span>
              AWAITING INSURER API
            </div>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2 mb-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-green-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h2 className="text-[24px] font-bold text-primary">You're Covered!</h2>
              <p className="text-[14px] text-on-surface-variant">Your policy is active. A copy has been sent to your email.</p>
            </div>

        <div className="bg-white rounded-2xl shadow-sm border-t-4 border-t-primary border-x border-b border-gray-100 relative overflow-hidden">
          {/* Mock watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] font-black text-gray-50/40 -rotate-12 pointer-events-none select-none z-0">
            INSURSHIELD
          </div>

          <div className="p-6 relative z-10 border-b border-gray-100 bg-surface-container-low">
            <h3 className="text-[18px] font-bold text-primary">Policy Certificate</h3>
            <div className="text-[12px] font-bold tracking-[0.05em] text-secondary mt-1">
              POLICY NO: POL-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>

          <div className="p-6 space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant block uppercase mb-1">Insured Phone</span>
                <span className="text-[16px] font-semibold text-on-surface">{userPhone || '0970000000'}</span>
              </div>
              <div>
                <span className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant block uppercase mb-1">Vehicle Plate</span>
                <span className="text-[16px] font-semibold text-on-surface">{vehicleDetails?.plateNumber || 'ABC 1234'}</span>
              </div>
              <div>
                <span className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant block uppercase mb-1">Valid From</span>
                <span className="text-[16px] font-semibold text-on-surface">{new Date().toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant block uppercase mb-1">Valid Until</span>
                <span className="text-[16px] font-semibold text-on-surface">
                  {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t border-gray-100 p-4 flex gap-4 relative z-10">
            <button className="flex-1 py-3 bg-white border border-outline-variant text-on-surface-variant font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">download</span> PDF
            </button>
            <button className="flex-1 py-3 bg-white border border-outline-variant text-on-surface-variant font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">share</span> Share
            </button>
          </div>
        </div>

        <button onClick={handleFinish} className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8">
          <span className="material-symbols-outlined text-[20px]">home</span> Return to Home
        </button>
        </>
        )}
      </motion.div>
    </div>
  );
}
