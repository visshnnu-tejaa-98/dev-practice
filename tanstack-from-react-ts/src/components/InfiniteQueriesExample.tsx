import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const items = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

type Item = (typeof items)[0];

const LIMIT = 10;

function fetchItems({ pageParam }: { pageParam: number }): Promise<{
  data: Item[];
  currentPage: number;
  nextPage: number | null;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: items.slice(pageParam, pageParam + LIMIT),
        currentPage: pageParam,
        nextPage: pageParam + LIMIT < items.length ? pageParam + LIMIT : null,
      });
    }, 1000);
  });
}

const InfiniteQueriesExample = () => {
  const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: fetchItems,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col gap-2">
      {data?.pages.map((page, id) => {
        return (
          <div key={id} className="flex flex-col gap-2">
            {page.data.map((item) => (
              <div key={item.id} className="p-4 bg-red">
                {item.name}
              </div>
            ))}
          </div>
        );
      })}
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};

export default InfiniteQueriesExample;
