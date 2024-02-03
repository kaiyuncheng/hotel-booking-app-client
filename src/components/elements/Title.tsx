import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Title = ({ children }: Props) => {
  return (
    <>
      <h2 className="text-4xl text-primary-100 font-bold tracking-widest mb-5 w-[80px]">{children}</h2>
      <div className="block w-[80px] h-[1px] bg-gradient-to-r from-primary-100 to-white"></div>
    </>
  );
};

export default Title;
