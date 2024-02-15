import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  onClick?: MouseEventHandler;
  className?: string;
  children: ReactNode;
};

const BtnOutline = ({ onClick, className, children, ...props }: Props) => {
  return (
    <button
      className={clsx(
        className,
        'btn bg-white text-primary-100 hover:bg-primary-tint hover:text-primary-120 text-base font-bold',
      )}
      type="button"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default BtnOutline;
