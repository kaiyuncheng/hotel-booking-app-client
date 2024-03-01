import TitleRoomInfo from '@/components/elements/TitleRoomInfo';
import RoomInfo from '@/pages/room/RoomInfo';
import type { IRoom } from '@/types/room';

type Props = {
  result: IRoom;
};

const RoomInfoList = ({ result }: Props) => {
  return (
    <>
      <div className="mb-5 md:mb-12">
        <TitleRoomInfo>房型基本資訊</TitleRoomInfo>
        <div className="flex space-x-4">
          <div className="flex flex-col justify-center items-center rounded-lg p-4 w-24 h-24 bg-white">
            <div className="mb-2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 7.25C2 6.52065 2.28973 5.82118 2.80546 5.30546C3.32118 4.78973 4.02065 4.5 4.75 4.5H19.25C19.9793 4.5 20.6788 4.78973 21.1945 5.30546C21.7103 5.82118 22 6.52065 22 7.25V17.75C22 18.1111 21.9289 18.4687 21.7907 18.8024C21.6525 19.136 21.4499 19.4392 21.1945 19.6945C20.9392 19.9499 20.636 20.1525 20.3024 20.2907C19.9687 20.4289 19.6111 20.5 19.25 20.5H4.75C4.38886 20.5 4.03127 20.4289 3.69762 20.2907C3.36398 20.1525 3.06082 19.9499 2.80546 19.6945C2.5501 19.4392 2.34753 19.136 2.20933 18.8024C2.07113 18.4687 2 18.1111 2 17.75V7.25ZM16.78 7.72C16.6395 7.57931 16.4488 7.50017 16.25 7.5H13.75C13.5511 7.5 13.3603 7.57902 13.2197 7.71967C13.079 7.86032 13 8.05109 13 8.25C13 8.44891 13.079 8.63968 13.2197 8.78033C13.3603 8.92098 13.5511 9 13.75 9H14.44L12.72 10.719C12.6463 10.7877 12.5872 10.8705 12.5462 10.9625C12.5052 11.0545 12.4832 11.1538 12.4814 11.2545C12.4796 11.3552 12.4982 11.4552 12.5359 11.5486C12.5736 11.642 12.6297 11.7268 12.701 11.798C12.7722 11.8693 12.857 11.9254 12.9504 11.9631C13.0438 12.0008 13.1438 12.0194 13.2445 12.0176C13.3452 12.0158 13.4445 11.9938 13.5365 11.9528C13.6285 11.9118 13.7113 11.8527 13.78 11.779L15.5 10.06V10.75C15.5 10.9489 15.579 11.1397 15.7197 11.2803C15.8603 11.421 16.0511 11.5 16.25 11.5C16.4489 11.5 16.6397 11.421 16.7803 11.2803C16.921 11.1397 17 10.9489 17 10.75V8.25C16.9998 8.05115 16.9207 7.86052 16.78 7.72ZM7.75 17.5H10.251C10.4499 17.5 10.6407 17.421 10.7813 17.2803C10.922 17.1397 11.001 16.9489 11.001 16.75C11.001 16.5511 10.922 16.3603 10.7813 16.2197C10.6407 16.079 10.4499 16 10.251 16H9.561L11.281 14.28C11.4176 14.1385 11.4931 13.949 11.4913 13.7523C11.4895 13.5557 11.4105 13.3676 11.2714 13.2286C11.1322 13.0896 10.9441 13.0109 10.7475 13.0092C10.5508 13.0076 10.3614 13.0833 10.22 13.22L8.5 14.938V14.248C8.5 14.0491 8.42098 13.8583 8.28033 13.7177C8.13968 13.577 7.94891 13.498 7.75 13.498C7.55109 13.498 7.36032 13.577 7.21967 13.7177C7.07902 13.8583 7 14.0491 7 14.248V16.748C7 16.9469 7.07902 17.1377 7.21967 17.2783C7.36032 17.419 7.55109 17.498 7.75 17.498V17.5Z"
                  fill="#BF9D7D"
                />
              </svg>
            </div>
            <p className="whitespace-nowrap">{result.areaInfo}</p>
          </div>
          <div className="flex flex-col justify-center items-center rounded-lg p-4 w-24 h-24 bg-white">
            <div className="mb-2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_11742_4095)">
                  <path
                    d="M20 10.5V7.5C20 6.4 19.1 5.5 18 5.5H6C4.9 5.5 4 6.4 4 7.5V10.5C2.9 10.5 2 11.4 2 12.5V17.5H3.33L4 19.5H5L5.67 17.5H18.34L19 19.5H20L20.67 17.5H22V12.5C22 11.4 21.1 10.5 20 10.5ZM11 10.5H6V7.5H11V10.5ZM18 10.5H13V7.5H18V10.5Z"
                    fill="#BF9D7D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11742_4095">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="whitespace-nowrap">{result.bedInfo}</p>
          </div>
          <div className="flex flex-col justify-center items-center rounded-lg p-4 w-24 h-24 bg-white">
            <div className="mb-2">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_11742_4105)">
                  <path
                    d="M12 12.5C14.21 12.5 16 10.71 16 8.5C16 6.29 14.21 4.5 12 4.5C9.79 4.5 8 6.29 8 8.5C8 10.71 9.79 12.5 12 12.5ZM12 14.5C9.33 14.5 4 15.84 4 18.5V20.5H20V18.5C20 15.84 14.67 14.5 12 14.5Z"
                    fill="#BF9D7D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11742_4105">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="whitespace-nowrap">{result.maxPeople}人</p>
          </div>
        </div>
      </div>
      <div className="mb-5 md:mb-12">
        <RoomInfo title="房間格局" data={result.layoutInfo} />
      </div>
      <div className="mb-5 md:mb-12">
        <RoomInfo title="房內設備" data={result.facilityInfo} />
      </div>
      <div className="mb-5 md:mb-12">
        <RoomInfo title="備品提供" data={result.amenityInfo} />
      </div>
    </>
  );
};

export default RoomInfoList;
