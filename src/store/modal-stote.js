import { create } from 'zustand';

export const useModalStore = create((set) => ({
  // General modal/drawer state
  modals: {}, // available modals : "wishlist-" |
  //   drawers: {},

  // Methods to toggle modal
  openModal: (modalKey, data = null) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalKey]: { open: true, data }
      }
    })),
  closeModal: (modalKey) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalKey]: { open: false, data: null }
      }
    }))

  // Methods to toggle drawer
  //   openDrawer: (drawerKey, data = null) =>
  //     set((state) => ({
  //       drawers: {
  //         ...state.drawers,
  //         [drawerKey]: { open: true, data }
  //       }
  //     })),
  //   closeDrawer: (drawerKey) =>
  //     set((state) => ({
  //       drawers: {
  //         ...state.drawers,
  //         [drawerKey]: { open: false, data: null }
  //       }
  //     }))
}));
