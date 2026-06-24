"use client";
import { useRouter } from "next/navigation";
import { Todo } from "../page";
import { deleteTodo } from "@/lib/todos";

const TodosContainer = ({ todos }: { todos: Todo[] }) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const data = await deleteTodo(id);
    console.log({ data });
    router.refresh();
  };
  return (
    <div>
      {todos.map((todo: Todo) => (
        <div key={todo.id}>
          <span className="">{todo.title}</span>
          <button
            className="bg-red-600 p-1 rounded ml-3 mb-2"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodosContainer;
