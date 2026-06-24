import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <Link
        href={{
          pathname: "/sign-up",
          query: {
            email: "test@gmail.com",
            name: "test user",
          },
        }}
      >
        Signup
      </Link>
    </div>
  );
};

export default page;
