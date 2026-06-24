"use client";
import { addTodo } from "@/lib/todos";
import { useRouter } from "next/navigation";
import { useState } from "react";

const InputForm = () => {
  const [todo, setTodo] = useState("");
  const router = useRouter();
  const createTodo = async () => {
    const { id } = await addTodo(todo);
    router.refresh();
  };
  return (
    <div>
      <input
        className="border-2 border-[#212121] p-1"
        type="text"
        placeholder="Your Todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="bg-[#212121] p-1 ml-2" onClick={createTodo}>
        Submit
      </button>
    </div>
  );
};

export default InputForm;
