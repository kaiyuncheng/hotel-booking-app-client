import Loading from '@/components/elements/Loading';
import SlidersRoomPromote from '@/components/sliders/SlidersRoomPromote';
import { useGetRoomQuery } from '@/store/services/roomServices';
import { Fade } from 'react-awesome-reveal';

const RoomPromote = () => {
  const { data, isLoading } = useGetRoomQuery('all');

  return (
    <div className="relative overflow-hidden pt-20 md:pt-0 pb-20">
      {isLoading && (
        <div className="w-full flex justify-center pb-[600px]">
          <Loading />
        </div>
      )}
      {!isLoading && data && (
        <Fade triggerOnce direction="up">
          <SlidersRoomPromote items={data?.result} />
        </Fade>
      )}
    </div>
  );
};

export default RoomPromote;
