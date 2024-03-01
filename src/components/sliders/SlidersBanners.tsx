import { useState } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';

const items: string[] = [
  'https://kaiyuncheng.github.io/hotel-booking-app-client/images/room1-1.jpg',
  'https://kaiyuncheng.github.io/hotel-booking-app-client/images/room2-4.jpg',
  'https://kaiyuncheng.github.io/hotel-booking-app-client/images/room4-1.jpg',
  'https://kaiyuncheng.github.io/hotel-booking-app-client/images/room3-1.jpg',
];
const SlidersBanners = () => {
  const [pages, setPages] = useState({ currentSlide: 0 });

  const settings: Settings = {
    arrows: false,
    dots: true,
    dotsClass: 'slick-dots custom-dots',
    infinite: true,
    speed: 1000,
    autoplay: true,
    fade: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    initialSlide: 0,
    beforeChange: (_, next) => {
      setPages({ currentSlide: next });
    },
    customPaging: (i) => {
      return (
        <div
          className={`${
            i === pages.currentSlide ? 'bg-primary-100 w-12' : 'bg-white w-8'
          } transition-all rounded-full duration-300 mt-[-40px] h-1 hover:bg-primary-120`}
        ></div>
      );
    },
  };

  return (
    <div>
      <Slider {...settings}>
        {items &&
          items.map((item, i) => {
            return (
              <div className="w-full" key={`banner_${i}`}>
                <div className="w-full relative">
                  <div className="absolute top-0 left-0 hero-overlay bg-dark bg-opacity-70"></div>
                  <div className="aspect-[1/2] xs:aspect-[3/4] md:aspect-[16/13] lg:aspect-[16/9] xl:aspect-[2/1]">
                    <img src={item} alt={`banner_${i}`} className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default SlidersBanners;
