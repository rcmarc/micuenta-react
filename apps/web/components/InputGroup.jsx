function InputGroup({ groupName, children }) {
  return (
    <div className={`flex flex-col [&>div]:mb-7`}>
      <p className="text-input-fg m-1 font-semibold tracking-wide">
        {groupName}:
      </p>
      {children}
    </div>
  );
}

export default InputGroup;
