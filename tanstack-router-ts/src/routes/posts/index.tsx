import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: Posts,
});

function Posts() {
  const posts = ["post1", "post2", "psot3"];
  return (
    <div>
      {posts.map((post) => (
        <div>
          <Link to={"/posts/$postId"} params={{ postId: post }}>
            {post}
          </Link>
        </div>
      ))}
    </div>
  );
}
