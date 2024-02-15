import { Path, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string | Path<T>;
  required?: boolean;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

const TextInputWhite = <T extends FieldValues>({
  label,
  type = 'text',
  placeholder,
  name,
  required = false,
  register,
  errors,
  ...props
}: Props<T>) => {
  return (
    <div className="form-control">
      {label && (
        <label className="label pt-0 pl-0" htmlFor={name}>
          <span className="label-text font-bold text-base">
            {label}
            {required && '*'}
          </span>
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name as Path<T>)}
        autoComplete={type === 'password' ? 'new-password' : undefined}
        {...props}
        className="input input-primary border-gray-300"
      />
      <label className="label text-primary-100">
        {errors && errors[name] && (
          <span className="label-text-alt">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current w-4 h-4 inline-block mr-1 mb-0.5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {errors[name]?.message as string}
          </span>
        )}
      </label>
    </div>
  );
};

export default TextInputWhite;
