import { useState } from 'react';
import Slider from 'react-slick';
import type { CustomArrowProps, Settings } from 'react-slick';

const items: string[] = [
  'https://kaiyuncheng.github.io/hotel-booking-app-client/images/room1-1.jpg',
  'https://kaiyuncheng.github.io/hotel-booking-app-client/images/room2-4.jpg',
  'https://kaiyuncheng.github.io/hotel-booking-app-client/images/room4-1.jpg',
  'https://kaiyuncheng.github.io/hotel-booking-app-client/images/room3-1.jpg',
];

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="prev group text-white hover:text-primary-40 absolute z-10 left-5 top-1/2 -translate-y-1/2 transform transition-all duration-500 outline-none focus:outline-none"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" fill="currentColor" />
        <g clipPath="url(#clip0_488_4374)">
          <path d="M33.682 35.65L26.0487 28L33.682 20.35L31.332 18L21.332 28L31.332 38L33.682 35.65Z" fill="#4B4B4B" />
        </g>
        <defs>
          <clipPath id="clip0_488_4374">
            <rect width="40" height="40" fill="white" transform="translate(8 8)" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}
function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="prev group text-white hover:text-primary-40 absolute z-10 right-5  top-1/2 -translate-y-1/2 transform transition-all duration-500 outline-none focus:outline-none"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" fill="currentColor" />
        <g clipPath="url(#clip0_488_4376)">
          <path
            d="M22.3164 35.65L29.9497 28L22.3164 20.35L24.6664 18L34.6664 28L24.6664 38L22.3164 35.65Z"
            fill="#4B4B4B"
          />
        </g>
        <defs>
          <clipPath id="clip0_488_4376">
            <rect width="40" height="40" fill="white" transform="translate(8 8)" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

const SlidersRooms = () => {
  const [pages, setPages] = useState({ currentSlide: 0 });

  const settings: Settings = {
    dots: true,
    dotsClass: 'slick-dots custom-dots',
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          centerMode: false,
        },
      },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

    beforeChange: (_, next) => {
      setPages({ currentSlide: next });
    },
    customPaging: (i) => {
      return (
        <div
          className={`${
            i === pages.currentSlide ? 'bg-primary-100 w-12' : 'bg-white w-8'
          } transition-all rounded-full duration-300 mt-[-40px] h-1 hover:bg-primary-120 shadow-md`}
        ></div>
      );
    },
  };

  return (
    <div className="mb-5">
      <Slider {...settings}>
        {items &&
          items.map((item, i) => {
            return (
              <div className="rounded-lg overflow-hidden" key={`room_${i}`}>
                <div className="h-full aspect-4/3">
                  <img src={item} alt={`room_${i}`} className="h-full w-full object-cover" />
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default SlidersRooms;
