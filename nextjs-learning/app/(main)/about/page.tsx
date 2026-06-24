import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <h1>About Page</h1>
      <Image src="/img.png" alt="image" width={500} height={500} />
      <Image
        src="https://chaicode.com/assets/white-1-CYshgcRl.webp"
        alt="image"
        width={500}
        height={500}
      />
    </div>
  );
};

export default page;
