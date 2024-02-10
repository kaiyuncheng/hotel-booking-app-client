import { useState } from 'react';
import Slider from 'react-slick';
import type { CustomArrowProps, Settings } from 'react-slick';
import WhiteWideBtn from '../elements/WhiteWideBtn';
import type { IRoom } from '@/types/room';

type Props = {
  items: IRoom[];
};

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="prev group text-primary-100 hover:text-white absolute z-40 right-10 md:left-[75%] bottom-4 transform transition-all duration-500 outline-none focus:outline-none"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20L13.41 18.59L7.83 13L20 13L20 11L7.83 11L13.41 5.41L12 4L4 12L12 20Z" fill="currentColor" />
      </svg>
    </button>
  );
}
function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="prev group text-primary-100 hover:text-white absolute z-40 right-0 md:left-[80%] bottom-4 transform transition-all duration-500 outline-none focus:outline-none"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor" />
      </svg>
    </button>
  );
}

const SlidersRoomPromote: React.FC<Props> = ({ items }) => {
  const [pages, setPages] = useState({ currentSlide: 0 });

  const settings: Settings = {
    dots: true,
    dotsClass: 'slick-dots room-promote-custom-dots',
    infinite: true,
    speed: 500,
    autoplay: true,
    fade: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

    beforeChange: (prev, next) => {
      setPages({ currentSlide: next });
    },
    customPaging: (i) => {
      return (
        <div
          className={`${
            i === pages.currentSlide ? 'bg-primary-100 w-12' : 'bg-white w-8'
          } transition-all rounded-full duration-300 mt-[-32px] md:mt-[-40px] h-1 hover:bg-primary-120`}
        ></div>
      );
    },
  };

  return (
    <div className="w-full relative px-4 md:px-0">
      <Slider {...settings}>
        {items?.map((item, i) => {
          return (
            <div className="w-full" key={`room_promote_${i}`}>
              <div className="flex flex-col md:flex-row md:items-end md:space-x-10">
                <div className="w-full md:w-2/5 mb-5 md:mb-0">
                  <div className="aspect-[15/16] rounded-r-md overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="w-full md:w-2/5 text-white flex flex-col pb-14">
                  <h3 className="text-2xl font-bold mb-2">{item.name} </h3>
                  <p className="font-semibold mb-5 md:mb-10">{item.description}</p>
                  <p className="text-2xl font-bold mb-5 md:mb-10">NT$ {item.price}</p>
                  <WhiteWideBtn link={`/rooms/${item._id}`}>查看更多</WhiteWideBtn>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlidersRoomPromote;
