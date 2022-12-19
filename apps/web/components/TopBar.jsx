import Logo from './Logo';
import LogoText from './LogoText';

function TopBar() {
  return (
    <div className="flex bg-slate-200 px-10">
      <div className="py-2">
        <Logo size={50} />
      </div>
      <div className="flex py-4">
        <div className="pt-1">
          <p className="text-foreground-light px-2 text-lg italic">MiCuenta</p>
        </div>
        <div>
          <LogoText size={'2xl'} />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
