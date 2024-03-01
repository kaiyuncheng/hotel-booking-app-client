import { type ReactNode, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '@/store/slices/authSlice';
import { setOrder } from '@/store/slices/orderSlice';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Loading from '@/components/elements/Loading';

import { useGetRoomQuery } from '@/store/services/roomServices';

import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BtnOutline from '@/components/elements/BtnOutline';
import RoomInfoHero from './RoomInfoHero';
import RoomInfoBody from './RoomInfoBody';

const Room = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id } = useParams();
  const { data, isLoading, error } = useGetRoomQuery(id || '');

  const [num, setNum] = useState(2);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    return nextDay;
  });
  const [night, setNight] = useState(1);
  const [step, setStep] = useState(0);

  const roomDrawerRef = useRef<HTMLInputElement | null>(null);
  const handleDrawer = () => roomDrawerRef.current?.click();

  useEffect(() => {
    if (endDate > startDate) {
      setNight(Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)));
    } else {
      setNight(1);
    }
  }, [endDate, startDate]);

  useEffect(() => {
    if (error) {
      navigate('/rooms');
    }
  }, [error, navigate]);

  const handleNum = (format: string) => {
    if (format === '+' && data?.result.maxPeople && num < data.result.maxPeople) {
      setNum(num + 1);
    }
    if (format === '-' && num > 2) {
      setNum(num - 1);
    }
  };

  const handleClear = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleStep = (num: number, open: boolean = false) => {
    open && handleDrawer();
    setStep(num);
  };

  const handleBooking = () => {
    if (!token) {
      toast.error('請先登入會員');
    }
    dispatch(
      setOrder({
        roomId: data?.result,
        checkInDate: startDate,
        checkOutDate: endDate,
        peopleNum: num,
        night: night,
      }),
    );

    navigate(`/rooms/${data?.result._id}}/booking`);
  };

  const DatepickerContainer = ({ children }: { children: ReactNode }) => {
    return (
      <div className="py-5 px-5 rounded-lg  bg-white">
        <div className="flex justify-between mb-5">
          <div className="flex flex-col justify-center">
            <p className="text-2xl mb-2">{night} 晚</p>
            <p className="text-lg text-primary-120">
              {startDate.toLocaleDateString().slice(0, 10)} ~ {endDate.toLocaleDateString().slice(0, 10)}
            </p>
          </div>
          <div className="flex space-x-5">
            <div className="border border-dark w-full pl-3 pr-10 py-3 rounded-lg">
              <p className="text-sm mb-2">入住</p>
              <p>{startDate.toLocaleDateString().slice(0, 10)}</p>
            </div>
            <div className="border border-dark w-full  pl-3 pr-10  py-3 rounded-lg">
              <p className="text-sm mb-2">退房</p>
              <p>{endDate.toLocaleDateString().slice(0, 10)}</p>
            </div>
          </div>
        </div>

        <CalendarContainer>
          <div className="relative">{children}</div>
        </CalendarContainer>
        <div className="clear-both mt-5 font-serif text-end w-full space-x-5">
          <BtnOutline onClick={handleClear}>清除日期</BtnOutline>
          {/* <button type="button" className="text-base btn btn-primary text-white">
            確定日期
          </button> */}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-primary-40 relative pb-16">
      <Container>
        {isLoading && (
          <div className="w-full flex justify-center py-[300px]">
            <Loading />
          </div>
        )}
        {!isLoading && data && (
          <div className="relative flex flex-col max-w-screen-xl mx-auto font-bold pt-10 pb-20">
            <RoomInfoHero result={data.result} />
            <div className="w-full flex flex-col md:flex-row space-x-10 max-w-screen-lg mx-auto">
              <div className="w-full  md:w-1/2 lg:w-3/5 flex flex-col">
                <RoomInfoBody result={data.result} />
              </div>
              <div className="hidden md:block md:w-1/2 lg:w-2/5">
                <div className="bg-white rounded-xl p-10 shadow-sm">
                  <p className="text-xl border-b border-gray-200 pb-3 mb-10">預定房型</p>
                  <h3 className="text-3xl font-bold mb-2 transition-all text-gray-700">{data.result.name}</h3>
                  <p className="font-semibold mb-10">{data.result.description}</p>
                  <div>
                    <div className="flex mb-10">
                      <div className="w-1/2 flex items-center pr-2">
                        <div className="border border-dark w-full px-2 py-4 rounded-lg">
                          <p className="text-sm mb-2">入住</p>
                          <DatePicker
                            calendarContainer={DatepickerContainer}
                            className="w-full focus-visible:outline-none"
                            selected={startDate}
                            onChange={(date) => setStartDate(date || new Date())}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            withPortal
                            monthsShown={2}
                          />
                        </div>
                      </div>
                      <div className="w-1/2 flex items-center pl-2">
                        <div className="border border-dark w-full px-2 py-4 rounded-lg">
                          <p className="text-sm mb-2">退房</p>
                          <DatePicker
                            calendarContainer={DatepickerContainer}
                            className="w-full focus-visible:outline-none"
                            selected={endDate}
                            onChange={(date) => setEndDate(date || new Date())}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            withPortal
                            monthsShown={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-10">
                      <p>人數</p>
                      <div className="flex items-center">
                        <button
                          disabled={num <= 2}
                          onClick={() => handleNum('-')}
                          type="button"
                          className={clsx(
                            'disabled:bg-primary-tint disabled:border-primary-tint disabled:text-primary-40 text-dark border border-primary-40 rounded-full p-4 hover:bg-primary-40',
                          )}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M19 13H5V11H19V13Z" fill="currentColor" />
                          </svg>
                        </button>
                        <p className="text-lg mx-5">{num}</p>
                        <button
                          disabled={num >= data.result.maxPeople}
                          onClick={() => handleNum('+')}
                          type="button"
                          className="disabled:bg-primary-tint disabled:border-primary-tint disabled:text-primary-40 text-dark border border-primary-40 rounded-full p-4 hover:bg-primary-40"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl text-primary-100">
                        NT$ {data.result.price} <span className="text-xs text-primary-80">/ 晚</span>
                      </p>
                      <span className="text-dark text-xl">{night} 晚</span>
                    </div>
                    <div className="form-control mt-4 mb-2">
                      <button
                        onClick={handleBooking}
                        type="submit"
                        className={clsx('btn-primary text-white btn font-bold text-base')}
                      >
                        立即預訂
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer hasDeco={false} />

      {!isLoading && data && (
        <div className="drawer z-50 md:hidden fixed bottom-0 left-0 bg-white border-t border-gray-200">
          <input id="room-drawer" type="checkbox" className="drawer-toggle" ref={roomDrawerRef} />
          <div className="drawer-content flex justify-between items-center px-4 py-2">
            {step !== 3 && (
              <>
                <p className="text-2xl font-bold">
                  NT$ {data?.result.price} <span className="text-xs">/ 晚</span>
                </p>
                <button
                  onClick={() => handleStep(1, true)}
                  type="button"
                  className={clsx('btn-primary text-white btn font-bold text-base')}
                >
                  查看可訂日期
                </button>
              </>
            )}
            {step === 3 && (
              <>
                <div className="flex flex-col justify-center font-bold">
                  <p className="text-lg">
                    NT$ {data?.result.price}
                    <span>
                      / {night} 晚 / {num} 人
                    </span>
                  </p>
                  <p className="text-base text-primary-120">
                    {startDate.toLocaleDateString().slice(0, 10)} ~ {endDate.toLocaleDateString().slice(0, 10)}
                  </p>
                </div>

                <button
                  onClick={handleBooking}
                  type="button"
                  className={clsx('btn-primary text-white btn font-bold text-base')}
                >
                  立即預訂
                </button>
              </>
            )}
          </div>
          <div className="drawer-side">
            <div className="w-full h-full bg-primary-tint  text-white text-base font-bold flex flex-col justify-center">
              <label
                htmlFor="room-drawer"
                aria-label="close sidebar"
                className="absolute right-4 top-4 btn btn-square btn-ghost text-dark  hover:text-primary-100"
              >
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
              {step === 1 && (
                <div className="px-5">
                  <p className="text-dark text-xl mb-5">請選擇入住期間</p>
                  <div className="w-full mb-4 flex justify-center items-center">
                    <DatePicker
                      calendarClassName="mobileDatePicker"
                      selected={startDate}
                      onChange={handleChange}
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      monthsShown={2}
                      selectsRange
                      inline
                    />
                  </div>
                  <div className="flex space-x-5">
                    <BtnOutline className="flex-1" onClick={handleClear}>
                      清除日期
                    </BtnOutline>
                    <button
                      onClick={() => handleStep(2)}
                      type="button"
                      className="flex-1 text-base btn btn-primary text-white"
                    >
                      確定日期
                    </button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="">
                  <div className="p-5 flex flex-col justify-center">
                    <p className="text-2xl mb-2 text-dark">{night} 晚</p>
                    <p className="text-lg text-primary-120">
                      {startDate.toLocaleDateString().slice(0, 10)} ~ {endDate.toLocaleDateString().slice(0, 10)}
                    </p>
                  </div>

                  <div className="p-5 border-y border-gray-200 mb-5 bg-white">
                    <p className="text-dark text-xl mb-2">選擇人數</p>
                    <p className="text-gray-800 mb-2">此房型最多供 4 人居住，不接受寵物入住。</p>
                    <div className="flex items-center">
                      <button
                        disabled={num <= 2}
                        onClick={() => handleNum('-')}
                        type="button"
                        className={clsx(
                          'disabled:bg-primary-tint disabled:border-primary-40 disabled:text-primary-40 text-dark border border-primary-40 rounded-full p-4 hover:bg-primary-40',
                        )}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 13H5V11H19V13Z" fill="currentColor" />
                        </svg>
                      </button>
                      <p className="text-lg mx-5 text-dark">{num}</p>
                      <button
                        disabled={num >= data.result.maxPeople}
                        onClick={() => handleNum('+')}
                        type="button"
                        className="disabled:bg-primary-tint disabled:border-primary-tint disabled:text-primary-40 text-dark border border-primary-40 rounded-full p-4 hover:bg-primary-40"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-5 px-5">
                    <BtnOutline className="flex-1" onClick={() => handleStep(1)}>
                      重新選擇日期
                    </BtnOutline>
                    <button
                      onClick={() => handleStep(3, true)}
                      type="button"
                      className="flex-1 text-base btn btn-primary text-white"
                    >
                      儲存
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
