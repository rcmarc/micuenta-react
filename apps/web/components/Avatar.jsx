import { MdAccountCircle } from 'react-icons/md';
import { useSession } from 'next-auth/react';

function Avatar() {
  const session = useSession();
  let initials;

  if (session.data) {
    initials = session.data.user.name.split(' ')[1];
    if (initials.length > 2) {
      initials = initials.slice(0, 2);
    }
  }

  if (initials) {
    return (
      <div className="h-min rounded-full bg-teal-500 py-3 px-2 font-semibold tracking-widest">
        <p className="text-xl text-white">{initials}</p>
      </div>
    );
  }
  return <MdAccountCircle className="text-5xl text-slate-500" />;
}

export default Avatar;
