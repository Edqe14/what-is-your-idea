import Layout from '@/components/Layout';
import Link from 'next/link';

const Home = () => (
  <Layout>
    <h1>Home</h1>
    <Link href="/about">About</Link>
  </Layout>
);

export default Home;
