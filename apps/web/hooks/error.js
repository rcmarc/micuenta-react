import { useRouter } from 'next/router';

export function useQueryErrorMessage() {
  const { query } = useRouter();
  if (!query.error) {
    return null;
  }

  const error = ERRORS.filter((err) => err.name === query.error.toLowerCase());

  if (error.length > 0) {
    return error[0].message;
  }
  return null;
}

const ERRORS = [
  {
    name: 'credentialssignin',
    message: 'Credenciales incorrectas',
  },
];
