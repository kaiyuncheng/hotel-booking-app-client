import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  num: number;
  title: string;
  active?: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  isValid: boolean;
};

const Step = ({ num, title, active = false, setStep, isValid }: Props) => {
  return (
    <div className="w-1/4 flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={() => setStep(num)}
        className={clsx(
          active && 'btn-primary text-white',
          !active && !isValid && 'pointer-events-none',
          'btn btn-circle btn-sm hover:btn-primary hover:text-white mb-2',
        )}
      >
        {num}
      </button>
      <p className="text-sm whitespace-nowrap">{title}</p>
    </div>
  );
};

export default Step;
