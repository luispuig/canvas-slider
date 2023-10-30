import { useEffect, useRef, useState } from "react";
import { useSlider } from "./pixi/initializer";

export const Slider = ({ images, width, height }: { images: string[]; width: number; height: number }) => {
  const [left, setLeft] = useState(0);
  const canvas = useRef<HTMLDivElement>(null);

  const { mount, unmount, scrollTo, minScroll, maxScroll } = useSlider({
    width,
    height,
    rootElementRef: canvas,
    images,
  });

  useEffect(() => {
    scrollTo(left);
  }, [left, scrollTo]);

  useEffect(() => {
    if (!canvas.current) return;
    mount();
    return unmount;
  }, [mount, unmount]);

  return (
    <>
      <div ref={canvas} />
      <button onClick={() => setLeft((prev) => Math.max(prev - 100, minScroll))}>left</button>
      <button onClick={() => setLeft((prev) => Math.min(prev + 100, maxScroll))}>right</button>
    </>
  );
};
