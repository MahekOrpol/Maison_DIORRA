import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  authUser: null,
  isLoggedIn: false,

  setUser: (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    set({ authUser: user, isLoggedIn: true });
  },

  hydrateUser: () => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      set({ authUser: parsedUser, isLoggedIn: true });
      return parsedUser;
    } else {
      set({ authUser: null }); // Ensure it's cleared
      return null;
    }
  },

  clearUser: () => {
    localStorage.removeItem('authUser');
    set({ authUser: null, isLoggedIn: false });
  }
}));
