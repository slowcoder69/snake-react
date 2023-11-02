import { useState } from "react";
import { Tile } from "./Tile";

const COLUMNS = 30;
const ROWS = 20;
const grid: number[][] = new Array(ROWS).fill(new Array(COLUMNS).fill(0));

function App() {
  const [snake, setSnake] = useState({ x: 5, y: 6 });

  function handleClick(dir: string) {
    if (dir === "left") {
      setSnake({
        ...snake,
        x: snake.x - 1,
      });
    } else if (dir === "right") {
      setSnake({
        ...snake,
        x: snake.x + 1,
      });
    } else if (dir === "up") {
      setSnake({
        ...snake,
        y: snake.y - 1,
      });
    } else if (dir === "down") {
      setSnake({
        ...snake,
        y: snake.y + 1,
      });
    }
  }

  const gameOver =
    snake.x < 0 || snake.x >= COLUMNS || snake.y < 0 || snake.y >= ROWS;

  return (
    <div>
      {gameOver && <div>Game Over</div>}
      <div>
        <button onClick={() => handleClick("left")}>Left</button>
        <button onClick={() => handleClick("right")}>Right</button>
        <button onClick={() => handleClick("up")}>Up</button>
        <button onClick={() => handleClick("down")}>Down</button>
      </div>
      <div>
        {grid.map((row, y) => (
          <div className="row" key={y}>
            {row.map((_, x) => (
              <Tile key={x} isSnake={y === snake.y && x === snake.x} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// to be continued
