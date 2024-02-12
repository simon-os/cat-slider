import { 
  useEffect, useLayoutEffect, 
  useRef, useState 
} from 'react';
import Slider from './components/slider';
import TextLayout from './components/text-layout';
import Header from './components/header';
import gsap from 'gsap';
import { CatDetails } from './App.types';
import { State } from './lib/store/types';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { 
  transitionStart, transitionEnd 
} from './lib/store/actions';
import { 
  hideDetailsAnimation,
  initialLoadingAnimation, 
  setInitialAnimationPositions, 
  showDetailsAnimation 
} from './animations';
import { useCatBreeds } from './lib/cat-api/cat-api';

const App = () => {
  const { data, isLoading, status, error } = useCatBreeds();
  const [cats, setCats] = useState([] as CatDetails[]);
  const [currentCat, setCurrentCat] = useState<CatDetails>({} as CatDetails);

  const ctxRoot = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>({} as GSAPTimeline);

  const dispatch = useDispatch();
  const isInTransition = useSelector((state: State) => state.isInTransition);

  const textTargets = [
    '.text-container span', 
    '.text-container .text-element'
  ];

  useLayoutEffect(() => {
    setInitialAnimationPositions(textTargets);
    if (isLoading) return;

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        defaults: {
          duration: .6,
          ease: 'Power2.easeInOut' 
        }
      });

      initialLoadingAnimation(tl.current);
    }, ctxRoot);

    return () => ctx.revert();
  }, [isLoading]);

  useEffect(() => {
    if (status === 'success') {
      const cats: CatDetails[] = data.map(({ 
          id, name, image, description 
        }: CatDetails) => ({
          id, name, image, description
        }));
      setCats(cats);
    }

    if (status === 'error') {
      console.error(error);
    }
  }, [status]);

  const handleDetailsOpen = (id: string): void => {
    if (isInTransition) return;
    dispatch(transitionStart());
    
    const targetCat = cats.find((cat) => cat.id === id);
    targetCat && setCurrentCat(targetCat);

    if (!tl.current) return;
    showDetailsAnimation(
      tl.current, 
      textTargets, 
      () => dispatch(transitionEnd())
    );
  };

  const handleDetailsClose = (): void => {
    if (isInTransition) return;
    dispatch(transitionStart());

    hideDetailsAnimation(
      tl.current, 
      textTargets, 
      () => {
        dispatch(transitionEnd());
        setCurrentCat({} as CatDetails);
      }
    );
  };

  const getCatNumber = (cat: CatDetails): number => {
    return cats.findIndex((c) => c.id === cat.id) + 1;
  }

  return (
    <div className="main-wrapper" ref={ctxRoot}>
      <Header />

      <main className="main-layout">
        <TextLayout 
          heading='Gorgeous Fluffy Awesome'
          title='Cats Gallery'
          description='Stunning imagery of truly majestic creatures'
          isMarquee
        />

        <Slider 
          cats={cats} 
          currentCat={currentCat}
          handleDetailsOpen={handleDetailsOpen}
        />

        <TextLayout 
          classList='cat-details'
          heading={getCatNumber(currentCat).toString()}
          title={currentCat.name}
          description={currentCat.description}
          handleDetailsClose={handleDetailsClose}
        />
      </main>

      <div className="loader-background">
        <div className="loader-background__dark"></div>
        <div className="loader-background__light"></div>
      </div>
    </div>
  );
}

export default App;
