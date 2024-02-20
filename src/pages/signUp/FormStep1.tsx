import TextInputDark from '@/components/form/TextInputDark';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetError, UseFormWatch } from 'react-hook-form';

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  watch?: UseFormWatch<T>;
  setError?: UseFormSetError<T>;
  handleValidate?: () => void;
  isLoading?: boolean;
};

const FormStep1 = <T extends FieldValues>({ register, errors, handleValidate, isLoading }: Props<T>) => {
  return (
    <>
      <TextInputDark
        label="電子信箱"
        type="email"
        name="email"
        placeholder="hello@example.com"
        register={register}
        errors={errors}
        rules={{
          onBlur: handleValidate,
        }}
        isLoading={isLoading}
      />
      <TextInputDark
        label="密碼"
        type="password"
        name="password"
        placeholder="請輸入密碼"
        register={register}
        errors={errors}
      />
      <TextInputDark
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
