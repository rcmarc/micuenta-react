import clsx from 'clsx';
import React from 'react';

function StyledSelect({ error, children, ...props }, ref) {
  return (
    <select
      className={clsx(
        'hover:bg-slate-30 group peer block w-full rounded-lg border-[1px] border-slate-500 bg-slate-200 p-3 font-medium text-slate-600 outline-none transition-[border-color_background-color]',
        {
          'border-pink-500': error,
          'border-slate-200 hover:border-sky-300': !error,
        }
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
}

export default React.forwardRef(StyledSelect);
