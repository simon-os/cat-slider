import { createContext } from 'react';
import CatApiService from '../services/cat-api-service';

export const CatApiServiceContext = createContext({} as CatApiService);
