// import { Fade } from 'react-awesome-reveal';
import Container from '@/components/Container';
import Title from '@/components/elements/Title';
import dots from '@/assets/images/pc/dot.png';
import aboutBg from '@/assets/images/pc/about.jpg';

const About = () => {
  return (
    <div className="py-20 border border-blue-500">
      <div className="w-full relative">
        <div className="aspect-[1/2] xs:aspect-[3/4] sm:aspect-[16/13] lg:aspect-[16/9] xl:aspect-[16/7]">
          <img src={aboutBg} alt="swimming pool" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-full">
          <Container>
            <div className="absolute left-0 -top-40 z-10">
              <img className="w-40" src={dots} alt="dots" />
            </div>
            <div className="flex justify-end ">
              <div className="flex flex-col w-full md:w-3/4 mt-10 rounded-l-[40px] rounded-tr-[40px] border-l border-b border-white p-16 backdrop-blur-sm bg-gradient-to-b from-dark/80 to-primary-100/80 text-white">
                <div className="w-full mb-10">
                  <Title>關於我們</Title>
                </div>
                <div className="w-full space-y-5">
                  <p>
                    享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                    我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。{' '}
                  </p>
                  <p>
                    我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                    我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。{' '}
                  </p>
                  <p>
                    在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。{' '}
                  </p>
                  <p>
                    享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default About;
