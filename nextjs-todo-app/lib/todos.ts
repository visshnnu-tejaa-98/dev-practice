const BASE_URL = "http://localhost:3000";

export const fetchTodos = async () => {
  const url = `${BASE_URL}/api/todos`;
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.success ? json.data : [];
};

export const addTodo = async (title: string) => {
  const url = `${BASE_URL}/api/todos`;
  const headers = {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify({ title }),
  };

  const res = await fetch(url, headers);
  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.success ? json.data : [];
};
