import clsx from 'clsx';
import { MdError } from 'react-icons/md';

function InputErrorMessage({ error }) {
  return (
    <div
      className={clsx(
        'absolute left-4 -bottom-6 flex gap-1 opacity-0 transition-opacity duration-75',
        { 'opacity-100': error }
      )}
    >
      <MdError className="mt-[3px] text-pink-600" />
      <p className="text-sm text-pink-600">{error && error.message}</p>
    </div>
  );
}

export default InputErrorMessage;
