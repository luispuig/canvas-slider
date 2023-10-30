import { useEffect, useMemo, useRef } from "react";
import { useMachine } from "@xstate/react";
import { useSlider } from "./pixi/initializer";
import { sliderMachine } from "./machine";

export const Slider = ({ images, width, height }: { images: string[]; width: number; height: number }) => {
  const canvas = useRef<HTMLDivElement>(null);

  const { mount, unmount, scrollTo } = useSlider({
    width,
    height,
    rootElementRef: canvas,
    images,
  });

  const machine = useMemo(() => sliderMachine({ onScrollTo: scrollTo }), [scrollTo]);
  const [, send] = useMachine(machine, { devTools: true });

  useEffect(() => {
    if (!canvas.current) return;
    mount();
    return unmount;
  }, [mount, unmount]);

  return (
    <>
      <div
        ref={canvas}
        onMouseDown={(event) => send({ type: "mouseDown", event })}
        onMouseMove={(event) => send({ type: "mouseMove", event })}
        onMouseUp={(event) => send({ type: "mouseUp", event })}
        onMouseLeave={(event) => send({ type: "mouseUp", event })}
      />
    </>
  );
};
