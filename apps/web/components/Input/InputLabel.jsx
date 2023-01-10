import clsx from 'clsx';

function InputLabel({ forId, hasLeftIcon, error, children }) {
  return (
    <label
      htmlFor={forId}
      className={clsx(
        'absolute -top-2 z-10 bg-slate-100 text-xs tracking-tight text-slate-500 transition-[top_font-size_color] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:tracking-tight',
        {
          'left-10': hasLeftIcon,
          'left-0': !hasLeftIcon,
          'peer-focus:text-pink-500': error,
          'peer-focus:text-sky-500': !error,
        }
      )}
    >
      {children}
    </label>
  );
}

export default InputLabel;
