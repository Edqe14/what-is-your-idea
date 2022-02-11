import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <motion.main
    variants={variants}
    initial="hidden"
    animate="enter"
    exit="exit"
    transition={{ type: 'linear' }}
  >
    {children}
  </motion.main>
);

export default Layout;