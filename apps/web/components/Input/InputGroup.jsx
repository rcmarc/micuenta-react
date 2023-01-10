function InputGroup({ groupName, children }) {
  return (
    <>
      {groupName && (
        <p className="mb-3 font-semibold tracking-wide text-slate-600">
          {groupName}:
        </p>
      )}
      <div className={`flex flex-col gap-10`}>{children}</div>
    </>
  );
}

export default InputGroup;
