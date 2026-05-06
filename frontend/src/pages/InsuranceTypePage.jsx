import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Card, CardContent } from '../components/ui/Card';
import { motion } from 'framer-motion';

export default function InsuranceTypePage() {
  const navigate = useNavigate();
  const { setInsuranceType } = useStore();

  const handleSelect = (type) => {
    setInsuranceType(type);
    navigate('/vehicle-identification');
  };

  return (
    <div className="flex flex-col items-center py-12 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-bold text-primary mb-2">Select Coverage Type</h2>
          <p className="text-[16px] text-gray-500">
            Choose the level of protection that suits your needs.
          </p>
        </div>

        <div className="space-y-4">
          <Card 
            className="cursor-pointer border-2 border-transparent hover:border-primary hover:shadow-md transition-all group"
            onClick={() => handleSelect('Comprehensive')}
          >
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl">verified_user</span>
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-primary mb-1">Comprehensive</h3>
                <p className="text-[14px] text-on-surface-variant mb-3">Highest level of protection. Covers your vehicle and third-party liabilities against accidents, fire, and theft.</p>
                <div className="flex gap-2">
                  <span className="bg-primary-fixed text-primary text-xs font-bold px-2 py-1 rounded">Recommended</span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Full Coverage</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer border-2 border-transparent hover:border-primary hover:shadow-md transition-all group"
            onClick={() => handleSelect('ThirdParty')}
          >
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-gray-500 group-hover:text-white text-2xl">shield</span>
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-on-surface mb-1">Third Party Only (TPO)</h3>
                <p className="text-[14px] text-on-surface-variant mb-3">Minimum legal requirement. Covers damages and injuries you cause to others, but not your own vehicle.</p>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Basic</span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Legal Minimum</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </motion.div>
    </div>
  );
}
