import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { motion } from 'framer-motion';

export default function PhoneVerificationPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserPhone } = useStore();

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUserPhone(phone);
      navigate('/vehicle-identification');
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center py-12 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl mb-2">{step === 'phone' ? 'Welcome' : 'Verify Phone'}</CardTitle>
            <CardDescription>
              {step === 'phone' 
                ? 'Enter your mobile number to get started.' 
                : `We sent a 4-digit code to ${phone}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Input 
                    type="tel" 
                    placeholder="e.g. 0970000000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={!phone || loading}>
                  {loading ? 'Sending...' : 'Continue'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Input 
                    type="text" 
                    placeholder="Enter OTP (e.g. 1234)" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={4}
                    className="text-center text-xl tracking-widest"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={otp.length < 4 || loading}>
                  {loading ? 'Verifying...' : 'Verify & Proceed'}
                </Button>
                <p className="text-center text-sm text-gray-500 cursor-pointer hover:text-primary mt-4">
                  Resend Code
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
