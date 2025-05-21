import { create } from 'zustand';
import { useUserStore } from './user-store'; // adjust the path if needed

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  error: null,

  clearWishlist: () => set({ wishlist: [] }),

  fetchWishlist: async () => {
    const { authUser } = useUserStore.getState();
    if (authUser?.id) {
      try {
        const res = await fetch(`/api/wishlist/${authUser.id}`, {
          method: 'GET'
        });
        if (res.ok) {
          const { wishlist } = await res.json();
          set({ wishlist });
        }
      } catch (err) {
        console.error('Error loading wishlist:', err);
        set({ error: err });
      }
    }
  },

  refreshWishlist: async () => {
    await get().fetchWishlist();
  }
}));
