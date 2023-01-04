import React from 'react';
import ErrorMessage from './ErrorMessage';
import InputContainer from './InputContainer';

const InputSelectPlaceholder = ({ placeholder }) => (
  <option value={placeholder} disabled>
    {placeholder}
  </option>
);

function InputSelect({ placeholder, error, children, ...props }, ref) {
  return (
    <InputContainer>
      <select
        ref={ref}
        {...props}
        defaultValue={placeholder}
        className={`block w-full rounded-lg border-2  bg-slate-200 p-3 font-medium text-slate-600 outline-none transition-[border-color_background-color]  hover:bg-slate-300 ${
          error ? 'border-pink-500' : 'border-slate-200 hover:border-sky-300'
        }`}
      >
        <InputSelectPlaceholder placeholder={placeholder} />
        {children}
      </select>
      {error && (
        <ErrorMessage className="absolute">{error.message}</ErrorMessage>
      )}
    </InputContainer>
  );
}

export default React.forwardRef(InputSelect);
