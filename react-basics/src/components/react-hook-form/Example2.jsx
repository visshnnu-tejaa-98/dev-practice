import React from "react";
import { useForm } from "react-hook-form";

const Example2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: 4,
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <br />
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <br />
        <input
          type="number"
          placeholder="Age"
          {...register("age", {
            required: "Age is required",
            min: 18,
            max: 60,
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Example2;
