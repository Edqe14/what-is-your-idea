import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

interface Props extends LinkProps {
  children: ReactNode;
}

const ScrolllessLink = ({ children, href, passHref }: Props) => (
  <Link href={href} passHref={passHref} scroll={false}>
    {children}
  </Link>
);

export default ScrolllessLink;