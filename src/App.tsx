import { useState } from "react";
import { Tile } from "./Tile";

const COLUMNS = 30;
const ROWS = 20;

type Dir = "left" | "right" | "up" | "down";
type TileState = "snake" | "food" | "";
type Coor = { x: number; y: number };

const grid: number[][] = new Array(ROWS).fill(new Array(COLUMNS).fill(0));

function moveSnake(snake: Coor[], dir: Dir) {
  const newSnake = snake.slice(0, snake.length - 1).map((i) => ({ ...i }));
  const newHead: Coor = { x: 0, y: 0 };

  if (dir === "left") {
    newHead.x = newSnake[0].x - 1;
    newHead.y = newSnake[0].y;
  } else if (dir === "right") {
    newHead.x = newSnake[0].x + 1;
    newHead.y = newSnake[0].y;
  } else if (dir === "up") {
    newHead.x = newSnake[0].x;
    newHead.y = newSnake[0].y - 1;
  } else if (dir === "down") {
    newHead.x = newSnake[0].x;
    newHead.y = newSnake[0].y + 1;
  }

  newSnake.unshift(newHead);

  return newSnake;
}

function App() {
  const [snake, setSnake] = useState<Coor[]>([
    { x: 5, y: 6 },
    { x: 4, y: 6 },
  ]);
  const [food, setFood] = useState<Coor>({ x: 20, y: 15 });
  const [dir, setDir] = useState<Dir>("right");

  function setNextDir(nextDir: Dir) {
    if (dir === "left" && nextDir === "right") return;
    if (dir === "right" && nextDir === "left") return;
    if (dir === "down" && nextDir === "up") return;
    if (dir === "up" && nextDir === "down") return;

    setDir(nextDir);
  }

  function moveOneStep() {
    const newSnake = moveSnake(snake, dir);
    const newHead = newSnake[0];

    setSnake(newSnake);

    if (newHead.x === food.x && newHead.y === food.y) {
      const newHead: Coor = { x: 0, y: 0 };

      if (dir === "left") {
        newHead.x = newSnake[0].x - 1;
        newHead.y = newSnake[0].y;
      } else if (dir === "right") {
        newHead.x = newSnake[0].x + 1;
        newHead.y = newSnake[0].y;
      } else if (dir === "up") {
        newHead.x = newSnake[0].x;
        newHead.y = newSnake[0].y - 1;
      } else if (dir === "down") {
        newHead.x = newSnake[0].x;
        newHead.y = newSnake[0].y + 1;
      }

      // should set in next step
      setSnake([newHead, ...snake]);
    }
  }

  const gameOver =
    snake[0].x < 0 ||
    snake[0].x >= COLUMNS ||
    snake[0].y < 0 ||
    snake[0].y >= ROWS;

  return (
    <div>
      {gameOver && <div>Game Over</div>}
      <div>
        {/* simulate arrow button */}
        <button onClick={() => setNextDir("left")}>Left</button>
        <button onClick={() => setNextDir("right")}>Right</button>
        <button onClick={() => setNextDir("up")}>Up</button>
        <button onClick={() => setNextDir("down")}>Down</button>
        {/* simulate snake move manually */}
        <button onClick={moveOneStep}>Move</button>
      </div>
      <div>
        {grid.map((row, y) => (
          <div className="row" key={y}>
            {row.map((_, x) => {
              let state: TileState = "";

              if (y === food.y && x === food.x) {
                state = "food";
              }

              for (const i of snake) {
                if (y === i.y && x === i.x) {
                  state = "snake";
                }
              }

              return <Tile key={x} state={state} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// to be continued
