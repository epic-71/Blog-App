import { ErrorMessage, Field } from "formik";

function InputForm({ label, name, ...rest }) {
  return (
    <div className="flex gap-4">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} className="border-2" />
      <p>
        <ErrorMessage name={name} />
      </p>
    </div>
  );
}

export default InputForm;
