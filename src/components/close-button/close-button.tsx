import { ComponentProps, MouseEventHandler } from 'react';

type Props = {
  classList?: string,
  handleClose: MouseEventHandler<HTMLButtonElement>
} & ComponentProps<'button'>;

export default function CloseButton({ classList, handleClose }: Props) {
  return (
    <button 
      className={'close-button' + (classList ? ` ${classList}` : '')}
      onClick={handleClose}
    >
      <svg version="1.1" width="64px" height="64px" viewBox="0 0 65 65">
        <path fill='#FFF' d="M32,0C14.327,0,0,14.327,0,32s14.327,32,32,32s32-14.327,32-32S49.673,0,32,0z M32,62.001C15.432,62.001,2,48.568,2,32
          C2,15.432,15.432,2,32,2c16.568,0,30,13.432,30,30C62,48.568,48.568,62.001,32,62.001z"/>
        <polygon fill='#FFF' points="41.191,24.222 39.777,22.808 32,30.586 24.222,22.808 22.808,24.222 30.586,32 22.808,39.777 24.222,41.191 
          32,33.414 39.777,41.191 41.191,39.777 33.414,32"/>
      </svg>
    </button>
  );
}
