import { useState } from "react";
import { Canvas } from "./Canvas";
import { ColorBlock } from "./ColorBlock";
import { PickedColorContext } from "./contexts";
import { Slider } from "./Slider";
import "./index.css";
import { ColorInfo } from "./ColorInfo";

function App() {
  const [hueColor, setHueColor] = useState<string>("0");
  const [pickedColor, setPickedColor] = useState<string>("rgb(255, 255, 255)");

  return (
    <PickedColorContext.Provider value={
      {
        pickedColor,
        onColorChange: setPickedColor
      }
    }>
      <main 
        style={{
          border: '1px solid #3c4043',
          maxWidth: '650px',
          borderRadius: '8px',
        }}
      >
        <h1 style={{ fontSize:'20px', padding: '16px', fontWeight:'400'}}>색상 선택 도구</h1>
        <div style={{ display: 'flex' }}>
          <ColorBlock width={204} height={228}/>
          <Canvas width={446} height={228} hueColor={hueColor} />
        </div>

        <Slider
          hueColor={hueColor}
          onChange={(e) => setHueColor(`${e[0]}`)}
          thumbColor={`hsl(${hueColor}, 100%, 50%)`}
        />
        <ColorInfo hueColor={hueColor} />
      </main>
    </PickedColorContext.Provider>
  );
}

export default App;
