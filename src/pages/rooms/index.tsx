import Container from '@/components/Container';
import RoomHero from './RoomHero';
import RoomList from './RoomList';
import Footer from '@/components/Footer';

const Rooms = () => {
  return (
    <div className="bg-primary-40">
      <RoomHero />
      <Container>
        <div className="relative flex flex-col max-w-screen-lg mx-auto font-bold py-20">
          <p className="text-gray-700 text-lg mb-2">房型選擇</p>
          <p className="text-primary-100 text-3xl mb-10">各種房型，任您挑選</p>
          <RoomList />
        </div>
      </Container>
      <Footer hasDeco={false} />
    </div>
  );
};

export default Rooms;
