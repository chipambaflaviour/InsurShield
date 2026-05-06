import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { motion } from 'framer-motion';

export default function VehicleIdentificationPage() {
  const [plateNumber, setPlateNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retrievedVehicle, setRetrievedVehicle] = useState(null);
  const navigate = useNavigate();
  const { setVehicleDetails } = useStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!plateNumber) return;
    
    setLoading(true);
    setError('');

    // Simulate RTSA API Lookup
    setTimeout(() => {
      setLoading(false);
      if (plateNumber.length > 4) {
        setRetrievedVehicle({
          plateNumber: plateNumber.toUpperCase(),
          make: 'Toyota',
          model: 'Hilux',
          year: '2020',
          color: 'White',
          chassisNumber: 'JT111222333444555',
        });
      } else {
        setError('Vehicle not found in RTSA database. Please check the plate number.');
      }
    }, 1500);
  };

  const handleConfirm = () => {
    if (retrievedVehicle) {
      setVehicleDetails(retrievedVehicle);
      navigate('/vehicle-usage');
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-6 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg mx-auto">
        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">directions_car</span>
            </div>
            <CardTitle className="text-2xl mb-2">Vehicle Identification</CardTitle>
            <CardDescription>
              {retrievedVehicle 
                ? "Verify the details retrieved from RTSA."
                : "Enter your vehicle's license plate number to automatically retrieve details from RTSA."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!retrievedVehicle && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-600 mt-0.5 text-[20px]">info</span>
                  <div>
                    <h4 className="text-[14px] font-bold text-amber-900">Preparation Notice</h4>
                    <p className="text-[12px] text-amber-800 mt-1">To process your request later, all insurers require live pictures of your <strong>White Book</strong> and <strong>Driver's License</strong>. Please ensure you have the physical documents ready to capture.</p>
                  </div>
                </div>
              </div>
            )}
            {!retrievedVehicle ? (
              <>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="space-y-2">
                    <Input 
                      type="text" 
                      placeholder="e.g. BAA 1234" 
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                      required
                      className="text-center text-2xl tracking-widest font-bold uppercase"
                    />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={!plateNumber || loading}>
                    {loading ? 'Searching RTSA Database...' : 'Find Vehicle'}
                  </Button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500 mb-4">Cannot find your vehicle?</p>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/vehicle-usage')}>
                    Enter Details Manually
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="bg-surface-container-low p-6 rounded-xl border border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12px] text-on-surface-variant font-medium">Plate Number</p>
                      <p className="font-bold text-lg text-primary">{retrievedVehicle.plateNumber}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-on-surface-variant font-medium">Make & Model</p>
                      <p className="font-semibold text-on-surface">{retrievedVehicle.make} {retrievedVehicle.model}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-on-surface-variant font-medium">Year</p>
                      <p className="font-semibold text-on-surface">{retrievedVehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-on-surface-variant font-medium">Color</p>
                      <p className="font-semibold text-on-surface">{retrievedVehicle.color}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[12px] text-on-surface-variant font-medium">Chassis Number</p>
                      <p className="font-semibold text-on-surface">{retrievedVehicle.chassisNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => setRetrievedVehicle(null)}>
                    Wrong Vehicle
                  </Button>
                  <Button className="flex-[2]" onClick={handleConfirm}>
                    Confirm & Continue
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
