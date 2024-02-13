import { create } from 'zustand';

interface State {
  isInTransition: boolean,
  setInTransition: (value: boolean) => void
};

export const useInTransition = create<State>((set) => ({
  isInTransition: false,
  setInTransition: (value: boolean) => set(() => ({ isInTransition: value }))
}));
