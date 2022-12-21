import { useState } from 'react';

import Avatar from './Avatar';
import Logo from './Logo';
import LogoText from './LogoText';
import LogoutPopover from './LogoutPopover';

function TopBar() {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <div className="xs:px-10 flex justify-between bg-slate-200 px-3 py-1">
      <div className="flex">
        <div className="py-2">
          <Logo size={50} />
        </div>
        <div className="xs:flex hidden py-4">
          <div className="pt-1">
            <p className="px-2 text-lg italic text-slate-500">MiCuenta</p>
          </div>
          <div>
            <LogoText size={'2xl'} />
          </div>
        </div>
      </div>
      <div className="relative mt-2">
        <div
          className="rounded-full"
          onClick={() => setShowPopover((show) => !show)}
        >
          <Avatar className="cursor-pointer border-2 border-transparent hover:border-sky-700 hover:shadow-md hover:shadow-sky-300" />
        </div>
        {showPopover && (
          <div className="absolute top-[.5em] right-[1.5em] mt-5">
            <LogoutPopover />
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
