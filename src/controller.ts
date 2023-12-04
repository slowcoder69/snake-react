import { useEffect } from "react";
import type { Dir } from "./types";

export function useController(move: (dir: Dir) => void) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "a":
        case "A":
        case "ArrowLeft":
          move("left");
          return;
        case "d":
        case "D":
        case "ArrowRight":
          move("right");
          return;
        case "w":
        case "W":
        case "ArrowUp":
          move("up");
          return;
        case "s":
        case "S":
        case "ArrowDown":
          move("down");
          return;
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
