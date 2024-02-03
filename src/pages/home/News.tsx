import Container from '@/components/Container';
import Title from '@/components/elements/Title';
import dots from '@/assets/images/pc/dot.png';
const News = () => {
  return (
    <div className="mb-[500px] bg-primary-40 py-20 overflow-hidden">
      <Container>
        <div className="relative flex flex-col md:flex-row max-w-screen-lg mx-auto">
          <div className="absolute -right-20 -top-10">
            <img className="w-40" src={dots} alt="dots" />
          </div>
          <div className="w-full md:w-1/4 mb-10 md:mb-0">
            <Title>最新消息</Title>
          </div>
          <div className="w-full md:w-3/4 space-y-10">
            <div className="card md:card-side md:space-x-5">
              <div className="w-full md:w-2/5 mb-5 md:mb-0">
                <div className="aspect-[4/3]">
                  <img
                    className="h-full w-full object-cover"
                    src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                    alt="Album"
                  />
                </div>
              </div>
              <div className="w-full md:w-3/5 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">秋季旅遊，豪華享受方案</h2>
                <p className="text-gray-700">
                  秋天就是要來場豪華的旅遊！我們為您準備了一系列的秋季特別方案，包括舒適的住宿、美食饗宴，以及精彩的活動。不論您是想來一趟浪漫之旅，還是想和家人共度美好時光，都能在這裡找到最適合的方案。{' '}
                </p>
              </div>
            </div>
            <div className="card md:card-side space-x-5">
              <div className="w-2/5 aspect-[4/3]">
                <img
                  className="h-full w-full object-cover"
                  src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                  alt="Album"
                />
              </div>
              <div className="w-3/5 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">秋季旅遊，豪華享受方案</h2>
                <p className="text-gray-700">
                  秋天就是要來場豪華的旅遊！我們為您準備了一系列的秋季特別方案，包括舒適的住宿、美食饗宴，以及精彩的活動。不論您是想來一趟浪漫之旅，還是想和家人共度美好時光，都能在這裡找到最適合的方案。{' '}
                </p>
              </div>
            </div>
            <div className="card md:card-side space-x-5">
              <div className="w-2/5 aspect-[4/3]">
                <img
                  className="h-full w-full object-cover"
                  src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                  alt="Album"
                />
              </div>
              <div className="w-3/5 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">秋季旅遊，豪華享受方案</h2>
                <p className="text-gray-700">
                  秋天就是要來場豪華的旅遊！我們為您準備了一系列的秋季特別方案，包括舒適的住宿、美食饗宴，以及精彩的活動。不論您是想來一趟浪漫之旅，還是想和家人共度美好時光，都能在這裡找到最適合的方案。{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default News;
