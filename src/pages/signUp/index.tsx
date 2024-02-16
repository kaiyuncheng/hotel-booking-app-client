import { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Step from './Step';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';

import type { IErrorRes } from '@/types/response';
import type { IBirthday } from '@/types/user';

import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { useSignUpMutation, type SignUpForm } from '@/store/services/authServices';
import Loading from '@/components/elements/Loading';

const getSchemaForStep = (step: number) => {
  switch (step) {
    case 1:
      return Yup.object().shape({
        email: Yup.string().required('email為必填欄位').email('email格式不對'),
        password: Yup.string()
          .required('密碼為必填欄位')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            '密碼必須包含8個字符，其中至少包含一個大寫字母，一個小寫字母，一個數字',
          ),
        passwordConfirm: Yup.string()
          .required('確認密碼為必填欄位')
          .oneOf([Yup.ref('password')], '與上方密碼不相同'),
      });
    case 2:
      return Yup.object().shape({
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
        isAgree: Yup.boolean().oneOf([true], '需要同意條款').required('需要同意條款'),
      });
    default:
      return Yup.object().shape({});
  }
};

const SignUp = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: yupResolver(getSchemaForStep(step)),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
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
      isAgree: false,
    },
  });

  const nextStep = () => {
    console.log('next: ', getValues());
    setStep((curr) => curr + 1);
  };

  const submitSignUpForm = async (data: SignUpForm) => {
    try {
      const dataForm = {
        ...data,
        birthday: `${(data?.birthday as IBirthday)?.year}/${(data?.birthday as IBirthday)?.month}/${(data?.birthday as IBirthday)?.day}`,
      };

      delete dataForm.isAgree;
      delete dataForm.passwordConfirm;

      console.log(dataForm);
      const res = await signUp(dataForm).unwrap();

      dispatch(
        setCredentials({
          userToken: res.token,
          userInfo: res.result,
        }),
      );
      toast.success('會員註冊成功');
      navigate('/');
    } catch (err) {
      toast.error((err as IErrorRes)?.data.message);
    }
  };

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    if (step < 2) {
      nextStep();
    } else if (isValid) {
      submitSignUpForm(data);
    }
  };

  return (
    <>
      <p className="text-primary-100 text-sm mb-2">享樂酒店，誠摯歡迎</p>
      <p className="text-white text-4xl mb-10 md:mb-5">立即註冊</p>
      <div className="mb-10 md:mb-5 flex justify-between items-center text-white">
        <Step title="輸入信箱及密碼" num={1} active={true} setStep={setStep} isValid={isValid} />
        <div className="h-[1px] w-1/2 mx-5 flex-shrink bg-white"></div>
        <Step title="填寫基本資料" num={2} active={step === 2} setStep={setStep} isValid={isValid} />
      </div>

      {console.log(errors)}

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <FormStep1 register={register} errors={errors} />}
        {step === 2 && <FormStep2 register={register} errors={errors} watch={watch} setValue={setValue} />}

        <div className="form-control mt-4 mb-2">
          <button
            type="submit"
            className={clsx(
              step === 1 && 'btn-secondary',
              step === 2 && 'btn-primary text-white',
              'btn font-bold text-base',
            )}
          >
            {step === 1 && '下一步'}
            {step === 2 && !isLoading && '完成註冊'}
            {isLoading && <Loading />}
          </button>
        </div>

        <div className="flex text-sm">
          <label className="label text-white">
            已經有會員了嗎？
            <Link to="/sign-in" className="ml-2 underline hover:no-underline text-primary-100 hover:text-white">
              立即登入
            </Link>
          </label>
        </div>
      </form>
    </>
  );
};

export default SignUp;
