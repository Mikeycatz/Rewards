const Message = ({ background, children }) => {
  return (
    <div
      className={`bg-${background} h-fit rounded-md p-4 align-center text-3xl my-4`}
    >
      <div>{children}</div>
    </div>
  );
};

Message.defaultProps = {
  background: "blue",
};

export default Message;
