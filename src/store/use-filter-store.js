// stores/useProductFilter.js
import { create } from 'zustand';

const initialState = {
  metalPurity: '',
  style: '',
  shape: '',
  sortByPrice: ''
};

export const useFilterStore = create((set) => ({
  ...initialState,
  setMetalPurity: (val) => set({ metalPurity: val }),
  setStyle: (val) => set({ style: val }),
  setShape: (val) => set({ shape: val }),
  setSortByPrice: (val) => set({ sortByPrice: val }),
  resetFilters: () => set(initialState)
}));
