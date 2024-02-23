import Marquee from 'react-fast-marquee';
import CloseButton from '../close-button';

interface Props {
  heading: string,
  title: string,
  description: string,
  isMarquee?: boolean,
  classList?: string,
  handleDetailsClose?: () => void
}

export default function Layout({ 
  heading, title, description, 
  isMarquee, classList, handleDetailsClose
}: Props) {

  const headingEl = <h1>{heading}</h1>;

  return (
    <div className={'layout' + (classList ? ` ${classList}` : '')}>
      <div className="layout__heading text-container">
        <div className="text-element">
          {
            isMarquee 
              ? <Marquee speed={100} autoFill>{headingEl}</Marquee>
              : headingEl
          }
        </div>
      </div>

      <h2 className="layout__title text-container">
        <span>{title}</span>
      </h2>

      <p className="layout__description text-container">
        <span>{description}</span>
      </p>

      {
        handleDetailsClose && 
          <CloseButton 
            handleClose={handleDetailsClose} 
            classList="cat-details__close-button" 
          />
      }
    </div>
  );
};
