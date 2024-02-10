import { Outlet } from 'react-router-dom';
import registerBg from '@/assets/images/pc/register.jpg';

const SignLayout = () => {
  return (
    <div className="overflow-hidden w-full flex flex-col md:flex-row mt-[-80px] min-h-screen max-h-screen pt-[80px] h-full">
      <div className="hidden md:block md:w-1/2">
        <img className="w-full h-full object-cover" src={registerBg} alt="hotel" />
      </div>
      <div className="w-full md:w-1/2 font-bold px-4 py-20 xs:px-16 xs:py-10 lg:px-20 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default SignLayout;
