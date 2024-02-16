import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';

import { setCredentials, selectToken } from '@/store/slices/authSlice';
import { useGetUserQuery } from '@/store/services/userServices';
import LoadingFullPage from './elements/LoadingFullPage';
import { ToastContainer, Bounce } from 'react-toastify';

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
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default Layout;
