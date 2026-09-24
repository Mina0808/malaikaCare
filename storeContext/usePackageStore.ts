// usePackageStore.ts
import { create } from 'zustand';

interface PackageState {
  packgeCreated: any; // Définir le type selon ton objet
  setPackgeCreated: (packge: any) => void;
}

export const usePackageStore = create<PackageState>((set) => ({
  packgeCreated: null,
  setPackgeCreated: (packgeCreated) => set({ packgeCreated }),
}));
