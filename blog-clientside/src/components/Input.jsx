function Input({
  label,
  type = "text",
  id,
  name,
  value,
  onHandleChange,
  touched,
  error,
  onHandleBlur,
}) {
  return (
    <div className="w-full h-10">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        className="border-2"
        id={id}
        name={name}
        value={value}
        onChange={onHandleChange}
        onBlur={onHandleBlur}
      />
      {error && touched && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}

export default Input;
