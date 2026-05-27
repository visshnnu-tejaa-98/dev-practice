import React, { useState } from "react";

async function createPost(newPost) {
  const url = "";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

const MutationExample = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <div>
      <h2>2. Mutations</h2>
      <p>Mutations are used to create, update or delete data</p>

      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        name="body"
        id="body"
        placeholder="Post Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <br />
      <br />

      <button>Create Post</button>
    </div>
  );
};

export default MutationExample;
