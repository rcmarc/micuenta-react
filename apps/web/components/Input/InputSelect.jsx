import clsx from 'clsx';
import React from 'react';

function InputSelect({ placeholder, error, children, ...props }, ref) {
  return (
    <select
      className={clsx(
        'block w-full rounded-lg border-2  bg-slate-200 p-3 font-medium text-slate-600 outline-none transition-[border-color_background-color] hover:bg-slate-300',
        {
          'border-pink-500': error,
          'border-slate-200 hover:border-sky-300': !error,
        }
      )}
      defaultValue={placeholder}
      ref={ref}
      {...props}
    >
      <InputSelectPlaceholder placeholder={placeholder} />
      {children}
    </select>
  );
}

function InputSelectPlaceholder({ placeholder }) {
  return (
    <option value={placeholder} disabled>
      {placeholder}
    </option>
  );
}

export default React.forwardRef(InputSelect);
