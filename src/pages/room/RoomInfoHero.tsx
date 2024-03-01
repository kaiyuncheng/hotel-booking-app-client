import SlidersRooms from '@/components/sliders/SlidersRooms';
import type { IRoom } from '@/types/room';
import { useState } from 'react';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

type Props = {
  result: IRoom;
};

const RoomInfoHero = ({ result }: Props) => {
  const [index, setIndex] = useState(-1);

  const handleLightBox = (result: IRoom) => {
    const slidesArr = [{ src: result.imageUrl }];
    result.imageUrlList.map((item) => {
      slidesArr.push({ src: item });
    });
    return slidesArr;
  };

  return (
    <>
      <div className="block md:hidden">
        <SlidersRooms />
      </div>
      <div className="relative hidden md:flex rounded-xl overflow-hidden space-x-2 mb-20 h-[400px]">
        <button type="button" onClick={() => setIndex(0)} className="w-3/5 h-full overflow-hidden ">
          <img
            src={result.imageUrl}
            alt="hotel"
            className="transition-all duration-500 hover:scale-105 h-full w-full object-cover"
          />
        </button>
        <div className="w-1/5 h-full flex flex-col space-y-2">
          <button type="button" onClick={() => setIndex(1)} className="h-1/2 overflow-hidden">
            <img
              src={result.imageUrlList[0]}
              alt="hotel"
              className="transition-all duration-500 hover:scale-105 h-full w-full object-cover"
            />
          </button>
          <button type="button" onClick={() => setIndex(2)} className="h-1/2 overflow-hidden">
            <img
              src={result.imageUrlList[1]}
              alt="hotel"
              className="transition-all duration-500 hover:scale-105 h-full w-full object-cover"
            />
          </button>
        </div>
        <div className="w-1/5 h-full flex flex-col space-y-2">
          <button type="button" onClick={() => setIndex(3)} className="h-1/2 overflow-hidden">
            <img
              src={result.imageUrlList[2]}
              alt="hotel"
              className="transition-all duration-500 hover:scale-105 h-full w-full object-cover"
            />
          </button>
          <button type="button" onClick={() => setIndex(4)} className="h-1/2 overflow-hidden">
            <img
              src={result.imageUrlList[3]}
              alt="hotel"
              className="transition-all duration-500 hover:scale-105 h-full w-full object-cover"
            />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="absolute bottom-5 right-5 border border-primary-100 bg-primary-tint hover:bg-primary-100 text-primary-100 hover:text-white font-bold btn btn-secondary hover:btn-primary"
        >
          看更多
        </button>

        <Lightbox index={index} open={index >= 0} close={() => setIndex(-1)} slides={handleLightBox(result)} />
      </div>
    </>
  );
};

export default RoomInfoHero;
