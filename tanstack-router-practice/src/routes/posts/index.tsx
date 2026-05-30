import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: Posts,
});

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchData = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(url);
  if (!response.ok)
    throw new Error("Something went wrong in fetching the data");
  const data = await response.json();
  return data;
};

function Posts() {
  const {
    isLoading,
    isError,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });

  if (isLoading) <p>Loading...</p>;
  if (isError) <p>{error.message}</p>;

  return (
    <div>
      <h1>Posts</h1>
      {posts &&
        posts.map((post: Post) => (
          <p>
            <Link to="/posts/$id" params={{ id: post.id.toString() }}>
              {post.title}
            </Link>
          </p>
        ))}
    </div>
  );
}
