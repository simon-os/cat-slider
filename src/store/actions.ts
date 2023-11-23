import { 
  ActionTypes, 
  FETCH_CATS_ERROR, 
  FETCH_CATS_REQUEST,
  FETCH_CATS_SUCCESS,
  FETCH_CAT_IMAGE_REQUEST,
  FETCH_CAT_IMAGE_SUCCESS,
  FETCH_CAT_IMAGE_ERROR,
  START_ANIMATION_TRANSITION,
  END_ANIMATION_TRANSITION,
} from './types';

export const catsRequested = (): ActionTypes => ({
  type: FETCH_CATS_REQUEST
});

export const catsLoaded = (): ActionTypes => ({
  type: FETCH_CATS_SUCCESS
});

export const catsError = (payload: Error): ActionTypes => ({
  type: FETCH_CATS_ERROR,
  payload
});

export const catImageRequested = (): ActionTypes => ({
  type: FETCH_CAT_IMAGE_REQUEST
});

export const catImageLoaded = (): ActionTypes => ({
  type: FETCH_CAT_IMAGE_SUCCESS
});

export const catImageError = (payload: Error): ActionTypes => ({
  type: FETCH_CAT_IMAGE_ERROR,
  payload
});

export const transitionStart = (): ActionTypes => ({
  type: START_ANIMATION_TRANSITION
});

export const transitionEnd = (): ActionTypes => ({
  type: END_ANIMATION_TRANSITION
});
