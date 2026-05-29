import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: string;
  title: string;
  isComplete: boolean;
};

const getTodos = async () => {
  const url = "https://api.freeapi.app/api/v1/todos";
  const res = await fetch(url);

  if (!res.ok) throw new Error("Network response error " + res.status);

  const data = await res.json();
  return data;
};

const processTodos = (apiResponsedata: any): Todo[] => {
  const result = apiResponsedata.data.map((d: any) => {
    return {
      id: d._id,
      title: d.title,
      isComplete: d.isComplete,
    };
  });
  return result;
};

const TodosList = () => {
  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    select: processTodos,
    // staleTime: 5 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <div>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {todos &&
          todos?.map((todo: Todo) => (
            <div key={todo.id} className="flex justify-center">
              <span>{todo.title}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

const Cashing = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Unmount Component" : "Mount Component"}
      </button>
      {show && <TodosList />}
    </div>
  );
};

export default Cashing;
