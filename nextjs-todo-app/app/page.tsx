import { deleteTodo, fetchTodos } from "@/lib/todos";
import InputForm from "./components/InputForm";
import TodosContainer from "./components/TodosContainer";
import { getTodos } from "@/actions/todo";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default async function Home() {
  const todos: Todo[] = await getTodos();

  return (
    <div className="p-5">
      <InputForm />
      <TodosContainer todos={todos} />
    </div>
  );
}
