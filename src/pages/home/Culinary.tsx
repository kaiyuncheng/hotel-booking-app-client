import { Fade } from 'react-awesome-reveal';
import Container from '@/components/Container';
import Title from '@/components/elements/Title';
import Loading from '@/components/elements/Loading';
import dots from '@/assets/images/pc/dot.png';

import { useGetCulinaryQuery } from '@/store/services/homeServices';

const Culinary = () => {
  const { data, isLoading } = useGetCulinaryQuery('all');
  return (
    <div className="bg-primary-40 py-20 overflow-x-hidden">
      <Container>
        <div className="relative flex flex-col max-w-screen-lg mx-auto">
          <div className="absolute -right-20 -top-32">
            <img className="w-40" src={dots} alt="dots" />
          </div>
          <div className="w-full mb-10">
            <Title>佳餚美饌</Title>
          </div>
          {isLoading && (
            <div className="pb-[600px]">
              <Loading />
            </div>
          )}
        </div>
      </Container>

      <Fade triggerOnce direction="up">
        <div className="w-full carousel carousel-center space-x-4 ml-4 pr-10 md:ml-[12%] md:pr-60">
          {!isLoading &&
            data?.result.map((item) => {
              return (
                <div className="carousel-item relative">
                  <div className="rounded-md overflow-hidden">
                    <div className="aspect-[2/3]  w-[300px]">
                      <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                    </div>
                  </div>
                  <div className="text-white p-5 backdrop-blur-md bg-gradient-to-b from-white/0 via-dark/70 to-dark/90 absolute bottom-0 left-0 rounded-b-md">
                    <div className="flex justify-between items-center font-bold mb-2">
                      <h3 className="text-2xl">{item.title}</h3>
                      <div className="flex">
                        <p className="mr-2">{item.diningTime}</p>
                      </div>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </Fade>
    </div>
  );
};

export default Culinary;
