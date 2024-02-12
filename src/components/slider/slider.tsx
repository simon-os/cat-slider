import { useEffect, useState } from 'react';
import { SliderImage, SliderProps } from './slider.types';
import { CatDetails } from '../../App.types';
import { CatImage } from '../../lib/cat-api/cat-api.types';
import Spinner from '../spinner';
import { useRandomImageOfBreed } from '../../lib/cat-api/cat-api';
import { useQueryClient } from '@tanstack/react-query';

const Image = ({ id, url, name, handleDetailsOpen }: SliderImage) => {
  return (
    <picture 
      className="slider__image"
      onClick={() => handleDetailsOpen(id)}
    >
      <img src={url} alt={name} />
    </picture>
  );
};

const Slider = ({ cats, currentCat, handleDetailsOpen }: SliderProps) => {
  const queryClient = useQueryClient();
  const { data, isRefetching, status, error } = useRandomImageOfBreed(currentCat.id);
  
  const [catsEven, setCatsEven] = useState([] as CatDetails[]);
  const [catsOdd, setCatsOdd] = useState([] as CatDetails[]);
  const [image, setImage] = useState({} as CatImage);

  useEffect(() => {
    setImage(currentCat.image);
  }, [currentCat]);

  useEffect(() => {
    const even = cats.filter((_, idx) => idx % 2 === 0);
    const odd = cats.filter((_, idx) => idx % 2 !== 0);
    setCatsEven(even);
    setCatsOdd(odd);
  }, [cats]);

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
            { catsEven.map(renderImage) }
          </div>

          <div className="slider__col slider__col-right">
            { catsOdd.map(renderImage) }
          </div>
        </div>
      </div>

      {
        currentCat && 
        (<>
          { isRefetching && <Spinner /> }

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

export default Slider;
