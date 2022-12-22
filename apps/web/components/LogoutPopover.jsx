import { signOut, useSession } from 'next-auth/react';

import Avatar from './Avatar';
import Button from './Button';

function LogoutPopover() {
  const session = useSession();
  const user = session.data?.user;

  const onClick = () => {
    signOut();
  };

  return (
    <>
      <div className="flex flex-col items-center rounded-lg border-[1px] border-slate-200 p-4 shadow-md">
        {user ? (
          <>
            <Avatar />
            <p className="mt-1 w-max text-sm font-medium text-slate-400">
              {user.email}
            </p>
            <Button onClick={onClick} className={'mt-4 px-2 py-1'}>
              Cerrar Sessión
            </Button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default LogoutPopover;
