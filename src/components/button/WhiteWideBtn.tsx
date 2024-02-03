import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link: string;
  children: ReactNode;
};

const WhiteWideBtn = ({ link, children }: Props) => {
  return (
    <Link
      to={link}
      className="group w-full justify-end btn btn-secondary border-none hover:bg-primary-100 btn-lg font-bold text-black hover:text-white"
    >
      {children}
      <span className="inline-block h-[1px] w-[120px] bg-black group-hover:bg-white ml-5"></span>
    </Link>
  );
};

export default WhiteWideBtn;
