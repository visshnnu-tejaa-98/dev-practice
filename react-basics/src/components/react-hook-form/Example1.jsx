import React from "react";
import { useForm } from "react-hook-form";

const Example1 = () => {
  const { register, handleSubmit } = useForm();
  const submit = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("name")} />
        <select {...register("gender")}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Example1;
