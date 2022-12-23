import { useSession } from 'next-auth/react';

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

const AvatarContainer = ({ children, className, size }) => (
  <div className={sizes[size || 'md'].pdiv}>
    <div
      className={`${
        sizes[size || 'md'].hw + ' ' + className
      } flex items-center justify-center rounded-full bg-teal-500 font-semibold tracking-widest`}
    >
      {children}
    </div>
  </div>
);

const AvatarInitials = ({ children, size }) => (
  <p className={`${sizes[size || 'md'].text} text-white`}>{children}</p>
);

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
      <AvatarContainer size={size} className={className}>
        <AvatarInitials size={size}>{initials}</AvatarInitials>
      </AvatarContainer>
    );
  }
}

export default Avatar;
