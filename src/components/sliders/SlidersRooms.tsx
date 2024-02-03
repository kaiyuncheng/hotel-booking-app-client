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
      className="prev group absolute z-40 -right-1 bottom-[-25px] transform transition-all duration-500 outline-none focus:outline-none"
    >
      <svg
        className="w-[45px] md:w-[53px] fill-current text-primary-medium group-hover:text-primary-dark"
        width="50"
        height="49"
        viewBox="0 0 50 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29.8387 19.0614L5.35688 19.0614C3.21858 19.0614 1.5 20.7903 1.5 22.9245L1.5 26.0755C1.5 28.2097 3.21858 29.9386 5.35688 29.9386L29.8386 29.9386L20.7109 38.6578L20.7075 38.6611C19.153 40.1555 19.1171 42.6465 20.6457 44.1791L22.8201 46.3594C22.8212 46.3604 22.8223 46.3615 22.8233 46.3626C24.3274 47.8834 26.774 47.8741 28.279 46.3651L47.3641 27.229C47.365 27.2281 47.3659 27.2272 47.3668 27.2263C48.8818 25.7204 48.8727 23.2738 47.3697 21.7668L47.3695 21.7666L28.2847 2.64063C28.2836 2.6396 28.2826 2.63857 28.2816 2.63754C26.7776 1.11664 24.3308 1.12587 22.8258 2.63494L20.6512 4.81533C20.65 4.81656 20.6487 4.81779 20.6475 4.81902C19.106 6.35259 19.1427 8.84776 20.7109 10.3422C20.7116 10.3428 20.7123 10.3435 20.713 10.3442L29.8387 19.0614Z"
          fill="currentColor"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    </button>
  );
}
function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="prev group absolute z-40 -left-1 bottom-[-25px] transform transition-all duration-500 outline-none focus:outline-none"
    >
      <svg
        className="w-[45px] md:w-[53px] fill-current text-primary-medium group-hover:text-primary-dark"
        width="50"
        height="49"
        viewBox="0 0 50 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.1613 29.9386L44.6431 29.9386C46.7814 29.9386 48.5 28.2097 48.5 26.0755L48.5 22.9245C48.5 20.7903 46.7814 19.0614 44.6431 19.0614L20.1613 19.0614L29.2891 10.3422L29.2925 10.3389C30.847 8.84448 30.8829 6.35352 29.3543 4.82088L27.1799 2.64063C27.1788 2.63955 27.1777 2.63847 27.1767 2.63739C25.6726 1.11664 23.226 1.12592 21.721 2.63494L2.63593 21.771C2.63502 21.7719 2.6341 21.7728 2.63319 21.7737C1.11822 23.2796 1.12729 25.7262 2.63025 27.2332L2.63053 27.2334L21.7153 46.3594C21.7164 46.3604 21.7174 46.3614 21.7184 46.3625C23.2224 47.8834 25.6692 47.8741 27.1742 46.3651L29.3488 44.1847C29.35 44.1834 29.3513 44.1822 29.3525 44.181C30.894 42.6474 30.8573 40.1522 29.2891 38.6578C29.2884 38.6572 29.2877 38.6565 29.287 38.6558L20.1613 29.9386Z"
          fill="currentColor"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    </button>
  );
}

const SlidersBanners = () => {
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
    prevArrow: <NextArrow />,
    nextArrow: <PrevArrow />,

    beforeChange: (prev, next) => {
      setPages({ currentSlide: next });
    },
    customPaging: (i) => {
      return (
        <div
          className={`${
            i === pages.currentSlide ? 'bg-primary-medium' : 'bg-gray-300 '
          } transition-all duration-300 origin-center transform mt-[-13px] rounded-full w-2 h-2 hover:bg-primary-medium`}
        ></div>
      );
    },
  };

  return (
    <div className="border-b-2 border-other-skin border-dashed">
      <Slider {...settings}>
        {items &&
          items.map((item, i) => {
            return (
              <div className="w-full pb-4" key={`banner_${i}`}>
                <div className="w-full relative">
                  <div className="absolute top-0 left-0 hero-overlay bg-dark bg-opacity-50"></div>
                  <img src={item} alt={`banner_${i}`} className="w-full" />
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default SlidersBanners;
