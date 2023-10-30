import { useEffect, useRef, useState } from "react";
import { initializePixi } from "./pixi/initializer";

export const Slider = ({ images, width, height }: { images: string[]; width: number; height: number }) => {
  const [left, setLeft] = useState(0);
  const canvas = useRef<HTMLDivElement>(null);
  const tmp = useRef<(pixels: number) => void>();

  useEffect(() => {
    console.log(left);
    tmp.current?.(left);
  }, [left]);

  useEffect(() => {
    if (!canvas.current) return;
    const { unmount, scrollTo } = initializePixi({
      rootElement: canvas.current,
      width,
      height,
      images,
    });
    tmp.current = scrollTo;
    return unmount;
  }, [height, images, width]);

  return (
    <>
      <div ref={canvas} />
      <button onClick={() => setLeft((prev) => prev - 100)}>left</button>
      <button onClick={() => setLeft((prev) => prev + 100)}>right</button>
    </>
  );
};
