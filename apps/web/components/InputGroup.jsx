function InputGroup({ groupName, children }) {
  return (
    <div className={`flex flex-col [&>div]:mb-7`}>
      <p className="m-1 font-semibold tracking-wide text-slate-600">
        {groupName}:
      </p>
      {children}
    </div>
  );
}

export default InputGroup;
