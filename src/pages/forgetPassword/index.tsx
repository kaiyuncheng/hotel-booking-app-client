import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextInputDark from '@/components/form/TextInputDark';
import Loading from '@/components/elements/Loading';

import type { IErrorRes } from '@/types/response';
import {
  type ForgotPasswordForm,
  useGenerateCodeMutation,
  useForgotPasswordMutation,
} from '@/store/services/authServices';

const getSchema = (isSentCode: boolean) => {
  if (!isSentCode) {
    return Yup.object().shape({
      email: Yup.string().required('email為必填欄位').email('email格式不對'),
    });
  } else {
    return Yup.object().shape({
      email: Yup.string().required('email為必填欄位').email('email格式不對'),
      code: Yup.string().required('驗證碼為必填欄位'),
      newPassword: Yup.string()
        .required('密碼為必填欄位')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
          '密碼必須包含8個字符，其中至少包含一個大寫字母，一個小寫字母，一個數字',
        ),
      newPasswordConfirm: Yup.string()
        .required('確認密碼為必填欄位')
        .oneOf([Yup.ref('newPassword')], '與上方密碼不相同'),
    });
  }
};

const ForgotPassword = () => {
  const [isSentCode, setIsSentCode] = useState(false);
  const navigate = useNavigate();
  const [generateCode, { isLoading: generateCodeLoading }] = useGenerateCodeMutation();
  const [forgotPassword, { isLoading: forgotPasswordLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(getSchema(isSentCode)),
    defaultValues: {
      email: '',
      code: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const submitGenerateCode = async (data: ForgotPasswordForm) => {
    try {
      const res = await generateCode({ email: data.email }).unwrap();
      if (res.status) {
        toast.success('驗證碼發送至您的Email');
        setIsSentCode(true);
      }
    } catch (err) {
      toast.error((err as IErrorRes)?.data.message);
    }
  };

  const submitForgotPasswordForm = async (data: ForgotPasswordForm) => {
    try {
      const dataForm = {
        ...data,
      };
      delete dataForm.newPasswordConfirm;
      const res = await forgotPassword(dataForm).unwrap();
      if (res.status) {
        toast.success('密碼修改成功，請重新登入');
        navigate('/sign-in');
      }
    } catch (err) {
      toast.error((err as IErrorRes)?.data.message);
    }
  };

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    // console.log('form data : ', data);
    if (!isSentCode) {
      submitGenerateCode(data);
    } else if (isValid) {
      submitForgotPasswordForm(data);
    }
  };

  return (
    <>
      <p className="text-primary-100 text-sm mb-2">享樂酒店，誠摯歡迎</p>
      <p className="text-white text-4xl mb-10">忘記密碼</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputDark
          label="電子信箱"
          type="email"
          name="email"
          placeholder="hello@example.com"
          register={register}
          errors={errors}
          disabled={isSentCode}
        />
        <div className="form-control mb-5">
          <button
            disabled={isSentCode}
            type="submit"
            className="disabled:bg-white/20 btn btn-secondary font-bold text-base"
          >
            {!isSentCode && !generateCodeLoading && '發送驗證碼'}
            {isSentCode && !generateCodeLoading && '驗證碼已送出'}
            {generateCodeLoading && <Loading />}
          </button>
        </div>

        {isSentCode && (
          <>
            <TextInputDark label="驗證碼" name="code" placeholder="請輸入驗證碼" register={register} errors={errors} />
            <TextInputDark
              label="新密碼"
              type="password"
              name="newPassword"
              placeholder="請輸入新密碼"
              register={register}
              errors={errors}
            />
            <TextInputDark
              label="確認新密碼"
              type="password"
              name="newPasswordConfirm"
              placeholder="請再輸入一次新密碼"
              register={register}
              errors={errors}
              className="mb-5"
            />

            <div className="form-control mb-2">
              <button type="submit" className="btn btn-primary text-white font-bold text-base">
                {forgotPasswordLoading && <Loading />}
                {!forgotPasswordLoading && '送出'}
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default ForgotPassword;
