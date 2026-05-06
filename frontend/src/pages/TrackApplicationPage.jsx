import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function TrackApplicationPage() {
  const navigate = useNavigate();
  const { setMockInsurers } = useStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plate, setPlate] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate finding the application and sending OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate verifying OTP and redirecting to the active session
    setTimeout(() => {
      setLoading(false);
      setMockInsurers([
        { id: '1', name: 'Prestige Assurance', coverage: 'Comprehensive Gold Plan', price: 1240, inspectionRules: 'NOT REQUIRED', timing: 'AFTER PAYMENT', method: 'SELF-CAPTURE', icon: 'verified', isBestValue: true },
        { id: '2', name: 'Global Guard', coverage: 'Elite Security Policy', price: 985.50, inspectionRules: 'REQUIRED', timing: 'BEFORE QUOTATION', method: 'PHYSICAL', icon: 'shield', isBestValue: false }
      ]);
      
      navigate('/quotes-comparison'); 
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">track_changes</span>
          </div>
          <h2 className="text-[24px] font-bold text-primary">Track Application</h2>
          <p className="text-[14px] text-on-surface-variant">Recover your active tracking link securely.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase mb-2 block">Vehicle Plate Number</label>
                  <input 
                    required
                    value={plate}
                    onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] focus:ring-2 focus:ring-primary uppercase tracking-widest font-bold" 
                    placeholder="e.g. BAA 1234" 
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase mb-2 block">Registered Phone Number</label>
                  <input 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] focus:ring-2 focus:ring-primary" 
                    placeholder="0970000000" 
                    type="tel"
                  />
                </div>
                
                <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-xl shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 mt-4">
                  {loading ? (
                    <><span className="material-symbols-outlined animate-spin">sync</span> Searching...</>
                  ) : (
                    <><span className="material-symbols-outlined">send_to_mobile</span> Send OTP Code</>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} onSubmit={handleVerifyOtp} className="space-y-6 text-center">
                <div>
                  <p className="text-[14px] text-on-surface-variant mb-6">
                    We've sent a 4-digit verification code to <br/><strong className="text-primary">{phone}</strong>
                  </p>
                  <div className="flex justify-center gap-3 mb-8">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-14 h-16 text-center text-2xl font-bold bg-surface-container-low border border-outline-variant rounded-xl focus:border-primary focus:ring-2 focus:ring-primary outline-none"
                        maxLength="1"
                        required
                      />
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-xl shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2">
                  {loading ? (
                    <><span className="material-symbols-outlined animate-spin">sync</span> Verifying...</>
                  ) : (
                    <><span className="material-symbols-outlined">verified</span> Open Tracking Link</>
                  )}
                </button>
                <button type="button" onClick={() => setStep(1)} className="text-[12px] font-semibold text-primary hover:underline mt-4">
                  Change Phone Number
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
