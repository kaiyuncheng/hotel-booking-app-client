import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="max-w-screen-3xl w-full mx-auto px-4 md:px-10 relative">{children}</div>;
};

export default Container;
