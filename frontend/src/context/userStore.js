// src/context/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  
  logout: () => {
    localStorage.removeItem("token"); // remove token from storage
    set({ user: null });
  }
}));
