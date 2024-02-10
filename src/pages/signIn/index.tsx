import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Link } from 'react-router-dom';
import TextInput from '@/components/form/TextInput';

type SignInForm = {
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  email: Yup.string().required('email為必填欄位').email('email格式不對'),
  password: Yup.string().required('密碼為必填欄位'),
});
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInForm> = (data) => {
    console.log('form data : ', data);
  };

  return (
    <>
      <p className="text-primary-100 text-sm mb-2">享樂酒店，誠摯歡迎</p>
      <p className="text-white text-4xl mb-10">立即開始旅程</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex justify-between mb-5">
          <div className="form-control">
            <label htmlFor="rememberMe" className="label cursor-pointer">
              <input id="rememberMe" type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text ml-2 text-white">記住帳號</span>
            </label>
          </div>

          <Link
            to="/forget-password"
            className="underline hover:no-underline flex items-center text-sm text-primary-100 hover:text-white"
          >
            忘記密碼？
          </Link>
        </div>
        <div className="form-control mb-2">
          <button type="submit" className="btn btn-secondary font-bold">
            會員登入
          </button>
        </div>
        <div className="flex text-sm">
          <label className="label text-white">
            沒有會員嗎？
            <Link to="/sign-up" className="ml-2 underline hover:no-underline text-primary-100 hover:text-white">
              前往註冊
            </Link>
          </label>
        </div>
      </form>
    </>
  );
};

export default SignIn;
