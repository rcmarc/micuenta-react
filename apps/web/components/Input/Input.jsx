import React from 'react';

import clsx from 'clsx';

import HelpList from '../HelpList';
import HelpListItem from '../HelpListItem';

function Input({ error, hasLeftIcon, messages, ...props }, ref) {
  return (
    <>
      <input
        {...props}
        ref={ref}
        className={clsx(
          'peer w-full rounded-lg border-[1px] border-slate-500 bg-inherit px-3 py-3 font-medium leading-relaxed text-slate-500 outline-none',
          { 'border-pink-500 focus:border-pink-500': error },
          { 'focus:border-sky-600': !error },
          { 'pl-10': hasLeftIcon },
          { 'tracking-widest': props.type && props.type === 'password' }
        )}
      />
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
}

export default React.forwardRef(Input);
