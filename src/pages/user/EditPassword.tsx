import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextInputWhite from '@/components/form/TextInputWhite';

interface NewPasswordForm {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const schema = Yup.object().shape({
  oldPassword: Yup.string().required('舊密碼為必填欄位'),
  newPassword: Yup.string()
    .required('新密碼為必填欄位')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      '密碼必須包含8個字符，其中至少包含一個大寫字母，一個小寫字母，一個數字',
    ),
  newPasswordConfirm: Yup.string()
    .required('確認新密碼為必填欄位')
    .oneOf([Yup.ref('newPassword')], '與上方密碼不相同'),
});

const EditPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<NewPasswordForm> = async (data) => {
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
      <h3 className="text-xl font-bold mb-5">修改密碼</h3>
      <div className="mb-3">
        <h4 className="font-bold">電子信箱</h4>
        <p>Jessica@exsample.com</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputWhite
          label="舊密碼"
          type="password"
          name="oldPassword"
          placeholder="請輸入舊密碼"
          register={register}
          errors={errors}
        />

        <TextInputWhite
          label="新密碼"
          type="password"
          name="newPassword"
          placeholder="請輸入新密碼"
          register={register}
          errors={errors}
        />

        <TextInputWhite
          label="確認新密碼"
          type="password"
          name="newPasswordConfirm"
          placeholder="請再輸入一次新密碼"
          register={register}
          errors={errors}
        />
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
