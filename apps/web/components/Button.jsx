function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`self-end rounded-lg border-2 border-transparent bg-sky-400 py-2 px-3 shadow-sm outline-none transition-[border-color_background-color_color] hover:border-blue-600 hover:bg-sky-500 hover:shadow-xl active:bg-sky-400 active:shadow-sm  ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
