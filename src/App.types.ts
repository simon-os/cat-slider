import { CatImage } from './lib/cat-api/cat-api.types';

export interface CatDetails {
  id: string,
  name: string, 
  description: string,
  image: CatImage
};
