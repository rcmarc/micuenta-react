function ErrorMessage({ children, className }) {
  return <p className={`text-error-500 ${className}`}>{children}</p>;
}

export default ErrorMessage;
