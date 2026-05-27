import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

async function fetchData() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  const data = await res.json();
  return data;
}

const QueryExample = () => {
  const {
    data: posts,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      <h2>1. Intro and setup</h2>
      <p>This is our first query without tanstack query</p>
      {posts &&
        posts.map((post) => (
          <div>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default QueryExample;
