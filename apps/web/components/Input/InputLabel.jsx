import clsx from 'clsx';

function InputLabel({ forId, hasLeftIcon, error, text }) {
  return (
    <label
      htmlFor={forId}
      className={clsx(
        'absolute -top-2 cursor-text rounded-md bg-inherit text-xs tracking-tight text-slate-500 transition-[top_font-size_color] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:tracking-tight',
        {
          'left-10': hasLeftIcon,
          'left-3': !hasLeftIcon,
          'peer-focus:text-pink-500': error,
          'peer-focus:text-sky-500': !error,
        }
      )}
    >
      {text}
    </label>
  );
}

export default InputLabel;
