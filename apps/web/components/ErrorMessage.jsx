function ErrorMessage({ children, className }) {
  return <p className={`text-pink-600 ${className}`}>{children}</p>;
}

export default ErrorMessage;
