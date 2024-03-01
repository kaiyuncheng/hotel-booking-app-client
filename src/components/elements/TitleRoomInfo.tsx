import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const TitleRoomInfo = ({ children }: Props) => {
  return (
    <>
      <h4 className="border-l-4 border-primary-100 text-xl pl-3 leading-6 mb-5">{children}</h4>
    </>
  );
};

export default TitleRoomInfo;
