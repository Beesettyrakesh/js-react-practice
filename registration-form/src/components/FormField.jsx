const FormField = ({ name, label, type, value, checked, onChange, errors }) => {
  return (
    <div>
      <label>
        {label}:
        <input
          name={name}
          type={type}
          onChange={onChange}
          {...(type === "checkbox" ? { checked } : { value })}
        />
      </label>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
    </div>
  );
};

export default FormField;
