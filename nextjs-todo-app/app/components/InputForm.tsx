"use client";
import { addTodo } from "@/lib/todos";
import { useState } from "react";

const InputForm = () => {
  const [todo, setTodo] = useState("");
  const createTodo = async () => {
    console.log(todo);
    const { id } = await addTodo(todo);
    console.log(id);
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
