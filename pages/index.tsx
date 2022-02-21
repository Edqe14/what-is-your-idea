import Link from 'next/link';

const Home = () => (
  <>
    <h1 className="text-xl">Home</h1>
    <Link href="/about">About</Link>
  </>
);

export default Home;
