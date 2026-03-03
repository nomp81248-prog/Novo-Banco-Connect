import { create } from "zustand";

interface AppState {
  hasNotification: boolean;
  triggerNotification: () => void;
  clearNotification: () => void;
  avatarUrl: string | null;
  setAvatarUrl: (url: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasNotification: false,
  triggerNotification: () => set({ hasNotification: true }),
  clearNotification: () => set({ hasNotification: false }),
  avatarUrl: null,
  setAvatarUrl: (url) => set({ avatarUrl: url }),
}));
