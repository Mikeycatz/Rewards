const Button = ({
  text,
  onClick,
  additionalClasses,
  type,
  background,
  children,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-${background} ${additionalClasses} text-white rounded-full flex gap-2 font-semibold w-fit h-fit`}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};
Button.defaultProps = {
  additionalClasses: "p-2",
  background: "secondary",
  onClick: () => {
    alert("this button has no function assigned");
  },
};

export default Button;
