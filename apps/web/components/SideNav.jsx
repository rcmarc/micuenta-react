import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  MdAccountCircle,
  MdHomeFilled,
  MdInfo,
  MdSecurity,
} from 'react-icons/md';

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

const setSelected = (link, pathName) => {
  return Object.assign({}, link, { selected: link.href === pathName });
};

const SideNavLi = ({ key, selected, children }) => (
  <li
    key={key}
    className={`${
      selected
        ? 'border-primary-500 md:bg-primary-100 rounded-[10%] border-b-2 md:border-none'
        : 'md:hover:bg-slate-200'
    }  mx-5 sm:mx-auto md:mx-0 md:rounded-r-full`}
  >
    {children}
  </li>
);

const SideNavLink = ({ link }) => (
  <Link href={link.href}>
    <div className="flex py-3 px-0 sm:px-3 md:px-8">
      {React.createElement(link.icon, {
        className: `text-2xl ${
          link.selected ? 'text-primary-700' : 'text-foreground-light'
        } mr-3 hidden sm:block`,
      })}
      <p
        className={`whitespace-nowrap font-medium tracking-wide ${
          link.selected
            ? 'text-primary-600 md:text-slate-600'
            : 'text-slate-600'
        }`}
      >
        {link.text}
      </p>
    </div>
  </Link>
);

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

export default SideNav;
