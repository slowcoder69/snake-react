import { useEffect, useState } from "react";
import { Tile } from "./Tile";
import { useController } from "./controller";
import type { Dir, TileState, Coor } from "./types";

const COLUMNS = 30;
const ROWS = 20;

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

  const gameOver =
    snake[0].x <= 0 ||
    snake[0].x >= COLUMNS - 1 ||
    snake[0].y <= 0 ||
    snake[0].y >= ROWS - 1;

  useEffect(() => {
    function moveOneStep() {
      if (gameOver) return;

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

    const intervalId = window.setInterval(() => {
      moveOneStep();
    }, 500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useController(setNextDir);

  function setNextDir(nextDir: Dir) {
    if (dir === "left" && nextDir === "right") return;
    if (dir === "right" && nextDir === "left") return;
    if (dir === "down" && nextDir === "up") return;
    if (dir === "up" && nextDir === "down") return;

    setDir(nextDir);
  }

  return (
    <div>
      <div style={{ visibility: gameOver ? "visible" : "hidden" }}>
        Game Over
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
