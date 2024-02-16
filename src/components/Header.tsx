import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials, selectUser } from '@/store/slices/authSlice';

import Container from './Container';
import logo from '@/assets/images/pc/logo.png';
import { toast } from 'react-toastify';

const Header = () => {
  const [top, setTop] = useState(true);
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();

  const [transparent, setTransparent] = useState(true);
  const { pathname } = useLocation();

  const drawerRef = useRef<HTMLInputElement | null>(null);
  const handleCloseDrawer = () => drawerRef.current?.click();
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    drawerRef?.current?.focus();
    navigate(route);
  };

  const handleSignOut = (device: 'mb' | 'pc') => {
    if (device === 'mb') {
      handleCloseDrawer();
    }
    dispatch(clearCredentials());
    localStorage.removeItem('userToken');
    toast.success('已成功登出');
  };

  useEffect(() => {
    setTransparent(pathname === '/rooms' || pathname === '/');
  }, [pathname]);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 130 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <>
      <header
        className={clsx(
          transparent && !top && 'bg-dark/70',
          !transparent && 'bg-dark',
          'drawer drawer-end sticky top-0 z-50',
        )}
      >
        <input id="header-drawer" type="checkbox" className="drawer-toggle" ref={drawerRef} />
        <div className="drawer-content">
          <Container>
            <div className="w-full navbar">
              <div className="flex-1">
                <Link to="/" className="hover:scale-105 transition-all w-[160px]">
                  <img alt="hotel logo" src={logo} />
                </Link>
              </div>
              <div className="flex-none hidden md:block">
                <ul className="menu menu-horizontal px-1 text-white text-base font-bold items-center space-x-2">
                  <li className=" hover:text-primary-100">
                    <Link to="/rooms" className="flex items-center">
                      客房旅宿
                    </Link>
                  </li>
                  <li>
                    {!userInfo && (
                      <Link to="/sign-in" className="flex items-center hover:text-primary-100">
                        會員登入
                      </Link>
                    )}
                    {userInfo && (
                      <div className="dropdown">
                        <div tabIndex={0} role="button" className="flex hover:text-primary-100">
                          <svg
                            className="mr-2"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.27148 18.346C4.27148 18.346 6.50048 15.5 12.0005 15.5C17.5005 15.5 19.7305 18.346 19.7305 18.346M12.0005 12C12.7961 12 13.5592 11.6839 14.1218 11.1213C14.6844 10.5587 15.0005 9.79565 15.0005 9C15.0005 8.20435 14.6844 7.44129 14.1218 6.87868C13.5592 6.31607 12.7961 6 12.0005 6C11.2048 6 10.4418 6.31607 9.87916 6.87868C9.31655 7.44129 9.00048 8.20435 9.00048 9C9.00048 9.79565 9.31655 10.5587 9.87916 11.1213C10.4418 11.6839 11.2048 12 12.0005 12V12Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {userInfo.name}
                        </div>
                        <ul
                          tabIndex={0}
                          className="p-2 pb-5 text-base dropdown-content top-[60px] w-[160px] bg-dark rounded-b-lg"
                        >
                          <li className="items-center ">
                            <button
                              className="hover:text-primary-100"
                              type="button"
                              onClick={() => handleNavigation('/user')}
                            >
                              個人資料
                            </button>
                          </li>
                          <li className="items-center">
                            <button
                              className="hover:text-primary-100"
                              type="button"
                              onClick={() => handleNavigation('/user/orders')}
                            >
                              訂單管理
                            </button>
                          </li>
                          <li className="items-center">
                            <button
                              className="hover:text-primary-100"
                              type="button"
                              onClick={() => handleSignOut('pc')}
                            >
                              登出
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                  <li className="btn btn-primary text-base font-bold text-white">
                    <Link to="/rooms">立即訂房</Link>
                  </li>
                </ul>
              </div>
              <div className="flex-none md:hidden">
                <label
                  htmlFor="header-drawer"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost text-white  hover:text-primary-100"
                >
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
                </label>
              </div>
            </div>
          </Container>
        </div>
        <div className="drawer-side z-50">
          <ul className="menu py-4 px-10 w-full min-h-screen bg-dark text-white text-base font-bold items-center justify-center space-y-6">
            <label
              htmlFor="header-drawer"
              aria-label="close sidebar"
              className="absolute right-4 top-3 btn btn-square btn-ghost text-white  hover:text-primary-100"
            >
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
            <li className=" hover:text-primary-100">
              <Link to="/rooms" className="flex items-center" onClick={handleCloseDrawer}>
                客房旅宿
              </Link>
            </li>
            <li>
              {!userInfo && (
                <Link to="/sign-in" className="flex items-center hover:text-primary-100" onClick={handleCloseDrawer}>
                  會員登入
                </Link>
              )}
              {userInfo && (
                <details>
                  <summary className="hover:text-primary-100">我的帳號</summary>
                  <ul>
                    <li>
                      <Link onClick={handleCloseDrawer} to="/user" className="flex items-center hover:text-primary-100">
                        個人資料
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleCloseDrawer}
                        to="/user/orders"
                        className="flex items-center hover:text-primary-100"
                      >
                        訂單管理
                      </Link>
                    </li>
                    <li>
                      <button className="hover:text-primary-100" type="button" onClick={() => handleSignOut('mb')}>
                        登出
                      </button>
                    </li>
                  </ul>
                </details>
              )}
            </li>
            <li className="btn btn-primary text-base w-full font-bold text-white">
              <Link to="/rooms" onClick={handleCloseDrawer}>
                立即訂房
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
