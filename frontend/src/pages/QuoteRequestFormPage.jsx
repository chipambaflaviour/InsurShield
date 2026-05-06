import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function QuoteRequestFormPage() {
  const navigate = useNavigate();
  const { vehicleDetails, insuranceType, selectedInsurers, documents, setDocument, setQuoteStatus } = useStore();
  const [currency, setCurrency] = useState('ZMW');

  const safeInsurers = selectedInsurers || [];
  const inspectionRequired = safeInsurers.some(i => i.inspectionRules === 'REQUIRED');
  const inspectionOptional = safeInsurers.some(i => i.inspectionRules === 'OPTIONAL');

  const handleFileUpload = (type, e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setDocument(type, url);
    }
  };

  const UploadBox = ({ title, type }) => (
    <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:border-primary/50 transition-colors relative bg-surface-container-low">
      {documents[type] ? (
        <div className="space-y-2">
          <div className="flex justify-center text-green-500">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <p className="text-[14px] font-semibold text-on-surface">Uploaded Successfully</p>
          <img src={documents[type]} alt={title} className="mt-2 h-24 object-cover mx-auto rounded-lg shadow-sm" />
          <button type="button" className="mt-2 text-[12px] font-semibold text-primary hover:underline" onClick={() => setDocument(type, null)}>
            Retake / Re-upload
          </button>
        </div>
      ) : (
        <label className="cursor-pointer flex flex-col items-center space-y-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary transition-transform hover:scale-110">
            <span className="material-symbols-outlined text-[24px]">photo_camera</span>
          </div>
          <span className="text-[14px] font-semibold text-on-surface">{title}</span>
          <span className="text-[12px] text-on-surface-variant">Click to capture or upload</span>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            onChange={(e) => handleFileUpload(type, e)}
          />
        </label>
      )}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!documents.whiteBook || !documents.driversLicense) {
      alert("Please upload the required White Book and Driver's License documents to proceed.");
      return;
    }
    setQuoteStatus('pending');
    navigate('/waiting');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 px-4 md:px-8">
      {/* Left Column: Form */}
      <section className="lg:col-span-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-[24px] font-bold text-primary mb-2">Finalize Your Quote Request</h2>
            <p className="text-[16px] text-on-surface-variant">Please provide your contact details to receive your personalized insurance proposals.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase mb-2 block">Full Name</label>
                <input 
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                  placeholder="e.g. Alex Sterling" 
                  type="text"
                />
              </div>
              <div>
                <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase mb-2 block">Email Address</label>
                <input 
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                  placeholder="e.g. alex.sterling@email.com" 
                  type="email"
                />
              </div>
              <div>
                <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase mb-2 block">Phone Number</label>
                <input 
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-[16px] focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                  placeholder="+260 970 000 000" 
                  type="tel"
                />
              </div>
            </div>
            
            <hr className="border-gray-100"/>
            
            {/* Required Documents */}
            <div>
              <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase mb-4 block">Required Documents</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UploadBox title="White Book" type="whiteBook" />
                <UploadBox title="Driver's License" type="driversLicense" />
              </div>
            </div>

            {/* Conditional Inspection Documents */}
            {inspectionRequired && (
              <div>
                <label className="text-[12px] font-bold tracking-[0.05em] text-[#1a237e] uppercase mb-4 block flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3f51b5] text-sm">info</span>
                  Vehicle Inspection Required
                </label>
                <div className="bg-[#e8eaf6]/30 rounded-xl p-4 border border-[#e8eaf6] grid grid-cols-2 gap-4">
                  <UploadBox title="Front View" type="insp_front" />
                  <UploadBox title="Back View" type="insp_back" />
                  <UploadBox title="Left Side" type="insp_left" />
                  <UploadBox title="Right Side" type="insp_right" />
                  <div className="col-span-2">
                    <UploadBox title="Dashboard / Mileage" type="insp_mileage" />
                  </div>
                </div>
              </div>
            )}

            {inspectionOptional && !inspectionRequired && (
              <div>
                <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase mb-4 block">Optional Vehicle Inspection</label>
                <div className="bg-surface-container-low rounded-xl p-4 border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 text-[14px] text-on-surface-variant">
                    Some selected insurers offer better rates with an upfront inspection. You can upload photos now or do it later.
                  </div>
                  <button type="button" className="px-6 py-2 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors">
                    Upload Photos Now
                  </button>
                </div>
              </div>
            )}

            <hr className="border-gray-100"/>
            
            {/* Currency Selection */}
            <div>
              <label className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase mb-4 block">Preferred Currency</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1 cursor-pointer">
                  <input 
                    checked={currency === 'ZMW'} 
                    onChange={() => setCurrency('ZMW')} 
                    className="sr-only peer" 
                    name="currency" 
                    type="radio" 
                    value="ZMW"
                  />
                  <div className="flex items-center justify-between p-4 border border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary-fixed/30 hover:bg-gray-50 transition-all">
                    <span className="text-[16px] font-semibold text-primary">Zambian Kwacha (ZMW)</span>
                    {currency === 'ZMW' ? (
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    ) : (
                      <div className="w-6 h-6 border-2 border-outline-variant rounded-full"></div>
                    )}
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input 
                    checked={currency === 'USD'} 
                    onChange={() => setCurrency('USD')} 
                    className="sr-only peer" 
                    name="currency" 
                    type="radio" 
                    value="USD"
                  />
                  <div className="flex items-center justify-between p-4 border border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary-fixed/30 hover:bg-gray-50 transition-all">
                    <span className="text-[16px] font-semibold text-primary">US Dollar (USD)</span>
                    {currency === 'USD' ? (
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    ) : (
                      <div className="w-6 h-6 border-2 border-outline-variant rounded-full"></div>
                    )}
                  </div>
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
              >
                <span>Submit Request</span>
                <span className="material-symbols-outlined">send</span>
              </button>
              <p className="text-center text-[14px] text-on-surface-variant mt-4">
                By submitting, you agree to our <a className="text-primary font-semibold underline" href="#">Terms of Service</a> and <a className="text-primary font-semibold underline" href="#">Privacy Policy</a>.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Right Column: Summary Card */}
      <aside className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
          <div className="h-40 relative">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Vehicle"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.05em]">Pending Quote</span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-[20px] font-semibold text-primary mb-4">Vehicle Summary</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">directions_car</span>
                <div>
                  <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Vehicle Model</p>
                  <p className="text-[16px] font-semibold">{vehicleDetails ? `${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model}` : '2020 Toyota Hilux'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">tag</span>
                <div>
                  <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Registration</p>
                  <p className="text-[16px] font-semibold">{vehicleDetails ? vehicleDetails.plateNumber : 'BAA 1234'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">payments</span>
                <div>
                  <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Estimated Value</p>
                  <p className="text-[16px] font-semibold">{currency === 'ZMW' ? 'ZMW 450,000.00' : '$17,500.00'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">shield</span>
                <div>
                  <p className="text-[12px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Coverage Type</p>
                  <p className="text-[16px] font-semibold">{insuranceType || 'Comprehensive'}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button 
                onClick={() => navigate('/vehicle-identification')}
                className="w-full text-[16px] font-semibold text-on-surface-variant hover:text-primary flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined">edit</span>
                <span>Edit Vehicle Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="bg-[#ffdad4]/20 p-4 rounded-xl flex items-center gap-4 border border-[#ffdad4]/40">
          <span className="material-symbols-outlined text-primary text-3xl">verified</span>
          <div>
            <p className="text-[14px] font-semibold text-primary">InsurShield Protected</p>
            <p className="text-[12px] text-on-surface-variant">Your data is encrypted and handled with bank-grade security protocols.</p>
          </div>
        </div>
      </aside>
    </motion.div>
  );
}
