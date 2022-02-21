import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useEffect, createRef, useState } from 'react';
import ZigZag from '@/components/ZigZag';

import '@/styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const zigzag = createRef<SVGSVGElement>();
  useEffect(() => {
    const multiplier = 0.05;
    let last = 0;
    let pos = 0;

    const handler = () => {
      const { current } = zigzag;
      if (!current) return;

      const { scrollY } = window;
      const { left, right } = current.getBoundingClientRect();
      const speed = last - scrollY;

      if (left >= 0) pos = (window.innerWidth / 2) * -1;
      if (right <= window.innerWidth) pos = 0;
      pos -= speed * multiplier;
      last = scrollY;
    };

    handler();
    window.addEventListener('scroll', handler);

    let id: number | null = null;
    const update = () => {
      const { current } = zigzag;
      const { scrollY } = window;
      if (!current) return;

      current.style.transform = `translate3d(${pos}px, ${scrollY}px, 0)`;
      id = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(id as number);
    };
  }, [zigzag]);

  return (
    <>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => window.scrollTo(0, 0)}
        initial={false}
      >
        <Component {...pageProps} key={router.route} darkMode={darkMode} setDarkMode={setDarkMode} />
      </AnimatePresence>

      <ZigZag ref={zigzag} className="h-screen py-4 absolute top-0 left-0 -z-10 pointer-events-none" />
    </>
  );
}

export default MyApp;

