import React from 'react';
import ErrorMessage from './ErrorMessage';

const Input = ({ className, error, ...props }, ref) => (
  <>
    <input
      {...props}
      ref={ref}
      className={`bg-input-bg text-input-fg w-full rounded-lg
        border-[2px] px-3 py-2 font-medium leading-relaxed
        shadow-sm outline-none ${error && 'border-error-500'}
        ${error ? 'focus:border-error-500' : 'focus:border-slate-500'}
     ${className}`}
    />
    {error ? (
      <ErrorMessage className="absolute">{error.message}</ErrorMessage>
    ) : null}
  </>
);

export default React.forwardRef(Input);
