import { useMemo, useRef } from "react";
import { useMachine } from "@xstate/react";
import { useSlider } from "./pixi/canvasSlider";
import { sliderMachine } from "./machine";
import cx from "classnames";

export const Slider = ({
  images,
  width,
  height,
  backgroundColor,
  className,
}: {
  images: string[];
  width: number;
  height: number;
  className?: string;
  backgroundColor: string;
}) => {
  const canvas = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSlider({ width, height, backgroundColor, rootElementRef: canvas, images });
  const machine = useMemo(() => sliderMachine({ onScrollTo: scrollTo }), [scrollTo]);
  const [state, send] = useMachine(machine, { devTools: true });
  const isDragging = state.matches("dragging");

  return (
    <div
      ref={canvas}
      onMouseDown={(event) => send({ type: "mouseDown", event })}
      className={cx(className, "overflow-hidden", { "cursor-grabbing": isDragging }, { "cursor-grab": !isDragging })}
      style={{ width, height, backgroundColor }}
    />
  );
};
