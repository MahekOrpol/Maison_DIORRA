import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

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

// implement persist later , instead of direct local storage useage...  by manually testing all working things..
// export const useUserStore = create(
//   persist(
//     (set) => ({
//       authUser: null,
//       isLoggedIn: false,

//       setUser: (user) => {
//         set({ authUser: user, isLoggedIn: true });
//       },

//       clearUser: () => {
//         set({ authUser: null, isLoggedIn: false });
//       }
//     }),
//     {
//       name: 'auth-user-storage', // key in localStorage
//       partialize: (state) => ({
//         authUser: state.authUser,
//         isLoggedIn: state.isLoggedIn
//       })
//     }
//   )
// );
