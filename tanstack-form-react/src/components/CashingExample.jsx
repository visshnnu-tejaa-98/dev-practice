import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PostList = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );
      return res.json();
    },
    staleTime: 5 * 1000, // millisectons 5000 for 5 sec
    gcTime: 5 * 1000, // how long unused query data should stay in memory
    refetchOnWindowFocus: true, // ! It refetches when we change tabs and come back to the same tab - Make sure staleTime: 0 to see the difference, here state time have more precidence
    refetchOnReconnect: true, // When internet disconnect and connects again, we want to refetch the data
    // refetchInterval: 3 * 1000, // it refetchs again and again to get data up to date like stock market applications
  });
  return (
    <div>
      {isLoading && <p>Loading....</p>}
      {isFetching && <p>Background Fetchong...</p>}
      {data &&
        data.map((post) => (
          <div key={post.id}>
            <p>
              {post.id} - {post.title}
            </p>
          </div>
        ))}
    </div>
  );
};

const Cashing = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="section">
      <h2>3. Cashing</h2>
      <p>
        Toggle this component off and on to show Tanstack query keeps data in
        cache
      </p>
      {/* Toggle this button to show and hide the Post list component */}
      {/* You will be seeing an API Call in inspect tab fro every time you show the component */}
      <button onClick={() => setShow(!show)}>
        {show ? "Unmount Component" : "Mount Component"}
      </button>
      {show && <PostList />}
    </div>
  );
};

export default Cashing;
