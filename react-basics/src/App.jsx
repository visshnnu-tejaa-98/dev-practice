import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import ChildrenExample from "./components/ChildrenExample";
import CountdownTimer from "./components/CountdownTimer";

function App() {
  return (
    <>
      <ChildrenExample />
      <CountdownTimer />
    </>
  );
}

export default App;
