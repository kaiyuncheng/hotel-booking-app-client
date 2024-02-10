import clsx from 'clsx';
import { ReactNode } from 'react';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  label?: string;
  name: string | Path<T>;
  className?: string;
  register: UseFormRegister<T>;
  render: ReactNode;
};

const SelectInput = <T extends FieldValues>({ label, name, className, register, render, ...props }: Props<T>) => {
  return (
    <select {...register(name as Path<T>)} className={clsx(className, 'select select-primary')} {...props}>
      <option value="">{label}</option>
      {render}
    </select>
  );
};

export default SelectInput;
