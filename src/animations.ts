import gsap from 'gsap';

export const showDetailsAnimation = (
  tl: GSAPTimeline, textTargets: string[], 
  callback?: () => void
): void => {

  tl
    .to(textTargets, {
      y: '100%',
    })
    .set('.text-layout__close-button', {
      autoAlpha: 0
    })
    .set('.cat-details', {
      zIndex: '1',
      display: 'block',
    }, '<')
    .to(textTargets, {
      y: '0',
    }, '<')
    .to('.slider__col-left', {
      x: '-102%',
    }, '<')
    .to('.slider__col-right', {
      x: '102%',
    }, '<')
    .to('.slider__full-image', {
      autoAlpha: 1,
    }, '<')
    .to('.slider__full-image', {
      width: '100%',
    }, '<')
    .to('.slider__random-image-button', {
      autoAlpha: 1
    }, '<')
    .set('.slider__wrapper', {
      pointerEvents: 'none',
    }, '<')
    .to('.text-layout__close-button', {
      autoAlpha: 1,
      onComplete: callback
    }, '<')
};

export const hideDetailsAnimation = (
  tl: GSAPTimeline, textTargets: string[], 
  callback?: () => void
): void => {

  tl
    .to('.text-layout__close-button', {
      autoAlpha: 0,
    })
    .to(textTargets, {
      y: '100%',
    }, '<')
    .to('.slider__col-left', {
      x: '0',
    }, '<')
    .to('.slider__col-right', {
      x: '0',
    }, '<')
    .to('.slider__full-image', {
      width: '0%',
    }, '<')
    .to('.slider__full-image', {
      autoAlpha: 0,
    }, '<')
    .to('.slider__random-image-button', {
      autoAlpha: 0
    }, '<')
    .set('.cat-details', {
      zIndex: '-1',
      display: 'none',
    })
    .set('.slider__wrapper', {
      pointerEvents: 'auto',
    }, '<')
    .to(textTargets, {
      y: '0',
      duration: .5,
      onComplete: callback
    }, '<.01');
};

export const setInitialAnimationPositions = (
  textTargets: string[]
): void => {

  gsap.set(textTargets, {
    y: '100%'
  });

  gsap.set('.slider__random-image-button', {
    autoAlpha: 0
  });

  gsap.set('.slider', {
    y: '20%',
    x: '3%',
    autoAlpha: 0
  });

  gsap.set('.header', {
    x: '-100%',
  });
};

export const initialLoadingAnimation = (
  tl: GSAPTimeline
): void => {

  const mm = gsap.matchMedia();
  mm.add("(min-width: 540px)", () => {
    gsap.set('.slider', {
      rotate: '-9deg'
    });
  });
  mm.add("(max-width: 539px)", () => {
    gsap.set('.slider', {
      rotate: 0,
      x: 0,
      y: 0
    });
  });
   
  tl
    .to('.loader-background__dark', {
      height: '0',
      duration: 1.05,
      ease: 'circ.inOut'
    })
    .to('.loader-background__light', {
      height: '0',
      duration: 1.05,
      ease: 'circ.inOut'
    })
    .to('.text-container .text-element', {
      y: '0',
    })
    .to('.text-container span', {
      y: '0',
      stagger: .2
    }, '<.35')
    .to('.header', {
      x: '0'
    }, '<.85')
    .to('.slider', {
      y: 0,
      x: 0,
      autoAlpha: 1,
      duration: 1,
      ease: 'circ.out'
    })
    .set('.loader-background', {
      display: 'none',
    });
};
