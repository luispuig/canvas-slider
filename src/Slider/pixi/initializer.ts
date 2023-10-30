import * as PIXI from "pixi.js";

let pixiApp;

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
  pixiApp = new PIXI.Application({
    width,
    height,
    antialias: true,
    sharedTicker: false,
  });
  if (pixiApp.view.style === undefined) throw new Error("pixiApp.view.style is undefined");

  pixiApp.view.style.width = "100%";
  pixiApp.view.style.height = "100%";
  pixiApp.stage.sortableChildren = true;
  rootElement.appendChild(pixiApp.view as unknown as Node);

  const example = new PIXI.Graphics();
  example.beginFill(0xff0000);
  example.drawRect(0, 0, 100, 100);
  example.endFill();
  pixiApp.stage.addChild(example);

  const unmount = () => {
    removeChildren(rootElement);
  };

  console.log(images);
  return { unmount };
};
