import { fetchTodos } from "@/lib/todos";
import InputForm from "./components/InputForm";

export default async function Home() {
  const todos = await fetchTodos();
  console.log({ todos });
  return (
    <div className="p-5">
      <InputForm />
      <h1>Hello</h1>
    </div>
  );
}
