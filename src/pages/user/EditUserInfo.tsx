import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { IUser } from '@/types/user';
import TextInputWhite from '@/components/form/TextInputWhite';
import SelectInputWhite from '@/components/form/SelectInputWhite';

import addressJson from '@/data/address.json';
import type { IAddress } from '@/types/user';
import type { IAddressData, ICity } from '@/hooks/useAddress';
import { useCountyOrder, useZipCode } from '@/hooks/useAddress';

interface EditUserInfoForm extends IUser {
  userId?: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('姓名為必填欄位'),
  phone: Yup.string().required('手機號碼為必填欄位'),
  birthday: Yup.object().shape({
    year: Yup.string().required('此為必填欄位'),
    month: Yup.string().required('此為必填欄位'),
    day: Yup.string().required('此為必填欄位'),
  }),
  address: Yup.object().shape({
    detail: Yup.string().required('此為必填欄位'),
    county: Yup.string().required('此為必填欄位'),
    city: Yup.string().required('此為必填欄位'),
  }),
});

const EditPassword = () => {
  const {
    register,
    handleSubmit,
    // getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditUserInfoForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      birthday: {
        year: '',
        month: '',
        day: '',
      },
      address: {
        zipcode: null,
        detail: '',
        county: '',
        city: '',
      },
    },
  });

  const thisYear = new Date().getFullYear();
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
      setValue('address.zipcode', Number(zip));
    } else {
      setZipCode('');
    }
  }, [watchAddress?.city, addressData.city, cityOrder, setValue, handleZipCode]);

  const onSubmit: SubmitHandler<EditUserInfoForm> = async (data) => {
    console.log('form data : ', data);
    // try {
    //   const res = await signIn({ email: data.email, password: data.password }).unwrap();
    //   data.isRemember ? localStorage.setItem('userEmail', data.email) : localStorage.removeItem('userEmail');
    //   localStorage.setItem('userToken', res.token);
    //   dispatch(
    //     setCredentials({
    //       userToken: res.token,
    //       userInfo: res.result,
    //     }),
    //   );
    //   navigate('/');
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="w-full md:w-1/2 bg-white rounded-xl p-10">
      <h3 className="text-xl font-bold mb-5">修改基本資料</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputWhite label="姓名" name="name" placeholder="請輸入姓名" register={register} errors={errors} />
        <TextInputWhite
          label="手機號碼"
          name="phone"
          placeholder="請輸入手機號碼"
          register={register}
          errors={errors}
        />

        <div className="form-control w-full">
          <label className="label pt-0">
            <span className="label-text font-bold text-base">生日</span>
          </label>
          <div className="flex w-full space-x-2">
            <SelectInputWhite
              label="年"
              name="birthday.year"
              className="w-1/3"
              register={register}
              render={[...Array(100)].map((_, i) => {
                return (
                  <option key={`year_${i}`} value={thisYear - i}>
                    {thisYear - i} 年
                  </option>
                );
              })}
            />
            <SelectInputWhite
              label="月"
              name="birthday.month"
              className="w-1/3"
              register={register}
              render={[...Array(12)].map((_, i) => {
                return (
                  <option key={`month_${i}`} value={i + 1}>
                    {i + 1} 月
                  </option>
                );
              })}
            />
            <SelectInputWhite
              label="日"
              name="birthday.day"
              className="w-1/3"
              register={register}
              render={[...Array(31)].map((_, i) => {
                return (
                  <option key={`day_${i}`} value={i + 1}>
                    {i + 1} 日
                  </option>
                );
              })}
            />
          </div>
          <label className="label text-primary-100">
            {(errors?.birthday?.year || errors?.birthday?.month || errors?.birthday?.day) && (
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
                {errors?.birthday?.year?.message || errors?.birthday?.month?.message || errors?.birthday?.day?.message}
              </span>
            )}
          </label>
        </div>

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
        <TextInputWhite name="address.detail" placeholder="請輸入詳細地址" register={register} errors={errors} />

        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary text-white w-full font-bold text-base">
            儲存設定
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
