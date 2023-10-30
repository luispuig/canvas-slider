import * as PIXI from "pixi.js";
import { AppLoaderPlugin } from "@pixi/loaders";
import { useCallback, useRef } from "react";
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

export const useSlider = ({
  rootElementRef,
  width,
  height,
  images,
}: {
  rootElementRef: { current: HTMLDivElement | null };
  width: number;
  height: number;
  images: string[];
}) => {
  const pixiApp = useRef<PIXI.Application<PIXI.ICanvas>>();
  const scrollContainer = useRef<PIXI.Container>();

  const mount = useCallback(() => {
    if (rootElementRef.current === null) throw new Error("Root element is not initialized");
    pixiApp.current = new PIXI.Application({
      width,
      height,
      antialias: true,
      sharedTicker: false,
      backgroundColor: 0xf2f2f2,
    });
    pixiApp.current.stage.sortableChildren = true;
    rootElementRef.current.appendChild(pixiApp.current.view as unknown as Node);

    scrollContainer.current = new PIXI.Container();
    scrollContainer.current.sortableChildren = true;
    scrollContainer.current.x = 0;
    pixiApp.current.stage.addChild(scrollContainer.current);

    images.forEach((URL, index) => {
      PIXI.Assets.load(URL).then((image) => {
        if (!pixiApp.current || !scrollContainer.current) throw new Error("Pixi app is not initialized");
        const sprite = new PIXI.Sprite(image);
        sprite.anchor.set(0.5);
        sprite.x = index * width + pixiApp.current.screen.width / 2;
        sprite.y = pixiApp.current.screen.height / 2;
        const scale = Math.min(
          pixiApp.current.screen.width / sprite.width,
          pixiApp.current.screen.height / sprite.height
        ); // apply scale to fit image in screen in contain mode
        sprite.scale.set(scale);
        scrollContainer.current.addChild(sprite);
      });
    });
  }, [height, images, rootElementRef, width]);

  const unmount = useCallback(() => {
    pixiApp.current?.destroy();
    pixiApp.current = undefined;
    if (rootElementRef.current !== null) removeChildren(rootElementRef.current);
  }, [rootElementRef]);

  const minScroll = 0;
  const maxScroll = width * (images.length - 1);

  const scrollTo = useCallback(
    (pixels: number) => {
      if (!pixiApp.current || !scrollContainer.current) return;
      if (pixels <= minScroll) scrollContainer.current.x = minScroll * -1;
      else if (pixels >= maxScroll) scrollContainer.current.x = maxScroll * -1;
      else scrollContainer.current.x = pixels * -1;
    },
    [maxScroll]
  );

  return { mount, unmount, scrollTo, minScroll, maxScroll };
};
