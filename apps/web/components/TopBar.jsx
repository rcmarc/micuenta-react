import Avatar from './Avatar';
import Logo from './Logo';
import LogoText from './LogoText';

function TopBar() {
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
      <div className="mt-2">
        <Avatar />
      </div>
    </div>
  );
}

export default TopBar;
