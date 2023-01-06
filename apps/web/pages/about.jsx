import React from 'react';

import { TbLicense } from 'react-icons/tb';
import { AiFillGithub } from 'react-icons/ai';

import Logo from '../components/Logo';
import LogoText from '../components/LogoText';
import MainLayout from '../layouts/MainLayout';
function About({ appVersion }) {
  return (
    <AboutContainer>
      <Logo size={70} />
      <AppText />
      <AppVersion version={appVersion} />
      <AppDescription />
      <AppLinks />
    </AboutContainer>
  );
}

function AboutContainer({ children }) {
  return (
    <div className="mx-auto mt-5 flex h-min w-11/12 flex-col items-center sm:w-10/12 md:w-7/12">
      {children}
    </div>
  );
}

function AppText() {
  return (
    <div className="flex">
      <p className="mr-1 pt-1 text-lg  text-slate-500">MiCuenta</p>
      <LogoText />
    </div>
  );
}

function AppDescription() {
  return (
    <div className="xs:px-8 mt-5 rounded-lg bg-gray-200 px-2 py-5">
      <p className="text-slate-600">
        <i>
          MiCuenta es un sitio web para la administración de las cuentas de
          usuario de la Universidad de Cienfuegos, el cual tiene como fuente
          primaria de datos al Directorio Activo de la entidad.
        </i>
      </p>
    </div>
  );
}

function Link({ href, text, icon }) {
  return (
    <a
      href={href}
      className=" flex rounded-lg border-2 border-transparent p-1 transition-[background-color_border-color] hover:border-cyan-400 hover:bg-slate-200"
      target="_blank"
      rel="noreferrer"
    >
      {React.createElement(icon, {
        className: 'mr-[2px] inline text-lg',
      })}
      <p className="text-xs font-semibold">{text}</p>
    </a>
  );
}

function GitHub() {
  return (
    <Link
      href="https://github.com/ucfgos/micuenta"
      text="GitHub"
      icon={AiFillGithub}
    />
  );
}

function License() {
  return (
    <Link
      href="https://github.com/ucfgos/micuenta/blob/master/LICENSE"
      text="Licencia"
      icon={TbLicense}
    />
  );
}

function AppLinks() {
  return (
    <div className="mt-2 flex w-full flex-col md:w-10/12 lg:w-9/12">
      <Divider />
      <div className="box-content flex justify-between lg:px-10">
        <div className="flex">
          <p className="xs:inline hidden">Se aceptan sugerencias en </p>
          <GitHub />
        </div>
        <License />
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="border-t-1 my-3 w-full border-slate-500" />;
}

function AppVersion({ version }) {
  return (
    <p className="text-xs text-slate-600">
      <i>version </i>
      {version}
    </p>
  );
}

About.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default About;

export const getStaticProps = () => ({
  props: {
    appVersion: process.env.npm_package_version,
  },
});
