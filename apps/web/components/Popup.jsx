import clsx from 'clsx';

import { ERROR_POPUP, SUCCESS_POPUP } from '../hooks/popup';

function Popup({ show, onClose, message }) {
  return (
    <div
      className={clsx('fixed z-10 w-screen transition-[bottom] duration-300', {
        'bottom-14': show,
        '-bottom-[20%]': !show,
      })}
    >
      <div
        className={clsx(
          'mx-auto flex max-w-max rounded-3xl p-3 text-white shadow-xl',
          {
            'border-pink-400 bg-pink-400': message.type === ERROR_POPUP,
            'border-green-500 bg-green-500': message.type === SUCCESS_POPUP,
          }
        )}
      >
        {message.text}
        <button
          onClick={onClose}
          className={clsx(
            'ml-2 rounded-full px-2 font-semibold transition-[color_background-color] hover:bg-white',
            {
              'hover:text-pink-400': message.type === ERROR_POPUP,
              'hover:text-green-500': message.type === SUCCESS_POPUP,
            }
          )}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Popup;
