import { useEffect, useState } from "react";

const QueryExample = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );
      const data = await res.json();
      setPosts(data);
    }
    fetchData();
  });
  return (
    <div>
      <h2>1. Intro and setup</h2>
      <p>This is our first query without tanstack query</p>
      {posts.map((post) => (
        <div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default QueryExample;
