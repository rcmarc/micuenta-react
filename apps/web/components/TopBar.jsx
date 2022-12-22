import { useEffect, useRef, useState } from 'react';

import Avatar from './Avatar';
import Logo from './Logo';
import LogoText from './LogoText';
import LogoutPopover from './LogoutPopover';

function TopBar() {
  const [showPopover, setShowPopover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const avatarRef = useRef(null);

  const onBlur = () => {
    if (!clicked) {
      setShowPopover(false);
    }
    setClicked(false);
  };

  const onClick = () => {
    setShowPopover((show) => !show);
  };

  const onMouseDown = () => {
    avatarRef.current.focus();
    setClicked(true);
  };

  useEffect(() => {
    if (showPopover && avatarRef.current) {
      avatarRef.current.focus();
    }
  }, [showPopover, clicked]);

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
          onClick={onClick}
          onBlur={onBlur}
          ref={avatarRef}
          tabIndex={-1}
        >
          <Avatar
            className={`${
              showPopover && 'border-sky-700'
            } cursor-pointer border-2 border-transparent hover:border-sky-700 hover:shadow-md hover:shadow-sky-300`}
          />
        </div>
        {showPopover && (
          <div
            onMouseDown={onMouseDown}
            className="absolute top-[5em] right-[1.5em] outline-none"
          >
            <LogoutPopover />
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
