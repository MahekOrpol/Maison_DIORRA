// use-filter-store.js
import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  stateMetals: [],
  stateStyles: [],
  stateShapes: [],
  sortByPrice: '',
  setStateMetals: (values) => set({ stateMetals: values }),
  setStateStyles: (values) => set({ stateStyles: values }),
  setStateShapes: (values) => set({ stateShapes: values }),
  setSortByPrice: (value) => set({ sortByPrice: value }),
  resetFilters: () =>
    set({ stateMetals: [], stateStyles: [], stateShapes: [], sortByPrice: '' })
}));
