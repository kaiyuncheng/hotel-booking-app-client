import { Link } from 'react-router-dom';
import logo from '@/assets/images/pc/logo.png';
import { useRef } from 'react';

const Header = () => {
  const drawerRef = useRef<HTMLInputElement | null>(null);
  function closeDrawer() {
    drawerRef.current?.click();
  }

  return (
    <header className="drawer drawer-end sticky top-0 z-20">
      <input id="header-drawer" type="checkbox" className="drawer-toggle" ref={drawerRef} />
      <div className="max-w-screen-3xl w-full mx-auto">
        <div className="drawer-content flex">
          <div className="w-full navbar px-4 md:px-10 ">
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
                  <Link to="/sign-in" className="flex items-center hover:text-primary-100">
                    會員登入
                  </Link>
                  {/* <details>
                    <summary className="hover:text-primary-100">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.27148 18.346C4.27148 18.346 6.50048 15.5 12.0005 15.5C17.5005 15.5 19.7305 18.346 19.7305 18.346M12.0005 12C12.7961 12 13.5592 11.6839 14.1218 11.1213C14.6844 10.5587 15.0005 9.79565 15.0005 9C15.0005 8.20435 14.6844 7.44129 14.1218 6.87868C13.5592 6.31607 12.7961 6 12.0005 6C11.2048 6 10.4418 6.31607 9.87916 6.87868C9.31655 7.44129 9.00048 8.20435 9.00048 9C9.00048 9.79565 9.31655 10.5587 9.87916 11.1213C10.4418 11.6839 11.2048 12 12.0005 12V12Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Jessica
                    </summary>
                    <ul className="p-2 bg-black rounded-t-none">
                      <li>
                        <a>個人資料</a>
                      </li>
                      <li>
                        <a>訂單管理</a>
                      </li>
                      <li>
                        <a>登出</a>
                      </li>
                    </ul>
                  </details> */}
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
        </div>
      </div>

      <div className="drawer-side">
        <ul className="menu py-4 px-10 w-full min-h-full bg-dark text-white text-base font-bold items-center justify-center space-y-6">
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
            <Link to="/rooms" className="flex items-center" onClick={closeDrawer}>
              客房旅宿
            </Link>
          </li>
          <li>
            {/* <Link to="/sign-in" className="flex items-center hover:text-primary-100" onClick={closeDrawer}>
                會員登入
              </Link> */}

            <details>
              <summary className="hover:text-primary-100">我的帳號</summary>
              <ul>
                <li>
                  <Link onClick={closeDrawer} to="/user" className="flex items-center hover:text-primary-100">
                    個人資料
                  </Link>
                </li>
                <li>
                  <Link onClick={closeDrawer} to="/user/orders" className="flex items-center hover:text-primary-100">
                    訂單管理
                  </Link>
                </li>
                <li>
                  <a onClick={closeDrawer}>登出</a>
                </li>
              </ul>
            </details>
          </li>
          <li className="btn btn-primary text-base w-full font-bold text-white">
            <Link to="/rooms" onClick={closeDrawer}>
              立即訂房
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
