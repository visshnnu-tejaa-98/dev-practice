import { useQuery } from "@tanstack/react-query";

// Type of Response data after processing
type Data = {
  id: number;
  name: string;
  age: number;
  location: string;
};

// Function to get users from api
const getUsers = async () => {
  const url =
    "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10";
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

const QueryExample = () => {
  const {
    isLoading,
    data,
    isError,
    error,
    refetch, // To reftech the api response again
  } = useQuery({
    queryKey: ["users"], // QUery key
    queryFn: getUsers, // Query Function to fetch the data
    select: processData, // To process/filter the data what we need
    retry: false, // if api fails, this will refetch again for 3 times, still it get error, then it returns the error, to restrict retry will assign it to false, and we can change the retry times as well by using retry: 2
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <button onClick={() => refetch()}>Refetch</button>

      {/* Because in processData function, it is already validated, now no need to have data check again */}
      {data?.map((d) => (
        <div key={d.id}>
          {d.id} - {d.name}
        </div>
      ))}
    </div>
  );
};

export default QueryExample;
