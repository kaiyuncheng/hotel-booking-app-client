import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import TextInputDark from '@/components/form/TextInputDark';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { SignInForm } from '@/store/services/authServices';
import { setCredentials } from '@/store/slices/authSlice';
import { useSignInMutation } from '@/store/services/authServices';
import { IErrorRes } from '@/types/response';
import Loading from '@/components/elements/Loading';

const schema = Yup.object().shape({
  email: Yup.string().required('email為必填欄位').email('email格式不對'),
  password: Yup.string().required('密碼為必填欄位'),
});
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: localStorage.getItem('userEmail') ?? '',
      password: '',
      isRemember: false,
    },
  });

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    // console.log('form data : ', data);
    try {
      const res = await signIn({ email: data.email, password: data.password }).unwrap();
      data.isRemember ? localStorage.setItem('userEmail', data.email) : localStorage.removeItem('userEmail');
      localStorage.setItem('userToken', res.token as string);
      dispatch(
        setCredentials({
          userToken: res.token,
          userInfo: res.result,
        }),
      );
      toast.success('會員登入成功');
      navigate('/');
    } catch (err) {
      toast.error((err as IErrorRes)?.data.message);
    }
  };

  return (
    <>
      <p className="text-primary-100 text-sm mb-2">享樂酒店，誠摯歡迎</p>
      <p className="text-white text-4xl mb-10">立即開始旅程</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputDark
          label="電子信箱"
          type="email"
          name="email"
          placeholder="hello@example.com"
          register={register}
          errors={errors}
        />
        <TextInputDark
          label="密碼"
          type="password"
          name="password"
          placeholder="請輸入密碼"
          register={register}
          errors={errors}
        />

        <div className="flex justify-between mb-5">
          <div className="form-control">
            <label htmlFor="isRemember" className="label cursor-pointer">
              <input
                {...register('isRemember')}
                id="isRemember"
                type="checkbox"
                className="checkbox checkbox-primary"
              />
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
          <button type="submit" className="btn btn-secondary font-bold text-base">
            {isLoading && <Loading />}
            {!isLoading && '會員登入'}
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
