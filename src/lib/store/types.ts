export const START_ANIMATION_TRANSITION = 'START_ANIMATION_TRANSITION';
export const END_ANIMATION_TRANSITION = 'END_ANIMATION_TRANSITION';

export type ActionTypes = 
  | { type: typeof START_ANIMATION_TRANSITION }
  | { type: typeof END_ANIMATION_TRANSITION }

export interface State {
  isInTransition: boolean,
}
