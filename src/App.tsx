import { useRef, useState } from "react";
import "./App.css";

const GRID_SIZE = 9;
const INTERVAL = 500;

function App() {
  const [active, setActive] = useState<number>();
  const [score, setScore] = useState(0);
  const [intervalId, setIntervalId] = useState<number>();
  const prevPosition = useRef<number>();

  const generate = () => {
    // 0 to (GRID_SIZE - 1)
    const randomNumber = Math.floor(Math.random() * GRID_SIZE);

    if (prevPosition.current !== randomNumber) {
      setActive(randomNumber);
      prevPosition.current = randomNumber;
    } else {
      generate();
    }
  };

  const start = () => {
    generate();
    const id = setInterval(generate, INTERVAL);
    setIntervalId(id);
  };

  const stop = () => {
    clearInterval(intervalId);
    setIntervalId(undefined);
    setScore(0);
    setActive(undefined);
  };

  const hit = () => {
    setScore((prev) => prev + 1);
    setActive(undefined);
  };

  return (
    <>
      <h1>Whac-a-mole</h1>
      <h2>Score: {score}</h2>
      <button type="button" onClick={intervalId === undefined ? start : stop}>
        {intervalId === undefined ? "Start" : "Stop"}
      </button>
      <div id="board">
        {Array.from({ length: GRID_SIZE }, (_, i) =>
          i === active ? (
            <div id="active" key={i} onClick={hit} />
          ) : (
            <div key={i} />
          ),
        )}
      </div>
    </>
  );
}

export default App;
