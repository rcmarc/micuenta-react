function FullScreenGradient({ children }) {
  return (
    <div className="micuenta-gradient h-screen w-screen overflow-hidden">
      {children}
    </div>
  );
}

export default FullScreenGradient;
