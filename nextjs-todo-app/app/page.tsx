import { deleteTodo, fetchTodos } from "@/lib/todos";
import InputForm from "./components/InputForm";
import TodosContainer from "./components/TodosContainer";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <div className="p-5">
      <InputForm />
      <TodosContainer todos={todos} />
    </div>
  );
}
