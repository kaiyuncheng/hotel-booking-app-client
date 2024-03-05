import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import BtnOutline from '@/components/elements/BtnOutline';
import Loading from '@/components/elements/Loading';

import type { IErrorRes } from '@/types/response';
import type { IOrder } from '@/types/order';
import type { IRoom } from '@/types/room';

import { useGetOrdersQuery, useDeleteOrderMutation } from '@/store/services/orderServices';

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [isMore, setIsMore] = useState(false);
  const [history, setHistory] = useState<IOrder[] | null>(null);
  const [future, setFuture] = useState<IOrder[] | null>(null);

  useEffect(() => {
    if (data) {
      const historyData = [...data.result]
        .sort((a, b) => {
          return new Date(b.checkInDate ?? '').getTime() - new Date(a.checkInDate ?? '').getTime();
        })
        .filter((item) => {
          return new Date(item.checkInDate ?? '') < new Date();
        });
      setHistory(historyData);

      const futureData = [...data.result]
        .sort((a, b) => {
          return new Date(a.checkInDate ?? '').getTime() - new Date(b.checkInDate ?? '').getTime();
        })
        .filter((item) => {
          return new Date(item.checkInDate ?? '') > new Date();
        });
      setFuture(futureData);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteOrder(id);
      console.log(res);
      console.log('res data', data);
      toast.success('訂單刪除成功');
      // setFuture(futureData);
    } catch (err) {
      toast.error((err as IErrorRes)?.data.message);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="w-full flex justify-center pb-[600px]">
          <Loading />
        </div>
      )}

      <Container>
        <div className="flex flex-col md:flex-row md:items-start text-black space-y-5 md:space-y-0 md:space-x-5 mb-10 font-bold">
          <div className="w-full  md:w-1/2 lg:w-2/3 bg-white rounded-xl p-5 md:p-10">
            <h3 className="text-xl font-bold mb-10">即將來的行程</h3>
            {!isLoading &&
              future?.map((item, i) => {
                if (item.status !== -1) {
                  return (
                    <div key={`order_${i}`} className="mb-10 border-t pt-10">
                      <p className="text-primary-120 text-sm mb-1">預訂參考編號： {item?._id}</p>
                      <h3 className="text-lg mb-3"> {(item.roomId as IRoom)?.name}</h3>
                      <div className="aspect-[2/1] rounded-lg overflow-hidden mb-5">
                        <img
                          src={(item.roomId as IRoom)?.imageUrl}
                          alt={(item.roomId as IRoom)?.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex space-x-5 text-lg mb-5">
                        <h3 className="border-r border-primary-40 pr-5 ">
                          住宿天數：
                          {Math.ceil(
                            (new Date(item.checkOutDate ?? '').getTime() - new Date(item.checkInDate ?? '').getTime()) /
                              (1000 * 3600 * 24),
                          )}{' '}
                          晚
                        </h3>
                        <h3>住宿人數： {item?.peopleNum} 位</h3>
                      </div>
                      <div className="font-semibold pl-2 border-l-4 border-primary-100 flex flex-col justify-center mb-8">
                        <p className="mb-1">入住： {item?.checkInDate?.toLocaleString().slice(0, 10)}</p>
                        <p className="font-semibold">退房： {item?.checkOutDate?.toLocaleString().slice(0, 10)}</p>
                      </div>
                      <div className="flex space-x-5">
                        <BtnOutline onClick={() => handleDelete(item._id || '')} className="flex-1">
                          {isDeleting && <Loading />}
                          {!isDeleting && '取消預訂'}
                        </BtnOutline>
                      </div>
                    </div>
                  );
                }
              })}
            {!isLoading && future?.length === 0 && (
              <p className="text-center pb-20 pt-14  text-primary-100">- 無未來行程訂單 -</p>
            )}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-xl p-5 md:p-10">
            <h3 className="text-xl font-bold mb-5">歷史行程</h3>

            {!isLoading &&
              history?.map((item, i) => {
                if (isMore && item.status !== -1) {
                  return (
                    <div key={`orderHistory_${i}`} className="mb-10 flex space-x-5 border-b">
                      <div className="aspect-[5/3] md:aspect-[4/3] rounded-lg overflow-hidden mb-5 self-start">
                        <img
                          src={(item.roomId as IRoom)?.imageUrl}
                          alt={(item.roomId as IRoom)?.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="">
                        <p className="text-primary-120 text-sm mb-3">預訂參考編號： {item?._id}</p>
                        <h3 className="text-lg mb-3"> {(item.roomId as IRoom)?.name}</h3>

                        <div className="flex flex-col text-base font-medium mb-5">
                          <h3 className="">
                            住宿天數：
                            {Math.ceil(
                              (new Date(item.checkOutDate ?? '').getTime() -
                                new Date(item.checkInDate ?? '').getTime()) /
                                (1000 * 3600 * 24),
                            )}
                            晚
                          </h3>
                          <h3>住宿人數： {item?.peopleNum} 位</h3>
                        </div>
                        <div className="font-semibold pl-2 border-l-4 border-primary-100 flex flex-col justify-center mb-8">
                          <p className="mb-1">入住： {item?.checkInDate?.toLocaleString().slice(0, 10)}</p>
                          <p className="font-semibold">退房： {item?.checkOutDate?.toLocaleString().slice(0, 10)}</p>
                        </div>
                      </div>
                    </div>
                  );
                } else if (i < 2 && item.status !== -1) {
                  return (
                    <div key={`orderHistory_${i}`} className="mb-10 flex space-x-5 border-b">
                      <div className="aspect-[5/3] md:aspect-[4/3] rounded-lg overflow-hidden mb-5 self-start">
                        <img
                          src={(item.roomId as IRoom)?.imageUrl}
                          alt={(item.roomId as IRoom)?.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="">
                        <p className="text-primary-120 text-sm mb-3">預訂參考編號： {item?._id}</p>
                        <h3 className="text-lg mb-3"> {(item.roomId as IRoom)?.name}</h3>

                        <div className="flex flex-col text-base font-medium mb-5">
                          <h3 className="">住宿天數： 3 晚</h3>
                          <h3>住宿人數： {item?.peopleNum} 位</h3>
                        </div>
                        <div className="font-semibold pl-2 border-l-4 border-primary-100 flex flex-col justify-center mb-8">
                          <p className="mb-1">入住： {item?.checkInDate?.toLocaleString().slice(0, 10)}</p>
                          <p className="font-semibold">退房： {item?.checkOutDate?.toLocaleString().slice(0, 10)}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

            {!isLoading && history?.length === 0 && (
              <p className="text-center pb-20 pt-[76px] text-primary-100">- 無歷史行程訂單 -</p>
            )}

            <BtnOutline
              onClick={() => setIsMore(true)}
              className={clsx((isMore || (history?.length ?? 0) < 2) && 'hidden', 'w-full')}
            >
              查看更多
            </BtnOutline>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Orders;
