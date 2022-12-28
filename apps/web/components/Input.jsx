import React from 'react';
import ErrorMessage from './ErrorMessage';
import HelpList from './HelpList';
import HelpListItem from './HelpListItem';

const Input = ({ className, error, messages, ...props }, ref) => (
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
    {messages && (
      <div className="mt-4">
        <HelpList>
          {messages.map((msg, index) => (
            <HelpListItem key={index}>{msg}</HelpListItem>
          ))}
        </HelpList>
      </div>
    )}
  </>
);

export default React.forwardRef(Input);
