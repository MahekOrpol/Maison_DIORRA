import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  isLoading: false,
  error: null,

  setWishlist: (items) => set({ wishlist: items }),

  addToWishlist: (productId) => {
    const updated = [...get().wishlist, productId];
    set({ wishlist: updated });
  },

  removeFromWishlist: (productId) => {
    const updated = get().wishlist.filter((id) => id !== productId);
    set({ wishlist: updated });
  },

  toggleWishlist: (productId) => {
    const exists = get().wishlist.includes(productId);
    if (exists) {
      get().removeFromWishlist(productId);
    } else {
      get().addToWishlist(productId);
    }
  },

  hydrateWishlist: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/wishlist/${userId}`, {
        method: 'GET'
      });
      if (res.ok) {
        const { wishlist } = await res.json();
        set({ wishlist });
      }
    } catch (err) {
      console.error('Error loading wishlist:', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  }
}));
