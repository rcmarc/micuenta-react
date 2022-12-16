export default function Form({ onSubmit, children }) {
  return (
    <form className="flex w-full flex-col" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
