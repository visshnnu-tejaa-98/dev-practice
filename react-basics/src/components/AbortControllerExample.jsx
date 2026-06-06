import React, { useState, useEffect } from "react";

const AbortControllerExample = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getPosts = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        signal,
      );
      const data = await res.json();
      setPosts(data);
    };
    getPosts();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>{posts && posts.map((post) => <p key={post.id}>{post.title}</p>)}</div>
  );
};

export default AbortControllerExample;
