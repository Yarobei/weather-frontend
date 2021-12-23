import create from "zustand";

export const useAuthStore = create((set) => ({
  isAuthorized: false,
  setIsAuthorized: (value) => set({ isAuthorized: value }),
  isContentLoading: true,
  setIsContentLoading: (value) => set({ isContentLoading: value }),
}));
