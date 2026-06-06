import React from "react";

const Child1 = () => {
  return <h1>Child 1</h1>;
};

const Child2 = () => {
  return <h1>Child 2</h1>;
};

const Parent = ({ children }) => {
  return <div>{children}</div>;
};

const ChildrenExample = () => {
  return (
    <div>
      <h1>Navbar</h1>
      <Parent>
        <Child1 />
        <Child2 />
      </Parent>
      <footer>This is footer</footer>
    </div>
  );
};

export default ChildrenExample;
