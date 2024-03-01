import { create } from "zustand";

interface NavDropdownState {
  isOpen: boolean;
  toggle: (state: boolean) => void;
}

const navDropdownStore = create<NavDropdownState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default navDropdownStore;
