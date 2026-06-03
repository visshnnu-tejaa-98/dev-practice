import { useState } from "react";
import { ManualForm } from "./ManualForm";
import { HookForm } from "./HookForm";

export const FormExample = () => {
  const [tab, setTab] = useState(true);

  return (
    <div>
      <button onClick={() => setTab((prev) => !prev)}>
        {tab ? "Go to Hook Form" : "Go to Manual Form"}
      </button>
      {tab ?
        <ManualForm />
      : <HookForm />}
    </div>
  );
};
