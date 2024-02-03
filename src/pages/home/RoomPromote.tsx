import WhiteWideBtn from '@/components/elements/WhiteWideBtn';
import SlidersBanners from '@/components/sliders/SlidersBanners';

const RoomPromote = () => {
  return (
    <div className="overflow-hidden border border-red-500">
      <div className="relative">
        <div className="w-full h-3/4 px-4 md:px-10 max-w-screen-3xl flex flex-col md:flex-row items-center md:space-x-28">
          <div className="w-full md:w-1/3 font-bold text-primary-100 flex flex-col items-center md:block mb-5 md:mb-0">
            <SlidersBanners />
          </div>
          <div className="w-full md:w-2/3 pr-12 ml-20 md:pr-0 md:ml-0">
            <div className="text-white py-10 pr-10 ">
              <div className="-ml-8 -mr-5 md:mr-0">
                <h2 className="text-2xl font-bold leading-snug md:leading-snug mb-2">尊爵雙人房</h2>
                <p className="font-semibold mb-10">
                  享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。
                </p>
                <p>NT$ 10000</p>
                <WhiteWideBtn link={'/rooms'}>查看更多</WhiteWideBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPromote;
