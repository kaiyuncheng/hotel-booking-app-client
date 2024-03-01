import SlidersBanners from '@/components/sliders/SlidersBanners';

const RoomHero = () => {
  return (
    <div className="mt-[-80px] overflow-hidden bg-primary-40">
      <div className="relative">
        <SlidersBanners />
        <div className="w-full h-3/4 px-4 md:px-20 max-w-screen-3xl flex flex-col md:flex-row justify-center items-center md:space-x-10 absolute left-1/2 -translate-x-1/2 top-[100px] md:top-[80px]">
          <div className="w-full md:w-1/3 font-bold text-primary-100 flex flex-col items-center md:block mb-5 md:mb-0">
            <p className="text-3xl mb-1 tracking-widest">享樂酒店</p>
            <p className="text-lg mb-5 md:mb-2">Enjoyment Luxury Hotel</p>
            <div className="block w-[1px] h-20 md:w-full md:h-[1px] bg-gradient-to-b md:bg-gradient-to-r from-primary-100 to-white"></div>
          </div>
          <div className="w-full md:w-1/3 text-center">
            <h2 className="text-3xl text-white font-bold tracking-widest">客房旅宿</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomHero;
