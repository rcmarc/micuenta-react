function InputIcon(props) {
  return (
    <props.icon
      className={`h-[24px] w-[24px] text-slate-500 ${props.className}`}
      onClick={props.onClick}
    />
  );
}

export default InputIcon;
