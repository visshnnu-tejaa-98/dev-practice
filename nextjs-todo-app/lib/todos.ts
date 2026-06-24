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
