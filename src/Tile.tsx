interface Props {
  state: "snake" | "food" | "";
}

export function Tile({ state }: Props = { state: "" }) {
  return <div className={`tile ${state}`}></div>;
}
