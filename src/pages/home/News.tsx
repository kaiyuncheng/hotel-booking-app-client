import { Fade } from 'react-awesome-reveal';
import Container from '@/components/Container';
import Title from '@/components/elements/Title';
import Loading from '@/components/elements/Loading';
import dots from '@/assets/images/pc/dot.png';

import { useGetNewsQuery } from '@/store/services/homeServices';

const News = () => {
  const { data, isLoading } = useGetNewsQuery('all');
  return (
    <div className="bg-primary-40 py-20 overflow-hidden">
      <Container>
        <div className="relative flex flex-col md:flex-row max-w-screen-lg mx-auto">
          <div className="absolute -right-20 -top-10">
            <img className="w-40" src={dots} alt="dots" />
          </div>
          <div className="w-full md:w-1/4 mb-10 md:mb-0">
            <Title>最新消息</Title>
          </div>
          <div className="w-full md:w-3/4 space-y-10">
            {isLoading && (
              <div className="pb-[600px]">
                <Loading />
              </div>
            )}
            {!isLoading &&
              data?.result?.map((item) => {
                return (
                  <Fade triggerOnce direction="up" key={item._id}>
                    <div className="card md:card-side md:space-x-5">
                      <div className="w-full md:w-2/5 mb-5 md:mb-0">
                        <div className="aspect-[4/3]">
                          <img className="h-full w-full object-cover" src={item.image} alt={item.title} />
                        </div>
                      </div>
                      <div className="w-full md:w-3/5 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                        <p className="text-gray-700">{item.description} </p>
                      </div>
                    </div>
                  </Fade>
                );
              })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default News;
