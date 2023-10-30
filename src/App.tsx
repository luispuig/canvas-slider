import { Slider } from "./Slider";

import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-2xl m-4">Publitas Frontend Code Challenge</h1>
      <div>
        <Slider
          images={["/images/0.webp", "/images/1.webp", "/images/2.webp", "/images/3.webp"]}
          width={640}
          height={400}
          backgroundColor="#F2F2F2"
          className="border border-neutral-300"
        />
        <div className="text-neutral-500 text-xs m-2">Drag to change the image</div>
      </div>
    </>
  );
}

export default App;
