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
      selected ? 'bg-primary-100' : 'hover:bg-slate-200'
    } rounded-r-full `}
  >
    {children}
  </li>
);

const SideNavLink = ({ link }) => (
  <Link href={link.href}>
    <div className="flex py-3 px-8">
      {React.createElement(link.icon, {
        className: `text-2xl ${
          link.selected ? 'text-primary-700' : 'text-foreground-light'
        } mr-3`,
      })}
      <p className="font-medium tracking-wide text-slate-600">{link.text}</p>
    </div>
  </Link>
);

function SideNav({ className }) {
  const router = useRouter();
  return (
    <nav className={className}>
      <ul>
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
