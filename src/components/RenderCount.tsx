import { useRef } from "react";

export const RenderCount = () => {
  const renders = useRef(0);

  renders.current++;

  return (
    <span onClick={() => console.log(renders.current)}>{renders.current}</span>
  );
};
