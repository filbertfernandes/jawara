const ControlButton = ({ children, className = "" }) => {
  return (
    <div
      className={`btn btn-square btn-sm bg-gray-800 text-lg text-white lg:btn-md lg:text-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default ControlButton;
