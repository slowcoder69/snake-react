import { useState } from "react";
import { Tile } from "./Tile";
import { useController } from "./controller";
import { useInterval } from "./useInterval";
import type { Dir, TileState, Coor } from "./types";

const COLUMNS = 30;
const ROWS = 20;

const grid: number[][] = new Array(ROWS).fill(new Array(COLUMNS).fill(0));

function randomTile(snake: Coor[]) {
  function rnd(n: number) {
    return Math.floor(Math.random() * n);
  }

  let tile = { x: 0, y: 0 };

  do {
    tile = {
      x: rnd(COLUMNS),
      y: rnd(ROWS),
    };
  } while (snake.some((i) => i.x === tile.x && i.y === tile.y));

  return tile;
}

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

function isGameOver(snake: Coor[]) {
  const head = snake[0];

  const collide = snake.slice(3).some((i) => i.x === head.x && i.y === head.y);

  return (
    collide ||
    head.x < 0 ||
    head.x > COLUMNS - 1 ||
    head.y < 0 ||
    head.y > ROWS - 1
  );
}

function App() {
  const [snake, setSnake] = useState<Coor[]>([
    { x: 13, y: 15 },
    { x: 12, y: 15 },
  ]);
  const [food, setFood] = useState<Coor>({ x: 17, y: 15 });
  const [dir, setDir] = useState<Dir>("right");
  const [gameOver, setGameOver] = useState(false);

  function moveOneStep() {
    if (gameOver) return;

    const newSnake = moveSnake(snake, dir);
    const newHead = newSnake[0];

    if (isGameOver(newSnake)) {
      setGameOver(true);
      return;
    }

    if (newHead.x === food.x && newHead.y === food.y) {
      newSnake.push(snake[snake.length - 1]);
      setFood(randomTile(newSnake));
    }

    setSnake(newSnake);
  }

  useInterval(moveOneStep, 200);

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

// i think this is good enough, just need to make the ui prettier
