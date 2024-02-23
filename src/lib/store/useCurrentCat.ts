import { create } from 'zustand';
import { CatDetails } from '../cat-api/cat-api.types';

interface State {
  currentCat: CatDetails,
  setCurrentCat: (value: CatDetails) => void
};

export const useCurrentCat = create<State>((set) => ({
  currentCat: {} as CatDetails,
  setCurrentCat: (value: CatDetails) => set(() => ({ currentCat: value }))
}));
