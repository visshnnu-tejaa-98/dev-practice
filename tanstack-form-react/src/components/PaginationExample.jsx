import { useState } from "react";
import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";

async function fetchPosts(page) {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`;
  const res = await fetch(url);
  return res.json();
}

async function fetchInfinitePosts({ pageParam = 1 }) {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=5`;
  const res = await fetch(url);
  return res.json();
}

function PaginationAndInfiniteQueriesExample() {
  return (
    <div>
      <h2>Pagination and Infinite Queries</h2>
      <p>
        Pagination is great when we want users to move page by page, while
        infinite queries are useful for load more buttons and infinitescroll
      </p>
      {/* Add component here */}
      {/* <PaginationExample /> */}
      <InfiniteQueryExample />
    </div>
  );
}

function PaginationExample() {
  const [page, setPage] = useState(1);

  const {
    data: posts,
    isLoading,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData, // ! To kepp previous data
    staleTime: 60 * 1000, // 60 sec
  });

  return (
    <div className="card">
      <h3>Pagination Example</h3>
      <p>
        This uses a normal query, but the page number is part of the query key
      </p>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1));
          }}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
      </div>
      <p>Current Page: {page}</p>

      {isLoading && <p>Loading....</p>}
      {isFetching && <p>Fetching....</p>}
      {isPlaceholderData && (
        <p>Showing previous page while loading new one...</p>
      )}

      {posts &&
        posts.map((post) => (
          <div key={post.id} className="card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
}

function InfiniteQueryExample() {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: fetchInfinitePosts,
    initialPageParam: 1,
    getNextPageParam: (lastpage, allpages) => {
      if (lastpage.length < 5) return undefined;
      return allpages.length + 1;
    },
  });
  return (
    <div className="card">
      <h3>Infinite Query Example</h3>
      <p>
        This load one page at a time and appends the new results to the bottom
      </p>

      {isLoading && <p>Loading...</p>}
      {isFetching && !isFetchingNextPage && <p>Background Fetching...</p>}

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((post) => (
            <div key={post.id} className="card">
              <p>
                {post.id} - {post.title}
              </p>
              <p>{post.body}</p>
              <hr />
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading more..." : "Load more"}
      </button>

      {!hasNextPage && <p>No more posts to load</p>}
    </div>
  );
}

export default PaginationAndInfiniteQueriesExample;
