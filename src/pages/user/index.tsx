import { useState } from 'react';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import BtnSecondary from '@/components/elements/BtnOutline';

import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/authSlice';

import EditPassword from './EditPassword';
import EditUserInfo from './EditUserInfo';

const User = () => {
  const userInfo = useSelector(selectUser);
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
  const [isEditUserInfoOpen, setIsEditUserInfoOpen] = useState(false);

  return (
    <>
      <Container>
        <div className="flex flex-col md:flex-row md:items-start text-black space-y-5 md:space-y-0 md:space-x-5 mb-10">
          {userInfo && !isEditPasswordOpen && (
            <div className="w-full md:w-1/2 bg-white rounded-xl p-10">
              <h3 className="text-xl font-bold mb-5">帳號資料</h3>
              <div className="mb-3">
                <h4 className="font-bold">電子信箱</h4>
                <p>{userInfo?.email}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <h4 className="font-bold">密碼</h4>
                  <p> ● ● ● ● ● ● ● ●</p>
                </div>
                <button
                  onClick={() => setIsEditPasswordOpen(true)}
                  className="btn btn-primary text-base font-bold text-white"
                  type="button"
                >
                  重設
                </button>
              </div>
            </div>
          )}
          {userInfo && isEditPasswordOpen && (
            <EditPassword setIsEditPasswordOpen={setIsEditPasswordOpen} userInfo={userInfo} />
          )}
          {userInfo && !isEditUserInfoOpen && (
            <div className="w-full md:w-1/2 bg-white rounded-xl p-10">
              <h3 className="text-xl font-bold mb-5">基本資料</h3>
              <div className="mb-3">
                <h4 className="font-bold">姓名</h4>
                <p>{userInfo?.name ?? ''}</p>
              </div>
              <div className="mb-3">
                <h4 className="font-bold">手機號碼</h4>
                <p>{userInfo?.phone ?? ''}</p>
              </div>
              <div className="mb-3">
                <h4 className="font-bold">生日</h4>
                <p>{(userInfo?.birthday as string).slice(0, 10) ?? ''}</p>
              </div>
              <div className="mb-5">
                <h4 className="font-bold">地址</h4>
                <p>{`${userInfo?.address?.zipcode ?? ''} ${userInfo?.address?.county ?? ''}${userInfo?.address?.city ?? ''}${userInfo?.address?.detail ?? ''}`}</p>
              </div>
              <BtnSecondary onClick={() => setIsEditUserInfoOpen(true)}>編輯</BtnSecondary>
            </div>
          )}
          {userInfo && isEditUserInfoOpen && (
            <EditUserInfo setIsEditUserInfoOpen={setIsEditUserInfoOpen} userInfo={userInfo} />
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default User;
