import TextInput from '@/components/form/TextInput';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

const FormStep1 = <T extends FieldValues>({ register, errors }: Props<T>) => {
  return (
    <>
      <TextInput
        label="電子信箱"
        type="email"
        name="email"
        placeholder="hello@example.com"
        register={register}
        errors={errors}
      />
      <TextInput
        label="密碼"
        type="password"
        name="password"
        placeholder="請輸入密碼"
        register={register}
        errors={errors}
      />
      <TextInput
        label="確認密碼"
        type="password"
        name="passwordConfirm"
        placeholder="請再輸入一次密碼"
        register={register}
        errors={errors}
      />
    </>
  );
};

export default FormStep1;
