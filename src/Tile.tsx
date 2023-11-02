interface Props {
  isSnake?: boolean;
}

export function Tile({ isSnake }: Props = { isSnake: false }) {
  return <div className={`tile ${isSnake ? "is-snake" : ""}`}></div>;
}
