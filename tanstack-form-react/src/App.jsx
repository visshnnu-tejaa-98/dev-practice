import "./App.css";
import CashingExample from "./components/CashingExample";
import MutationExample from "./components/MutationExample";
import PaginationAndInfiniteQueriesExample from "./components/PaginationExample";
import QueryExample from "./components/QueryExample";

function App() {
  return (
    <>
      <h1>Hello Tanstack Query</h1>
      {/* <QueryExample /> */}
      {/* <MutationExample /> */}
      {/* <CashingExample /> */}
      <PaginationAndInfiniteQueriesExample />
    </>
  );
}

export default App;
