import clsx from 'clsx';
import { useSession } from 'next-auth/react';

function Avatar({ className, size }) {
  const session = useSession();
  let initials;

  if (session.data) {
    initials = session.data.user.name
      .split(' ')
      .slice(0, 3)
      .map((name) => name[0]);
    if (initials.length > 2) {
      initials = initials.slice(0, 2);
    }
  }

  if (initials) {
    return (
      <div className={sizes[size || 'md'].pdiv}>
        <div
          className={clsx(
            'flex items-center justify-center rounded-full bg-teal-500 font-semibold tracking-widest',
            sizes[size || 'md'].hw,
            className
          )}
        >
          <p className={clsx('text-white', sizes[size || 'md'].text)}>
            {initials}
          </p>
        </div>
      </div>
    );
  }
}

const sizes = {
  sm: {
    text: 'text-sm',
    pdiv: 'p-[0.20rem]',
    hw: 'h-[2.2rem] w-[2.2rem]',
  },
  md: {
    text: 'text-xl',
    pdiv: 'p-1',
    hw: 'h-[3.2rem] w-[3.2rem]',
  },
  lg: {
    text: 'text-2xl',
    pdiv: 'p-[0.4rem]',
    hw: 'h-[4.2rem] w-[4.2rem]',
  },
};

export default Avatar;
