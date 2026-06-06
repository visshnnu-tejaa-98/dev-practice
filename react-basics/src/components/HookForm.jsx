import { useForm } from "react-hook-form";
import Example1 from "./react-hook-form/Example1";
import Example2 from "./react-hook-form/Example2";
import { Example3 } from "./react-hook-form/Example3";
export const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({});

  const submit = (data) => {
    console.log(data);
  };
  return (
    <div>
      {/* <Example1 /> */}
      {/* <Example2 /> */}
      <Example3 />
      {/* <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="">
          Name:
          <input
            type="name"
            {...register("name", { required: "Name is required" })}
          />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
        <br />
        <br />
        <label htmlFor="">
          Email:
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
        </label>
        {errors.email && <p>{errors.email.message}</p>}

        <br />
        <br />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};
