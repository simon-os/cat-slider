export const FETCH_CATS_REQUEST = 'FETCH_CATS_REQUEST';
export const FETCH_CATS_SUCCESS = 'FETCH_CATS_SUCCESS';
export const FETCH_CATS_ERROR = 'FETCH_CATS_ERROR';
export const FETCH_CAT_IMAGE_REQUEST = 'FETCH_CAT_IMAGE_REQUEST';
export const FETCH_CAT_IMAGE_SUCCESS = 'FETCH_CAT_IMAGE_SUCCESS';
export const FETCH_CAT_IMAGE_ERROR = 'FETCH_CAT_IMAGE_ERROR';
export const START_ANIMATION_TRANSITION = 'START_ANIMATION_TRANSITION';
export const END_ANIMATION_TRANSITION = 'END_ANIMATION_TRANSITION';

export type ActionTypes = 
  | { type: typeof FETCH_CATS_REQUEST }
  | { type: typeof FETCH_CATS_SUCCESS }
  | { type: typeof FETCH_CATS_ERROR, payload: Error }
  | { type: typeof FETCH_CAT_IMAGE_REQUEST }
  | { type: typeof FETCH_CAT_IMAGE_SUCCESS }
  | { type: typeof FETCH_CAT_IMAGE_ERROR, payload: Error }
  | { type: typeof START_ANIMATION_TRANSITION }
  | { type: typeof END_ANIMATION_TRANSITION }

export interface State {
  isInTransition: boolean,
  catsLoading: boolean,
  catsError: Error | null,
  catImageLoading: boolean,
  catImageError: Error | null
}
