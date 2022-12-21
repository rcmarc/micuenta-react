import React from 'react';
import ErrorMessage from './ErrorMessage';

const Input = ({ className, error, ...props }, ref) => (
  <>
    <input
      {...props}
      ref={ref}
      className={`w-full rounded-lg border-[2px] bg-slate-200
        px-3 py-2 font-medium leading-relaxed text-slate-500
        shadow-sm outline-none ${error && 'border-pink-500'}
        ${error ? 'focus:border-pink-500' : 'focus:border-slate-500'}
     ${className}`}
    />
    {error ? (
      <ErrorMessage className="absolute">{error.message}</ErrorMessage>
    ) : null}
  </>
);

export default React.forwardRef(Input);
