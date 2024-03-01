import TitleRoomInfo from '@/components/elements/TitleRoomInfo';
import type { Info } from '@/types/room';

type Props = {
  title: string;
  data: Info[];
};

const RoomInfo = ({ title, data }: Props) => {
  return (
    <>
      <TitleRoomInfo>{title}</TitleRoomInfo>
      <div className="flex flex-wrap bg-white rounded-lg px-8 pt-8 pb-3">
        {data?.map((item, i) => {
          return (
            <div className="flex justify-center items-center mr-5 md:mr-10 mb-5" key={`roomInfoItem_${i}`}>
              <div className="mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_40_7654)">
                    <path
                      d="M8.99844 16.2L4.79844 12L3.39844 13.4L8.99844 19L20.9984 6.99998L19.5984 5.59998L8.99844 16.2Z"
                      fill="#BF9D7D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_40_7654">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="whitespace-nowrap">{item.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RoomInfo;
