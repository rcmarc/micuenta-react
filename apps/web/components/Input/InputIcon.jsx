import React from 'react';
import clsx from 'clsx';

function InputIcon({ icon, onClick }) {
  return React.createElement(icon, {
    className: clsx('h-[24px] w-[24px] text-slate-500', {
      'cursor-pointer': onClick,
    }),
    onClick,
  });
}

export default InputIcon;
