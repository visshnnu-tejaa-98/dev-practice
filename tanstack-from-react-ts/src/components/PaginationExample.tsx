import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Type of Response data after processing
type Data = {
  id: number;
  name: string;
  age: number;
  location: string;
};

// Function to get users from api
const getUsers = async (page: number = 1) => {
  const url = `https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=10`;
  const res = await fetch(url);

  //   This check need to mandatory because tanstack does not check status codes like 404, 501, it throws an error only api call fails
  //    In order to capture error the below check is required
  if (!res.ok) {
    throw new Error(`Network response error: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

// Function to process the data from API - filtering the exact fields from API response
const processData = (responseData: any): Data[] => {
  const res = responseData.data.data.map((d: any) => {
    return {
      id: d.id,
      name: `${d.name.title}. ${d.name.first} ${d.name.last}`,
      age: d.dob?.age,
      location: `${d.location?.city}, ${d.location?.country}`,
    };
  });
  return res;
};

const PaginationExample = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["users", page], // page number is also a part of queryKey
    queryFn: () => getUsers(page),
    select: processData,
    placeholderData: keepPreviousData, // to keep previous data untill we get the new data
    staleTime: 5000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      {/* Because in processData function, it is already validated, now no need to have data check again */}
      {data?.map((d) => (
        <div key={d.id}>
          {d.id} - {d.name}
        </div>
      ))}
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        Prev
      </button>

      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default PaginationExample;
