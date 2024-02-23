import { MutableRefObject } from 'react';
import { hideDetailsAnimation } from '../../animations';
import { TEXT_TARGETS } from '../../lib/constants';
import { useCurrentCat } from '../../lib/store/useCurrentCat';
import { useInTransition } from '../../lib/store/useInTransition';
import { CatDetails } from '../../lib/cat-api/cat-api.types';
import Layout from '../layout';

interface Props { 
  cats: CatDetails[], 
  tl: MutableRefObject<GSAPTimeline | undefined>
}

export default function CatDetailScreen({ cats, tl }: Props) {
  const { currentCat, setCurrentCat } = useCurrentCat();
  const { isInTransition, setInTransition } = useInTransition();

  const getCatNumber = (cat: CatDetails): number => {
    return cats.findIndex((c) => c.id === cat.id) + 1;
  }

  const handleDetailsClose = (): void => {
    if (isInTransition) return;
    setInTransition(true);

    if (!tl.current) return;
    hideDetailsAnimation(
      tl.current, 
      TEXT_TARGETS, 
      () => {
        setInTransition(false);
        setCurrentCat({} as CatDetails);
      }
    );
  };

  return (
    <Layout
      classList='cat-details'
      heading={getCatNumber(currentCat).toString()}
      title={currentCat.name}
      description={currentCat.description}
      handleDetailsClose={handleDetailsClose}
    />
  );
}
