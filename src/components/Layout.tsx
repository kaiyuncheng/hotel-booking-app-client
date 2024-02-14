import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';

import { setCredentials, selectToken } from '@/store/slices/authSlice';
import { useGetUserQuery } from '@/store/services/userServices';
import LoadingFullPage from './elements/LoadingFullPage';

const Layout = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const { data: userData, isLoading } = useGetUserQuery(undefined, { skip: !token });

  useEffect(() => {
    if (userData?.result) {
      dispatch(setCredentials({ userInfo: userData.result }));
    }
  }, [userData, dispatch]);

  return (
    <>
      {isLoading && <LoadingFullPage />}
      {!isLoading && (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Layout;
