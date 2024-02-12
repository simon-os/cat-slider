import { 
  ActionTypes, 
  START_ANIMATION_TRANSITION,
  END_ANIMATION_TRANSITION,
} from './types';

export const transitionStart = (): ActionTypes => ({
  type: START_ANIMATION_TRANSITION
});

export const transitionEnd = (): ActionTypes => ({
  type: END_ANIMATION_TRANSITION
});
