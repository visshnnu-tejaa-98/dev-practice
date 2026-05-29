import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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

const addTodo = async (todo: string) => {
  let url = "https://api.freeapi.app/api/v1/todos/";
  const body = {
    title: todo,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  let response = await fetch(url, options);

  if (!response.ok) throw new Error("Error while creating a new todo");

  const data = await response.json();
  return data;
};

const deletTodo = async (id: string) => {
  const url = `https://api.freeapi.app/api/v1/todos/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(url, options);
  if (!response.ok) throw new Error("Error while creating a new todo");
  const data = await response.json();
  return data;
};

const toggleTodoStatus = async (id: string) => {
  const url = `https://api.freeapi.app/api/v1/todos/toggle/status/${id}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Something went wrong while updating the todo status");
  }

  const data = await response.json();
  return data;
};

const MutationExample = () => {
  const [todo, setTodo] = useState("");
  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    select: processTodos,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: deletTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  const { mutateAsync: toggleStatusTodoMutation } = useMutation({
    mutationFn: toggleTodoStatus,
  });

  const handleAddTodo = async (todo: string) => {
    await addTodoMutation(todo);
    await queryClient.invalidateQueries({ queryKey: ["todos"] });
    setTodo("");
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodoMutation(id);
  };

  const handleToggleTodo = async (id: string) => {
    await toggleStatusTodoMutation(id);
    await queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Your Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={() => handleAddTodo(todo)}>Add</button>
          <br />
          <br />
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {todos &&
          todos?.map((todo) => (
            <div key={todo.id} className="flex justify-center">
              <input
                type="checkbox"
                name="todo"
                checked={todo.isComplete}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span>{todo.title}</span>
              <span
                className="material-symbols-outlined cursor-pointer"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                delete
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MutationExample;
