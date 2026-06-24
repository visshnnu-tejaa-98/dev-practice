import { fetchTodos } from "@/lib/todos";

export default async function Home() {
  const todos = await fetchTodos();
  console.log({ todos });
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
