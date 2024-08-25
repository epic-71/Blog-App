function Button({ children, onHandleSubmit, className, ...rest }) {
  return (
    <button
      className={`bg-blue-600 text-white  rounded-full font-bold p-2  px-8 ${className}`}
      onClick={onHandleSubmit}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
