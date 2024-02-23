import { useEffect, useState } from 'react';
import { CatDetails, CatImage } from '../../lib/cat-api/cat-api.types';
import { useRandomImageOfBreed } from '../../lib/cat-api/cat-api';
import { useQueryClient } from '@tanstack/react-query';
import { useInTransition } from '../../lib/store/useInTransition';
import Spinner from '../spinner';

interface SliderProps {
  cats: CatDetails[],
  currentCat: CatDetails,
  handleDetailsOpen: (id: string) => void
};

interface SliderImage {
  id: string, 
  url: string, 
  name: string,
  handleDetailsOpen: (id: string) => void
};

const splitCatsArray = (cats: CatDetails[]) => {
  return {
    even: cats.filter((_, idx) => idx % 2 === 0),
    odd: cats.filter((_, idx) => idx % 2 !== 0)
  } ?? [];
};

function Image({ id, url, name, handleDetailsOpen }: SliderImage) {
  return (
    <picture 
      className="slider__image"
      onClick={() => handleDetailsOpen(id)}
    >
      <img src={url} alt={name} />
    </picture>
  );
}

export default function Slider({ 
  cats, currentCat, 
  handleDetailsOpen 
}: SliderProps) {
  
  const queryClient = useQueryClient();
  const { isInTransition } = useInTransition();
  const [image, setImage] = useState<CatImage>();
  const { data, isRefetching, status, error } = useRandomImageOfBreed(currentCat.id);

  useEffect(() => {
    setImage(currentCat.image);
  }, [currentCat]);

  const handleLoadRandomImage = (): void => {
    if (isRefetching) return;

    if (status === 'success') {
      setImage(data[0]);
      queryClient.invalidateQueries({ 
        queryKey: ['cat-breed', currentCat.id] 
      });
    } 
    else if (status === 'error') {
      console.error(error);
    }
  };

  const renderImage = ({ id, image, name }: CatDetails) => {
    if (image && image.url) {
      return <Image 
        id={id} 
        key={id}
        url={image?.url}
        name={name}
        handleDetailsOpen={handleDetailsOpen}
      />
    }
  };

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <div className="slider__layout">
          <div className="slider__col slider__col-left">
            { splitCatsArray(cats).even.map(renderImage) }
          </div>

          <div className="slider__col slider__col-right">
            { splitCatsArray(cats).odd.map(renderImage) }
          </div>
        </div>
      </div>

      {
        currentCat && 
          (<>
            { (!isInTransition && isRefetching) && <Spinner /> }

            <picture className="slider__full-image">
              {
                !isRefetching &&
                  <img 
                    src={image?.url} 
                    alt={currentCat.name} 
                  />
              }
            </picture>

            <button 
              className="slider__random-image-button"
              onClick={handleLoadRandomImage}
            >
              <span>Load New</span>
            </button>
          </>)
      }
    </div>
  );
};
