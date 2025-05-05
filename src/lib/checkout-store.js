import { sampleCart } from '@/constants/data';
import { create } from 'zustand';

export const useCheckoutStore = create((set) => ({
  step: 1, // Default to first step
  cart: sampleCart,
  address: null,
  paymentMethod: null,
  setStep: (step) => set({ step }),
  setCart: (cart) => set({ cart }),
  setAddress: (address) => set({ address }),
  setPaymentMethod: (method) => set({ paymentMethod: method })
}));
