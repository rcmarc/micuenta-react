function LogoText({ size }) {
  return (
    <p
      className={`micuenta-gradient bg-clip-text text-${
        size || '2xl'
      } font-medium text-transparent`}
    >
      UCF
    </p>
  );
}

export default LogoText;
