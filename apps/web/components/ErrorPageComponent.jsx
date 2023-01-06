import Link from 'next/link';
import { MdError } from 'react-icons/md';

import Logo from './Logo';
import Button from './Button';
import HCenter from './HCenter';

const ERRORS = [
  {
    code: 404,
    message:
      'Lo sentimos, la página que usted intenta acceder no se encuentra en el servidor',
  },
  {
    code: 500,
    message: 'Error interno en el servidor.',
  },
];

function ErrorPageComponent({ code }) {
  const error = ERRORS.find((err) => err.code === code);
  return (
    <>
      <HCenter className="pt-12">
        <div className="flex flex-row">
          <div className="relative mr-4">
            <Logo size="100" />
            <div className="absolute bottom-0 right-0">
              <MdError color="red" size="24px" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2 flex">
              <p className="mr-3 text-2xl">Error</p>
              <p className="text-2xl font-medium">{error.code}</p>
            </div>
            <p>{error.message}</p>
          </div>
        </div>
        <div className="m-5 self-end"></div>
      </HCenter>
      <HCenter className="mt-10">
        <Link href="/">
          <Button className="p-2">Volver al Inicio</Button>
        </Link>
      </HCenter>
    </>
  );
}

export default ErrorPageComponent;
