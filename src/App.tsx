import { Slider } from "./Slider";

import "./App.css";

function App() {
  return (
    <>
      <h1>Canvas slider</h1>
      <Slider
        images={[
          "https://medias.franceantilles.fr/api/v1/images/view/62b9d0a03766fd5b1b7d5042/width_1000/image.jpg",
          "https://blackbookswholesale.com/cdn/shop/products/ScreenShot2021-02-09at10.09.59AM_5e294b4e-da5f-4e81-9a8c-adcc47bb9261_1024x1024.png?v=1617361845",
          "https://estaticos-cdn.elperiodico.com/clip/f3ed7e09-d27b-43a6-bd96-5e96850e08b5_alta-libre-aspect-ratio_default_0.jpg",
        ]}
        width={640}
        height={400}
      />
    </>
  );
}

export default App;
