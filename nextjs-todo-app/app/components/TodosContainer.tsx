"use client";
import { useRouter } from "next/navigation";
import { Todo } from "../page";
import { completeTodo, deleteTodo } from "@/lib/todos";
import { completeTodoById, deleteTodoById } from "@/actions/todo";

const TodosContainer = ({ todos }: { todos: Todo[] }) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    await deleteTodoById(id);
    router.refresh();
  };

  const handleBuildComplete = async (id: string) => {
    await completeTodoById(id);
    router.refresh();
  };
  return (
    <div>
      {todos.map((todo: Todo) => (
        <div key={todo.id}>
          <span
            className={todo.completed ? "line-through" : ""}
            onClick={() => handleBuildComplete(todo.id)}
          >
            {todo.title}
          </span>

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
