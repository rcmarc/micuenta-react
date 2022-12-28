function HelpListItem({ children }) {
  return (
    <li>
      <p className="text-sm text-slate-500">* {children}</p>
    </li>
  );
}

export default HelpListItem;
