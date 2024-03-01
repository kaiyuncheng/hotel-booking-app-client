import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectOrder } from '@/store/slices/orderSlice';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import TitleRoomInfo from '@/components/elements/TitleRoomInfo';
import RoomInfoList from '@/components/elements/RoomInfoList';
import type { IRoom } from '@/types/room';

const Booking = () => {
  const orderInfo = useSelector(selectOrder);
  return (
    <div className="bg-primary-40 relative pb-16">
      <Container>
        <h2 className="text-3xl font-bold mb-2">確認訂房資訊</h2>
        <div className="w-full flex flex-col md:flex-row space-x-10 max-w-screen-lg mx-auto">
          <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col">
            <h3 className="text-3xl font-bold mb-2">訂房資訊</h3>
            <div>
              <TitleRoomInfo>選擇房型</TitleRoomInfo>
              <p>{orderInfo.roomId?.name}</p>
            </div>
            <div>
              <TitleRoomInfo>訂房日期</TitleRoomInfo>
              <p>入住： {orderInfo.checkInDate?.toLocaleDateString().slice(0, 10)}</p>
              <p>退房： {orderInfo.checkOutDate?.toLocaleDateString().slice(0, 10)}</p>
            </div>
            <div>
              <TitleRoomInfo>房客人數</TitleRoomInfo>
              <p>{orderInfo.peopleNum}人</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">訂房人資訊</h3>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">房間資訊</h3>
              {orderInfo && <RoomInfoList result={orderInfo.roomId as IRoom} />}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="bg-white rounded-xl p-10 shadow-sm">
              <h3 className="text-xl border-b border-gray-200 pb-3 mb-10">價格詳情</h3>
              <div className="flex justify-between">
                <p className="font-semibold mb-10">
                  NT$ {orderInfo.roomId?.price} x {orderInfo.night}晚
                </p>
                <p className="font-semibold mb-10">NT$ {Number(orderInfo.roomId?.price) * Number(orderInfo.night)}</p>
              </div>
              <div className="flex justify-between border-b border-gray-400">
                <p className="font-semibold mb-10">住宿折扣</p>
                <p className="font-semibold mb-10 text-primary-100">-NT$ 1000</p>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold mb-10">總價</p>
                <p className="font-semibold mb-10 text-primary-100">NT$ 19000</p>
              </div>
              <div className="form-control mt-4 mb-2">
                <button type="submit" className={clsx('btn-primary text-white btn font-bold text-base')}>
                  確認訂房
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer hasDeco={false} />
    </div>
  );
};

export default Booking;
