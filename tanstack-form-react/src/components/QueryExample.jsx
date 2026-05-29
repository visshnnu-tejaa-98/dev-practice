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
  const [isLoadPosts, setLoadPosts] = useState(false);
  const {
    data: posts,
    error,
    isLoading,
    isError, // if any error is present
    isEnabled, // is Lazy loading of the data to any button is enabled or not
    isSuccess, // if the query was success
    isStale, // if the query went to stale
    status, // ! Also you will get all these info in a single variable called status
    refetch, // !used to refecth the data when the query went to stale or you want to fore fetch the data when you need.
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    enabled: isLoadPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <h2>1. Intro and setup</h2>
      <p>This is our first query without tanstack query</p>
      <button onClick={() => setLoadPosts(true)}>Load Posts</button>
      {/*You can check in inspect tab for refetch */}
      <button onClick={refetch}>Refetch</button>
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
