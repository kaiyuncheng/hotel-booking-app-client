import BtnWhiteWide from '@/components/elements/BtnWhiteWide';
import SlidersBanners from '@/components/sliders/SlidersBanners';

const Hero = () => {
  return (
    <div className="mt-[-80px] overflow-hidden bg-primary-40">
      <div className="relative">
        <SlidersBanners />
        <div className="w-full h-3/4 px-4 md:px-10 max-w-screen-3xl flex flex-col md:flex-row items-center md:space-x-28 absolute left-1/2 -translate-x-1/2 top-[100px] md:top-[80px]">
          <div className="w-full md:w-1/3 font-bold text-primary-100 flex flex-col items-center md:block mb-5 md:mb-0">
            <p className="text-3xl mb-1 tracking-widest">享樂酒店</p>
            <p className="text-lg mb-5 md:mb-2">Enjoyment Luxury Hotel</p>
            <div className="block w-[1px] h-20 md:w-full md:h-[1px] bg-gradient-to-b md:bg-gradient-to-r from-primary-100 to-white"></div>
          </div>
          <div className="w-full md:w-2/3 pr-12 ml-20 md:pr-0 md:ml-0">
            <div className="backdrop-blur-sm bg-white/20 text-white py-10 pr-10 rounded-[40px] border-r border-t border-white">
              <div className="-ml-8 -mr-5 md:mr-0">
                <h2 className="text-5xl md:text-7xl font-bold leading-snug md:leading-snug mb-2">
                  高雄
                  <br />
                  豪華住宿之選
                </h2>
                <p className="font-semibold mb-10">我們致力於為您提供無與倫比的奢華體驗與優質服務</p>
                <BtnWhiteWide link={'/rooms'}>立即訂房</BtnWhiteWide>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
