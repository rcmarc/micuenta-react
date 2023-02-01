import clsx from 'clsx';

function Button({ size, variant, children, ...props }) {
  return (
    <button
      className={clsx(
        'max-w-fit rounded-lg border-2 border-transparent shadow-sm outline-none  transition-[border-color_background-color_color]  hover:shadow-xl active:shadow-sm',
        {
          'p-1': size === 'sm',
          'p-2': !size || size === 'md',
          'p-4': size === 'lg',
          'bg-sky-400 hover:border-blue-600 hover:bg-sky-500 active:bg-sky-400':
            variant === 'primary',
          'bg-green-400 hover:border-green-600 hover:bg-green-500 active:bg-green-400':
            variant === 'success',
          'bg-cyan-400 hover:border-sky-600 hover:bg-cyan-500 active:bg-cyan-400':
            !variant || variant === 'accent',
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
