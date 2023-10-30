import * as PIXI from "pixi.js";
import { AppLoaderPlugin } from "@pixi/loaders";
// import { useEffect, useRef } from "react";
PIXI.extensions.add(AppLoaderPlugin);

const removeChildren = (element: HTMLDivElement) => {
  if (!element) return;

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const initializePixi = ({
  rootElement,
  width,
  height,
  images,
}: {
  rootElement: HTMLDivElement;
  width: number;
  height: number;
  images: string[];
}) => {
  const pixiApp = new PIXI.Application({
    width,
    height,
    antialias: true,
    sharedTicker: false,
    backgroundColor: "#F2F2F2",
  });
  pixiApp.stage.sortableChildren = true;
  rootElement.appendChild(pixiApp.view as unknown as Node);

  const scrollContainer = new PIXI.Container();
  scrollContainer.sortableChildren = true;
  scrollContainer.x = 0;
  pixiApp.stage.addChild(scrollContainer);

  images.forEach((URL, index) => {
    PIXI.Assets.load(URL).then((image) => {
      const sprite = new PIXI.Sprite(image);
      sprite.anchor.set(0.5);
      sprite.x = index * width + pixiApp.screen.width / 2;
      sprite.y = pixiApp.screen.height / 2;
      const scale = Math.min(pixiApp.screen.width / sprite.width, pixiApp.screen.height / sprite.height); // apply scale to fit image in screen in contain mode
      sprite.scale.set(scale);
      scrollContainer.addChild(sprite);
    });
  });

  const unmount = () => {
    removeChildren(rootElement);
  };

  const scrollTo = (pixels: number) => {
    const maxScroll = -width * (images.length - 1);
    if (pixels >= 0) scrollContainer.x = 0;
    else if (pixels <= maxScroll) scrollContainer.x = maxScroll;
    else scrollContainer.x = pixels;
  };

  return { unmount, scrollTo };
};

// const useSlider = ({
//   rootElement,
//   width,
//   height,
//   images,
// }: {
//   rootElement: HTMLDivElement;
//   width: number;
//   height: number;
//   images: string[];
// }) => {
//   const pixiApp = useRef();

//   useEffect(() => {
//     pixiApp.current = new PIXI.Application({
//       width,
//       height,
//       antialias: true,
//       sharedTicker: false,
//       backgroundColor: 0xf2f2f2,
//     });
//     pixiApp.stage.sortableChildren = true;
//     rootElement.appendChild(pixiApp.view as unknown as Node);
//   }, [height, images, rootElement, width]);

//   return publicInterface.current;
// };
