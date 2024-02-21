import { Link, Outlet, useLocation } from 'react-router-dom';
import userBg from '@/assets/images/pc/userBg.jpg';
import Container from './Container';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/authSlice';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const UserLayout = () => {
  const userInfo = useSelector(selectUser);
  const location = useLocation();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    setIsUser(location.pathname === '/user');
  }, [location.pathname]);

  return (
    <div className="text-white">
      <div className="relative">
        <div className="aspect-[2/1] md:aspect-[4/1]">
          <img className="w-full h-full object-cover" src={userBg} alt="hotel" />
        </div>

        <div className="px-4 md:px-0 absolute md:left-[40px] top-1/2 -translate-y-1/2 flex flex-col md:flex-row justify-center md:items-center">
          <div className="avatar md:mr-5 mb-2 md:mb-0">
            <div className="w-20 md:w-24 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <p className="text-4xl font-bold">Hello, {userInfo?.name ?? ''}</p>
        </div>
      </div>

      <Container>
        <ul className="flex font-bold py-10 space-x-10">
          <li className={clsx(isUser && 'text-primary-100', !isUser && 'text-white hover:text-primary-100', 'group')}>
            <Link to="/user">個人資料</Link>
            <div
              className={clsx(
                isUser && 'bg-primary-100',
                !isUser && 'bg-white group-hover:bg-primary-100',
                'w-1/2 translate-x-1/2 h-1 rounded-md mt-2',
              )}
            ></div>
          </li>
          <li className={clsx(!isUser && 'text-primary-100', isUser && 'text-white hover:text-primary-100', 'group')}>
            <Link to="/user/orders">我的訂單</Link>
            <div
              className={clsx(
                !isUser && 'bg-primary-100',
                isUser && 'bg-white group-hover:bg-primary-100',
                'w-1/2 translate-x-1/2 h-1 rounded-md mt-2',
              )}
            ></div>
          </li>
        </ul>
      </Container>
      <Outlet />
    </div>
  );
};

export default UserLayout;
