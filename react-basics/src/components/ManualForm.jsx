import React, { useState } from "react";

export const ManualForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => {
    return (e) => setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = (val) => {
    const err = {};
    if (!val.name) err.name = "Name is required";
    if (!val.email) err.email = "Email is required";
    return err;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let err = validate(values);
    setErrors(err);
    if (Object.keys(err).length === 0) setSubmitted(true);
  };

  if (submitted) return <h1>Form Submitted successfully</h1>;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={set("name")}
          />
          {errors.name && <span>{errors.name}</span>}
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={set("email")}
          />
          {errors.email && <span>{errors.email}</span>}
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
