function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`bg-primary-500 hover:bg-primary-700 active:bg-primary-500 self-end rounded-lg py-2 px-3 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
