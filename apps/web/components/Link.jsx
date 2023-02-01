import Link from 'next/link';

function AppLink({ children, ...props }) {
  return (
    <Link
      {...props}
      className="h-min border-sky-500 text-slate-500 underline-offset-2 hover:border-b-[1px] hover:text-sky-500"
    >
      {children}
    </Link>
  );
}

export default AppLink;
