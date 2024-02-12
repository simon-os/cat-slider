import axios from 'axios';
import { CatApiServiceBreedsResponse, CatImage } from './cat-api.types';
import { useQuery } from '@tanstack/react-query';

const catApiInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': 'live_nxAF3xp8CmIQzwnAaeFqnCImdGSMDNwbR4Qb7tbVDHhCn4rf1Vfoj3dsO7RMYjPZ'
  }
});

export function useCatBreeds() {
  return useQuery({
    queryKey: ['cat-breeds'],
    queryFn: () => catApiInstance
                    .get<CatApiServiceBreedsResponse[]>('/breeds')
                    .then((res) => res.data),
  });
}

export function useRandomImageOfBreed(breedId: string) {
  return useQuery({
    enabled: !!breedId,
    queryKey: ['cat-breed', breedId],
    queryFn: () => catApiInstance
                    .get<CatImage[]>(`/images/search?breed_ids=${breedId}`)
                    .then((res) => res.data),
  });
}
