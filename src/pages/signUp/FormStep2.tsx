import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import addressJson from '@/data/address.json';
import type { IAddress, IBirthday } from '@/types/user';

interface City {
  [zipCode: string]: string;
}

interface AddressData {
  county: { [countyCode: string]: string };
  city: { [countyCode: string]: City };
}

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}

const FormStep2 = <T extends FieldValues>({ register, errors, watch, setValue }: Props<T>) => {
  // birthday
  const thisYear = new Date().getFullYear();

  // address
  const addressData: AddressData = addressJson;
  const [cityData, setCityData] = useState<City | null>(null);
  const [zipCode, setZipCode] = useState<string>('');
  const [cityOrder, setCityOrder] = useState<string | null>(null);
  const watchAddress = watch('address' as Path<T>);

  const handleCountyOrder = useCallback(
    (county: string): string | null => {
      for (const [order, item] of Object.entries(addressData.county)) {
        if (item === county) {
          return order;
        }
      }
      return null;
    },
    [addressData.county],
  );

  const handleZipCode = useCallback(
    (order: string, city: string): string => {
      for (const [zip, item] of Object.entries(addressData.city[order])) {
        if (item === city) {
          return zip;
        }
      }
      return '';
    },
    [addressData.city],
  );

  useEffect(() => {
    if (watchAddress?.county) {
      const order = handleCountyOrder(watchAddress.county);
      if (order) {
        setCityData(addressData.city[order]);
        setCityOrder(order);
        setValue('address.city' as Path<T>, '' as PathValue<T, Path<T>>);
      }
    }
  }, [watchAddress?.county, addressData.city, setValue, handleCountyOrder]);

  useEffect(() => {
    if (watchAddress?.city && cityOrder) {
      const zip = handleZipCode(cityOrder, watchAddress.city);
      setZipCode(zip);
      setValue('address.zipcode' as Path<T>, Number(zip) as PathValue<T, Path<T>>);
    } else {
      setZipCode('');
    }
  }, [watchAddress?.city, addressData.city, cityOrder, setValue, handleZipCode]);

  return (
    <>
      <TextInput label="姓名" name="name" placeholder="請輸入姓名" register={register} errors={errors} />
      <TextInput label="手機號碼" name="phone" placeholder="請輸入手機號碼" register={register} errors={errors} />

      <div className="form-control w-full">
        <label className="label pt-0">
          <span className="label-text text-white">生日</span>
        </label>
        <div className="flex w-full space-x-2">
          <SelectInput
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
          <SelectInput
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
          <SelectInput
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
          {((errors?.birthday as IBirthday)?.year ||
            (errors?.birthday as IBirthday)?.month ||
            (errors?.birthday as IBirthday)?.day) && (
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
              {((errors?.birthday as IBirthday)?.year as unknown as FieldError)?.message ||
                ((errors?.birthday as IBirthday)?.month as unknown as FieldError)?.message ||
                ((errors?.birthday as IBirthday)?.day as unknown as FieldError)?.message}
            </span>
          )}
        </label>
      </div>

      <div className="form-control w-full">
        <label className="label pt-0">
          <span className="label-text text-white">地址</span>
        </label>
        <div className="flex w-full space-x-2">
          <p className="w-1/5 input input-primary flex justify-center items-center">{zipCode}</p>

          <SelectInput
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
          <SelectInput
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
              {((errors?.address as IAddress)?.county as unknown as FieldError)?.message ||
                ((errors?.address as IAddress)?.city as unknown as FieldError)?.message}
            </span>
          )}
        </label>
      </div>
      <TextInput name="address.detail" placeholder="請輸入詳細地址" register={register} errors={errors} />

      <div className="form-control flex-row">
        <label htmlFor="isAgree" className="label cursor-pointer">
          <input
            id="isAgree"
            {...register('isAgree' as Path<T>)}
            type="checkbox"
            className="checkbox checkbox-primary"
          />
          <span className="label-text ml-2 text-white">我已閱讀並同意本網站個資使用規範</span>
        </label>
      </div>
    </>
  );
};

export default FormStep2;
