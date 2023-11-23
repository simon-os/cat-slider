import { 
  ActionTypes,
  FETCH_CATS_ERROR, 
  FETCH_CATS_REQUEST, 
  FETCH_CATS_SUCCESS, 
  FETCH_CAT_IMAGE_ERROR, 
  FETCH_CAT_IMAGE_REQUEST, 
  FETCH_CAT_IMAGE_SUCCESS, 
  START_ANIMATION_TRANSITION,
  END_ANIMATION_TRANSITION,
  State,
} from './types';

const initialState: State = {
  isInTransition: false,
  catsLoading: false,
  catsError: null,
  catImageLoading: false,
  catImageError: null
};

const reducer = (state: State = initialState, action: ActionTypes) => {
  switch (action.type) {
    case FETCH_CATS_REQUEST:
      return {
        ...state,
        catsLoading: true
      }
    case FETCH_CATS_SUCCESS:
      return {
        ...state,
        catsLoading: false
      }
    case FETCH_CATS_ERROR:
      return {
        ...state,
        catsError: action.payload
      }
    case FETCH_CAT_IMAGE_REQUEST:
      return {
        ...state,
        catImageLoading: true
      }
    case FETCH_CAT_IMAGE_SUCCESS:
      return {
        ...state,
        catImageLoading: false
      }
    case FETCH_CAT_IMAGE_ERROR:
      return {
        ...state,
        catImageError: action.payload
      }
    case START_ANIMATION_TRANSITION:
      return {
        ...state,
        isInTransition: true
      }
    case END_ANIMATION_TRANSITION:
      return {
        ...state,
        isInTransition: false
      }
    default: 
      return state;
  }
}

export default reducer;
