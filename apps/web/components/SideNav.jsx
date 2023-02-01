import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import {
  MdAccountCircle,
  MdHomeFilled,
  MdInfo,
  MdSecurity,
} from 'react-icons/md';

function SideNav({ className }) {
  const router = useRouter();
  return (
    <nav className={className}>
      <ul className="scrollbar-hidden flex justify-between overflow-x-auto  md:flex-col md:overflow-hidden">
        {LINKS.map((link) => setSelected(link, router.pathname)).map(
          (link, index) => (
            <SideNavLi key={index} selected={link.selected}>
              <SideNavLink link={link} />
            </SideNavLi>
          )
        )}
      </ul>
    </nav>
  );
}

function setSelected(link, pathName) {
  let selected = false;
  if (link.href === pathName) {
    selected = true;
  } else if (pathName.startsWith(link.href) && link.href !== '/') {
    selected = true;
  }
  return Object.assign({}, link, { selected });
}

function SideNavLi({ selected, children }) {
  return (
    <li
      className={clsx('mx-5 sm:mx-auto md:mx-0 md:rounded-r-full', {
        'rounded-[10%] border-b-2 border-sky-500 md:border-none md:bg-cyan-200':
          selected,
        'md:hover:bg-slate-200': !selected,
      })}
    >
      {children}
    </li>
  );
}

function SideNavLink({ link }) {
  return (
    <Link href={link.href}>
      <div className="flex py-3 px-0 sm:px-3 md:px-8">
        {React.createElement(link.icon, {
          className: `text-2xl ${
            link.selected ? 'text-sky-500' : 'text-slate-500'
          } mr-3 hidden sm:block`,
        })}
        <p
          className={clsx('whitespace-nowrap font-medium tracking-wide', {
            'text-sky-500 md:text-slate-600': link.selected,
            'text-slate-600': !link.selected,
          })}
        >
          {link.text}
        </p>
      </div>
    </Link>
  );
}

const LINKS = [
  {
    text: 'Inicio',
    href: '/',
    icon: MdHomeFilled,
  },
  {
    text: 'Perfil',
    href: '/profile',
    icon: MdAccountCircle,
  },
  {
    text: 'Seguridad',
    href: '/security',
    icon: MdSecurity,
  },
  {
    text: 'Acerca de',
    href: '/about',
    icon: MdInfo,
  },
];

export default SideNav;
