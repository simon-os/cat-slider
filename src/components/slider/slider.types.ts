import { CatDetails } from '../../App.types';

export interface SliderProps {
  cats: CatDetails[],
  currentCat: CatDetails,
  handleDetailsOpen: (id: string) => void
};

export interface SliderImage {
  id: string, 
  url: string, 
  name: string,
  handleDetailsOpen: (id: string) => void
};
