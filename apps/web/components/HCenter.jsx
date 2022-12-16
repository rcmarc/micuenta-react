function HCenter(props) {
  return (
    <div className={`flex justify-center ${props.className}`}>
      {props.children}
    </div>
  );
}

export default HCenter;
