import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import '@/styles/globals.css';
import { useEffect, createRef, useState } from 'react';
import ZigZag from '@/components/ZigZag';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const zigzag = createRef<SVGSVGElement>();
  useEffect(() => {
    const whole = (zigzag.current?.clientWidth ?? 0);
    const half = whole / 2;
    const multiplier = 0.1;
    let last = 0;
    let pos = 0;

    const handler = () => {
      const { current } = zigzag;
      if (!current) return;

      const { scrollY } = window;
      const speed = last - scrollY;

      if (pos > 0) pos -= half / 2;
      if (pos < half * -1) pos += half;
      pos -= speed * multiplier;
      console.log(pos, half);

      current.style.transform = `translate3d(${pos}px, ${scrollY}px, 0)`;

      last = scrollY;
    };

    handler();
    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [zigzag]);

  return (
    <>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => window.scrollTo(0, 0)}
        initial={false}
      >
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>

      <ZigZag ref={zigzag} className="h-screen py-4 absolute top-0 left-0 -z-10 pointer-events-none" />
    </>
  );
}

export default MyApp;

