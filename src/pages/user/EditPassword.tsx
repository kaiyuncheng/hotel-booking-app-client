import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import TextInputWhite from '@/components/form/TextInputWhite';
import Loading from '@/components/elements/Loading';

import { Dispatch, SetStateAction } from 'react';
import { useUpdateUserMutation } from '@/store/services/userServices';
import type { IUser } from '@/types/user';
import type { IErrorRes } from '@/types/response';

type Props = {
  setIsEditPasswordOpen: Dispatch<SetStateAction<boolean>>;
  userInfo: IUser;
};

type UpdateUserForm = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

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

const EditPassword = ({ setIsEditPasswordOpen, userInfo }: Props) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<UpdateUserForm> = async (data) => {
    try {
      const dataForm = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        userId: userInfo._id,
      };
      const res = await updateUser(dataForm).unwrap();
      if (res.status) {
        toast.success('密碼修改成功');
        setIsEditPasswordOpen(false);
      }
    } catch (err) {
      toast.error((err as IErrorRes)?.data.message);
    }
  };

  return (
    <div className="relative w-full md:w-1/2 bg-white rounded-xl p-10">
      <button onClick={() => setIsEditPasswordOpen(false)} className="absolute right-8 top-8 " type="button">
        <IoIosCloseCircleOutline className="w-10 h-10 text-primary-100 hover:text-primary-120" />
      </button>
      <h3 className="text-xl font-bold mb-5">修改密碼</h3>

      <div className="mb-3">
        <h4 className="font-bold">電子信箱</h4>
        {userInfo && <p>{userInfo.email}</p>}
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
            {isLoading && <Loading />}
            {!isLoading && '儲存設定'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
