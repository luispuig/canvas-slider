import { useEffect, useRef } from "react";
import { initializePixi } from "./pixi/initializer";

export const Slider = ({ images, width, height }: { images: string[]; width: number; height: number }) => {
  console.log(images);
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const { unmount } = initializePixi({
      rootElement: canvas.current,
      width,
      height,
      images,
    });
    return unmount;
  }, [height, images, width]);

  return <div ref={canvas}>loading...</div>;
};
