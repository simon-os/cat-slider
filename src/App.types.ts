import { CatImage } from './services/cat-api-service.types';

export interface CatDetails {
  id: string,
  name: string, 
  description: string,
  image: CatImage
};
