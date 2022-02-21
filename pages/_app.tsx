import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import '@/styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence
      exitBeforeEnter
      onExitComplete={() => window.scrollTo(0, 0)}
      initial={false}
    >
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;

