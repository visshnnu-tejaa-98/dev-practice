import { useForm } from "react-hook-form";
import React from "react";

const Input = ({ label, register, required }) => {
  return (
    <>
      <label>{label}</label>
      <input
        {...register(label, {
          required,
        })}
      />
    </>
  );
};

const Select = React.forwardRef(({ label, onChange, onBlur, name }, ref) => {
  return (
    <>
      <label>{label}</label>
      <select id="" onChange={onChange} onBlur={onBlur} name={name} ref={ref}>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  );
});

export const Example3 = () => {
  const { register, handleSubmit } = useForm();

  const submit = (data) => console.log(data);

  return (
    <>
      <form action="" onSubmit={handleSubmit(submit)}>
        <Input label={"name"} register={register} required />
        <Select label={"Age"} {...register("age")} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
