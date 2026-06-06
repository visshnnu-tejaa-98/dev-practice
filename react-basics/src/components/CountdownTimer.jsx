import React, { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [count, setCount] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
};

export default CountdownTimer;
