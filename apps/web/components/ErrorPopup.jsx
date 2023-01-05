function ErrorPopup({ show, onClose, message }) {
  const location = show ? 'bottom-10' : 'bottom-[-20%]';
  return (
    <div className={`fixed z-10 ${location} w-screen transition-[bottom]`}>
      <div
        className={`mx-auto flex max-w-max rounded-3xl border-pink-400 bg-pink-400 p-3 text-white`}
      >
        {message}
        <button
          onClick={onClose}
          className="ml-2 rounded-full px-2 font-semibold transition-[color_background-color] hover:bg-white hover:text-pink-400"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
