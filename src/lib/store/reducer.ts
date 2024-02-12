import { 
  ActionTypes,
  START_ANIMATION_TRANSITION,
  END_ANIMATION_TRANSITION,
  State,
} from './types';

const initialState: State = {
  isInTransition: false,
};

const reducer = (state: State = initialState, action: ActionTypes) => {
  switch (action.type) {
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
