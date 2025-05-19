import { create } from 'zustand';

export const useWishlistStore = create((set) => ({
  wishlist: [],
  toggleWishlist: (productId) =>
    set((state) => {
      const isInWishlist = state.wishlist.includes(productId);
      return {
        wishlist: isInWishlist
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId]
      };
    }),
}));



export default useWishlistStore;