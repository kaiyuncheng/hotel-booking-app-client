import Hero from './Hero';
import News from './News';
import RoomPromote from './RoomPromote';
import About from './About';
import Culinary from './Culinary';
import Location from './Location';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <News />
      <About />
      <RoomPromote />
      <Culinary />
      <Location />
      <Footer />
    </>
  );
};

export default Home;
