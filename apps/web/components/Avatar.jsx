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
      <div className="bg-accent-200 h-min rounded-full py-3 px-2 font-semibold tracking-widest">
        <p className="text-xl">{initials}</p>
      </div>
    );
  }
  return <MdAccountCircle className="text-5xl text-slate-500" />;
}

export default Avatar;
