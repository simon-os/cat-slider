import { useEffect, useState, useContext } from 'react';
import { SliderImage, SliderProps } from './slider.types';
import { CatDetails } from '../../App.types';
import { CatApiServiceContext } from '../../context/cat-api-service-context';
import { CatImage } from '../../services/cat-api-service.types';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { State } from '../../store/types';
import { catImageError, catImageLoaded, catImageRequested } from '../../store/actions';
import Spinner from '../spinner';

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

  const [catsEven, setCatsEven] = useState([] as CatDetails[]);
  const [catsOdd, setCatsOdd] = useState([] as CatDetails[]);
  const [image, setImage] = useState({} as CatImage);

  const dispatch = useDispatch();
  const loading = useSelector((state: State) => state.catImageLoading);
  const catApiService = useContext(CatApiServiceContext);

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
    if (loading) return;
    dispatch(catImageRequested());

    catApiService.getRandomImageOfBreed(currentCat.id)
      .then((res) => {
        setImage(res.data[0])
        dispatch(catImageLoaded());
      })
      .catch((err) => {
        dispatch(catImageError(err));
      });
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
          { loading && <Spinner /> }

          <picture className="slider__full-image">
            {
              !loading &&
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
