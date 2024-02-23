import { 
  useEffect, useLayoutEffect, 
  useRef, useState 
} from 'react';
import Slider from './components/slider';
import Header from './components/header';
import gsap from 'gsap';
import { useCatBreeds } from './lib/cat-api/cat-api';
import { useInTransition } from './lib/store/useInTransition';
import Loader from './components/loader';
import MainScreen from './components/main-screen';
import CatDetailScreen from './components/cat-detail-screen';
import { TEXT_TARGETS } from './lib/constants';
import { useCurrentCat } from './lib/store/useCurrentCat';
import { CatDetails } from './lib/cat-api/cat-api.types';
import { 
  initialLoadingAnimation, 
  setInitialAnimationPositions, 
  showDetailsAnimation 
} from './animations';

export default function App() {
  const { data, isLoading, status, error } = useCatBreeds();
  const [cats, setCats] = useState<CatDetails[]>([]);
  
  const { isInTransition, setInTransition } = useInTransition();
  const { currentCat, setCurrentCat } = useCurrentCat();
  
  const ctxRoot = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>();

  useLayoutEffect(() => {
    setInitialAnimationPositions(TEXT_TARGETS);
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
      TEXT_TARGETS, 
      () => setInTransition(false)
    );
  };

  return (
    <div className="app-wrapper" ref={ctxRoot}>
      <Header />

      <main>
        <MainScreen />

        <Slider 
          cats={cats} 
          currentCat={currentCat}
          handleDetailsOpen={handleDetailsOpen}
        />

        <CatDetailScreen
          cats={cats} 
          tl={tl}
        />
      </main>

      <Loader />
    </div>
  );
}
