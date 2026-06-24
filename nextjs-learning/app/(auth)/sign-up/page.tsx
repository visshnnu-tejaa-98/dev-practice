import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1>SignUp Page</h1>
      <Link href={"/login"}>Login</Link>
    </div>
  );
};

export default page;
