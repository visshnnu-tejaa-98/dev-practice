import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$id")({
  component: RouteComponent,
  // This is async function that will run before the component is loaded
  // if you throw any error here, then component does not load at all
  // here we can fetch the data which we need to render in the component
  loader: async ({ params }) => {
    const { id } = params;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error("something went wrong in fetching post details");
    const data = await response.json();
    return { data };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error Occured</div>,
});

function RouteComponent() {
  const { data } = useLoaderData({ from: "/posts/$id" });
  return (
    <div>
      <h1>{data.id}</h1>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
}
