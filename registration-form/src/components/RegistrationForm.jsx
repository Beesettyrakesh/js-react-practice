import { useState } from "react";
import FormField from "./FormField.jsx";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "Developer",
  agreeToTerms: false,
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const isFormIncomplete =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.password ||
    formData.password.length < 8 ||
    !formData.agreeToTerms;

  function handleOnChange(event) {
    const { name, value, type, checked } = event.target;

    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !formData.email.includes("@"))
      newErrors.email = "Email must contain '@'";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "Agree to Terms must be checked";

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSuccessMessage("");

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    console.log(formData);
    setSuccessMessage(
      `Registration successful! Welcome, ${formData.firstName}`,
    );
    setFormData(initialFormData);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {successMessage && <h4>{successMessage}</h4>}

      <FormField
        label="First Name"
        name="firstName"
        type="text"
        onChange={handleOnChange}
        value={formData.firstName}
        errors={errors.firstName}
      />

      <FormField
        label="Last Name"
        name="lastName"
        type="text"
        onChange={handleOnChange}
        value={formData.lastName}
        errors={errors.lastName}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        onChange={handleOnChange}
        value={formData.email}
        errors={errors.email}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        onChange={handleOnChange}
        value={formData.password}
        errors={errors.password}
      />

      <label>
        Role:
        <select name="role" value={formData.role} onChange={handleOnChange}>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </label>

      <FormField
        label="Agree to Terms"
        name="agreeToTerms"
        type="checkbox"
        onChange={handleOnChange}
        checked={formData.agreeToTerms}
        errors={errors.agreeToTerms}
      />

      <button type="submit" disabled={isFormIncomplete}>
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
