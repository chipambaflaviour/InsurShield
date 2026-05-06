import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      userPhone: '',
      setUserPhone: (phone) => set({ userPhone: phone }),

      vehicleDetails: null,
      setVehicleDetails: (details) => set({ vehicleDetails: details }),

      vehicleUsage: '',
      setVehicleUsage: (usage) => set({ vehicleUsage: usage }),

      insuranceType: '',
      setInsuranceType: (type) => set({ insuranceType: type }),

      insurersList: [
        { id: '1', name: 'Prestige Assurance', coverage: 'Comprehensive Gold Plan', price: 1240, status: 'Active' },
        { id: '2', name: 'Global Guard', coverage: 'Elite Security Policy', price: 985.50, status: 'Active' },
      ],
      addInsurer: (insurer) => set((state) => ({ 
        insurersList: [...state.insurersList, { ...insurer, id: Date.now().toString() }] 
      })),

      selectedInsurers: [],
      setMockInsurers: (insurers) => set({ selectedInsurers: insurers }),
      toggleInsurer: (insurer) => set((state) => {
        const isSelected = state.selectedInsurers.some(i => i.id === insurer.id);
        if (isSelected) {
          return { selectedInsurers: state.selectedInsurers.filter(i => i.id !== insurer.id) };
        } else {
          if (state.selectedInsurers.length < 5) {
            return { selectedInsurers: [...state.selectedInsurers, insurer] };
          }
          return state;
        }
      }),
      clearInsurers: () => set({ selectedInsurers: [] }),

      quoteStatus: 'idle', // idle, requesting, waiting, received
      setQuoteStatus: (status) => set({ quoteStatus: status }),

      selectedQuote: null,
      setSelectedQuote: (quote) => set({ selectedQuote: quote }),

      documents: {
        whiteBook: null,
        driversLicense: null,
        insp_front: null,
        insp_back: null,
        insp_left: null,
        insp_right: null,
        insp_mileage: null
      },
      setDocument: (type, url) => set((state) => ({
        documents: { ...state.documents, [type]: url }
      })),

      resetStore: () => set({
        userPhone: '',
        vehicleDetails: null,
        vehicleUsage: '',
        insuranceType: '',
        selectedInsurers: [],
        quoteStatus: 'idle',
      }),
    }),
    {
      name: 'insurshield-storage',
    }
  )
);
