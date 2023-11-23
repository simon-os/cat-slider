import axios from 'axios';
import { CatApiServiceBreedsResponse, CatImage } from './cat-api-service.types';

const catApiInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': 'live_nxAF3xp8CmIQzwnAaeFqnCImdGSMDNwbR4Qb7tbVDHhCn4rf1Vfoj3dsO7RMYjPZ'
  }
});

class CatApiService {
  getBreeds() {
    return catApiInstance.get<CatApiServiceBreedsResponse[]>('/breeds');
  }

  getRandomImageOfBreed(breedId: string) {
    return catApiInstance.get<CatImage[]>(`/images/search?breed_ids=${breedId}`); 
  }
}

export default CatApiService;
