import { 
  useEffect, useLayoutEffect, 
  useRef, useState 
} from 'react';
import Slider from './components/slider';
import TextLayout from './components/text-layout';
import Header from './components/header';
import gsap from 'gsap';
import { CatDetails } from './App.types';
import { useCatBreeds } from './lib/cat-api/cat-api';
import { useInTransition } from './lib/store/useInTransition';
import { 
  hideDetailsAnimation,
  initialLoadingAnimation, 
  setInitialAnimationPositions, 
  showDetailsAnimation 
} from './animations';

const App = () => {
  const { data, isLoading, status, error } = useCatBreeds();
  const [cats, setCats] = useState([] as CatDetails[]);
  const [currentCat, setCurrentCat] = useState<CatDetails>({} as CatDetails);
  
  const { isInTransition, setInTransition } = useInTransition();
  const ctxRoot = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>({} as GSAPTimeline);

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
    setInTransition(true);
    
    const targetCat = cats.find((cat) => cat.id === id);
    targetCat && setCurrentCat(targetCat);

    if (!tl.current) return;
    showDetailsAnimation(
      tl.current, 
      textTargets, 
      () => setInTransition(false)
    );
  };

  const handleDetailsClose = (): void => {
    if (isInTransition) return;
    setInTransition(true);

    hideDetailsAnimation(
      tl.current, 
      textTargets, 
      () => {
        setInTransition(false);
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
