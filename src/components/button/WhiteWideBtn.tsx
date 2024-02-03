import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link: string;
  children: ReactNode;
};

const WhiteWideBtn = ({ link, children }: Props) => {
  return (
    <Link to={link} className="w-full justify-end btn btn-secondary btn-lg font-bold text-black">
      {children}
      <span className="inline-block h-[1px] w-[120px] bg-black ml-5"></span>
    </Link>
  );
};

export default WhiteWideBtn;
