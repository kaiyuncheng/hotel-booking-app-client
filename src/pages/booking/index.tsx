import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { IRoom } from '@/types/room';
import type { IErrorRes } from '@/types/response';
import { type IOrderForm, selectOrder } from '@/store/slices/orderSlice';
import { selectUser } from '@/store/slices/authSlice';
import { usePostOrderMutation } from '@/store/services/orderServices';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import addressJson from '@/data/address.json';
import type { IAddress } from '@/types/user';
import type { IAddressData, ICity } from '@/hooks/useAddress';
import { useCountyOrder, useZipCode } from '@/hooks/useAddress';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import TitleRoomInfo from '@/components/elements/TitleRoomInfo';
import RoomInfoList from '@/components/elements/RoomInfoList';
import BtnOutline from '@/components/elements/BtnOutline';
import TextInputWhite from '@/components/form/TextInputWhite';
import SelectInputWhite from '@/components/form/SelectInputWhite';
import Loading from '@/components/elements/Loading';
import { IOrder } from '@/types/order';

type postOrderForm = {
  name: string;
  phone: string;
  email: string;
  address: {
    detail: string;
    county: string;
    city: string;
  };
};

const schema = Yup.object().shape({
  name: Yup.string().required('姓名為必填欄位'),
  phone: Yup.string().required('手機號碼為必填欄位'),
  email: Yup.string()
    .required('email為必填欄位')
    .matches(/^[a-z0-9.]{1,64}@[a-z0-9]+\.[a-zA-Z]{2,}$/, 'email格式不對'),
  address: Yup.object().shape({
    detail: Yup.string().required('此為必填欄位'),
    county: Yup.string().required('此為必填欄位'),
    city: Yup.string().required('此為必填欄位'),
  }),
});

const Booking = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<postOrderForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: {
        detail: '',
        county: '',
        city: '',
      },
    },
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const orderInfo = useSelector(selectOrder);
  const userInfo = useSelector(selectUser);
  const [postOrder, { isLoading: postOrderLoading }] = usePostOrderMutation();
  const [successOrder, setSuccessOrder] = useState<IOrder | null>(null);

  // address
  const addressData: IAddressData = addressJson;
  const [cityData, setCityData] = useState<ICity | null>(null);
  const [zipCode, setZipCode] = useState<string>('');
  const [cityOrder, setCityOrder] = useState<string | null>(null);
  const watchAddress = watch('address');
  const handleCountyOrder = useCountyOrder(addressData);
  const handleZipCode = useZipCode(addressData);

  useEffect(() => {
    if (watchAddress?.county) {
      const order = handleCountyOrder(watchAddress.county);
      if (order) {
        setCityData(addressData.city[order]);
        setCityOrder(order);
        setValue('address.city', '');
      }
    }
  }, [watchAddress?.county, addressData.city, setValue, handleCountyOrder]);

  useEffect(() => {
    if (watchAddress?.city && cityOrder) {
      const zip = handleZipCode(cityOrder, watchAddress.city);
      setZipCode(zip);
      // setValue('address.zipcode', Number(zip));
    } else {
      setZipCode('');
    }
  }, [watchAddress?.city, addressData.city, cityOrder, setValue, handleZipCode]);

  useEffect(() => {
    if (!orderInfo.checkInDate) {
      navigate(`/rooms/${id}`);
    }
  }, [id, navigate, orderInfo.checkInDate, pathname]);

  const handleUserInfo = () => {
    if (userInfo) {
      Object.entries(userInfo).forEach(([fieldName, value]) => {
        if (fieldName === 'name' || fieldName === 'phone' || fieldName === 'email' || fieldName === 'address') {
          setValue(fieldName as keyof postOrderForm, value);
        }
      });
    }
  };

  const onSubmit: SubmitHandler<postOrderForm> = async (data) => {
    // console.log('data', data);
    try {
      const dataForm: IOrderForm = {
        roomId: (orderInfo.roomId as IRoom)._id,
        checkInDate: orderInfo.checkInDate,
        checkOutDate: orderInfo.checkOutDate,
        peopleNum: orderInfo.peopleNum,
        userInfo: data,
      };

      const res = await postOrder(dataForm).unwrap();
      res.status && setSuccessOrder(res.result ?? null);
      toast.success('訂單送出成功');
      setSubmitSuccess(true);
    } catch (err) {
      toast.error((err as IErrorRes)?.data.message);
    }
  };

  return (
    <div className={clsx(submitSuccess && 'bg-dark', !submitSuccess && 'bg-primary-40', 'relative pt-10')}>
      <Container>
        {!submitSuccess && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col md:flex-row md:space-x-10 max-w-screen-lg mx-auto font-bold"
          >
            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col mb-5">
              <BtnOutline onClick={() => navigate(`/rooms/${id}`)} className="self-start mb-10">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_406_5430)">
                    <path
                      d="M25.682 27.65L18.0487 20L25.682 12.35L23.332 10L13.332 20L23.332 30L25.682 27.65Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_406_5430">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </BtnOutline>

              <h3 className="text-2xl font-bold mb-5">確認訂房資訊</h3>
              <div className="flex flex-col lg:flex-row lg:items-center">
                <TitleRoomInfo>選擇房型</TitleRoomInfo>
                <p className="font-medium mb-5 ml-4 lg:ml-8">{(orderInfo.roomId as IRoom)?.name}</p>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center">
                <TitleRoomInfo>訂房日期</TitleRoomInfo>
                <p className="mb-2 lg:mb-5 ml-4 lg:ml-8 font-medium">入住： {orderInfo.checkInDate as string}</p>
                <p className="mb-5 ml-4 lg:ml-5 font-medium">退房： {orderInfo.checkOutDate as string}</p>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center mb-5">
                <TitleRoomInfo>房客人數</TitleRoomInfo>
                <p className="mb-5 ml-4 lg:ml-8 font-medium">{orderInfo.peopleNum}人</p>
              </div>

              <div className="border-y border-gray-300 pt-10 pb-8 mb-10">
                <div className="flex justify-between mb-0">
                  <h3 className="text-2xl font-bold">訂房人資訊</h3>
                  <BtnOutline onClick={handleUserInfo}>套用會員資料</BtnOutline>
                </div>
                <div>
                  <TextInputWhite
                    label="姓名"
                    name="name"
                    placeholder="請輸入姓名"
                    register={register}
                    errors={errors}
                  />
                  <TextInputWhite
                    label="手機號碼"
                    name="phone"
                    placeholder="請輸入手機號碼"
                    register={register}
                    errors={errors}
                  />

                  <TextInputWhite
                    label="電子信箱"
                    type="email"
                    name="email"
                    placeholder="hello@example.com"
                    register={register}
                    errors={errors}
                  />

                  <div className="form-control w-full">
                    <label className="label pt-0">
                      <span className="label-text font-bold text-base">地址</span>
                    </label>
                    <div className="flex w-full space-x-2">
                      <p className="w-1/5 input input-primary flex justify-center items-center">{zipCode}</p>

                      <SelectInputWhite
                        label="縣市"
                        name="address.county"
                        className="w-2/5"
                        register={register}
                        render={
                          addressData &&
                          Object.entries(addressData.county).map(([i, item]) => {
                            return (
                              <option key={`county_${i}`} value={item}>
                                {item}
                              </option>
                            );
                          })
                        }
                      />
                      <SelectInputWhite
                        label="鄉鎮"
                        name="address.city"
                        className="w-2/5"
                        register={register}
                        render={
                          watchAddress &&
                          cityData &&
                          Object.values(cityData).map((item, i) => {
                            return (
                              <option key={`city_${i}`} value={item}>
                                {item}
                              </option>
                            );
                          })
                        }
                      />
                    </div>

                    <label className="label text-primary-100">
                      {((errors?.address as IAddress)?.county || (errors?.address as IAddress)?.city) && (
                        <span className="label-text-alt">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current w-4 h-4 inline-block mr-1 mb-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          {errors?.address?.county?.message || errors?.address?.city?.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <TextInputWhite
                    name="address.detail"
                    placeholder="請輸入詳細地址"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-5">房間資訊</h3>
                {orderInfo && <RoomInfoList result={orderInfo.roomId as IRoom} />}
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 mb-10">
              <div className="bg-white rounded-xl p-5 md:p-10 shadow-sm">
                <div className="aspect-[16/9] rounded-lg overflow-hidden mb-5">
                  <img
                    src={(orderInfo.roomId as IRoom)?.imageUrl}
                    alt={(orderInfo.roomId as IRoom)?.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl mb-5">價格詳情</h3>
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">
                    NT$ {(orderInfo.roomId as IRoom)?.price} x {orderInfo.night} 晚
                  </p>
                  <p className="font-bold">
                    NT$ {Number((orderInfo.roomId as IRoom)?.price) * Number(orderInfo.night)}
                  </p>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-8 mb-8">
                  <p className="font-semibold">住宿折扣</p>
                  <p className="font-bold text-primary-100">-NT$ 1000</p>
                </div>

                <div className="flex justify-between mb-8">
                  <p className="font-semibold">總價</p>
                  <p className="font-bold">
                    NT$ {Number((orderInfo.roomId as IRoom)?.price) * Number(orderInfo.night) - 1000}
                  </p>
                </div>
                <div className="form-control">
                  <button type="submit" className={clsx('btn-primary text-white btn font-bold text-base')}>
                    {postOrderLoading && <Loading />}
                    {!postOrderLoading && '確認訂房'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {submitSuccess && (
          <div className="text-white w-full flex flex-col md:flex-row md:space-x-10 max-w-screen-lg mx-auto font-bold">
            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col mb-5">
              <div className="flex items-center mb-8">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="56" height="56" rx="28" fill="#52DD7E" />
                  <g clipPath="url(#clip0_423_8954)">
                    <path
                      d="M22.9974 35L15.9974 28L13.6641 30.3333L22.9974 39.6667L42.9974 19.6667L40.6641 17.3333L22.9974 35Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_423_8954">
                      <rect width="40" height="40" fill="white" transform="translate(8 8)" />
                    </clipPath>
                  </defs>
                </svg>
                <h3 className="text-2xl font-bold ml-5">恭喜，{userInfo?.name}！ 您已預訂成功</h3>
              </div>
              <p className="mb-10">我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。</p>

              <div className="border-y border-gray-300 py-10 mb-10">
                <h3 className="text-2xl font-bold mb-5">立即查看您的訂單紀錄</h3>
                <Link to="/user/orders" className="btn-primary text-white btn font-bold text-base">
                  前往我的訂單
                </Link>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-5">訂房人資訊</h3>

                <h4 className="mb-2">姓名</h4>
                <p className="font-medium mb-5">{successOrder?.userInfo?.name}</p>
                <h4 className="mb-2">手機號碼</h4>
                <p className="font-medium mb-5">{successOrder?.userInfo?.phone}</p>
                <h4 className="mb-2">電子信箱</h4>
                <p className="font-medium">{successOrder?.userInfo?.email}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 mb-10">
              <div className="bg-white rounded-xl p-5 md:p-10 shadow-sm text-dark">
                <p className="text-primary-120 text-sm mb-2">預訂參考編號： {successOrder?._id}</p>
                <h3 className="text-xl mb-5">即將來的行程</h3>
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-5">
                  <img
                    src={(orderInfo.roomId as IRoom)?.imageUrl}
                    alt={(orderInfo.roomId as IRoom)?.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="text-lg mb-1">住宿天數： {orderInfo?.night} 晚</h3>
                <h3 className="text-lg mb-5">住宿人數： {successOrder?.peopleNum} 位</h3>

                <div className="font-semibold pl-2 border-l-4 border-primary-100 flex flex-col justify-center">
                  <p className="mb-1">入住： {successOrder?.checkInDate?.toLocaleString().slice(0, 10)}</p>
                  <p className="font-semibold">退房： {successOrder?.checkOutDate?.toLocaleString().slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer hasDeco={submitSuccess} />
    </div>
  );
};

export default Booking;
