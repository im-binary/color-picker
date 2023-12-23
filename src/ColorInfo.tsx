import { useContext, useEffect, useState } from "react";
import { PickedColorContext } from "./contexts";
import { ColorTranslator } from 'colortranslator';

const COPY_DONE_ICON = "https://fonts.gstatic.com/s/i/googlematerialicons/done/v15/gm_grey200-24dp/1x/gm_done_gm_grey200_24dp.png";
const COPY_ICON = "https://fonts.gstatic.com/s/i/googlematerialicons/content_copy/v16/gm_grey200-24dp/1x/gm_content_copy_gm_grey200_24dp.png";

export function ColorInfo({ hueColor }: { hueColor: string }) {
  const [copy, setCopy] = useState(false);

  const { pickedColor } = useContext(PickedColorContext);
  const [r, g, b] = pickedColor.replace("rgb(", "").replace(")", "").split(",").map(el => Number(el));

  const color = new ColorTranslator(pickedColor, { decimals: 0 });
  const hsv = rgb2hsv(r, g, b);

  const onCopyPickColor = () => {
    navigator.clipboard.writeText(color.HEX);
    setCopy(true);
  }

  useEffect(()=> {
    setCopy(false);
  },[pickedColor, hueColor]);

  return (
    <div style={{ margin: '0 16px' }}>
      <fieldset className="color-info-main">
        <legend>HEX</legend>
        <div>
          <input
            value={color.HEX}
            onChange={() => {}}
            />
          <button onClick={onCopyPickColor}>
            <img src={copy ? COPY_DONE_ICON : COPY_ICON} alt="copy" />
          </button>
        </div>
      </fieldset>

      <div className="color-info-container">
        <fieldset>
          <legend>RGB</legend>
          <input
            type="text"
            value={`${r}, ${g}, ${b}`}
            onChange={() => {}}
          />
        </fieldset>

        <fieldset>
          <legend>CMYK</legend>
          <input
            type="text" 
            value={color.CMYK.replace('device-cmyk(', '').replace(')', '')}
            onChange={() => {}}
          />
        </fieldset>

        <fieldset>
          <legend>HSV</legend>
          <input
            type="text" value={`${hsv[0]}°, ${hsv[1]}%, ${hsv[2]}%`}
            onChange={() => {}}
          />
        </fieldset>

        <fieldset>
          <legend>HSL</legend>
          <input
            type="text"
            value={color.HSL}
            onChange={() => {}}
          />
        </fieldset>
      </div>
      <div style={{padding:'30px'}}></div>
    </div>
  )
}


// @see https://github.com/michaelrhodes/rgb-hsv/blob/master/index.js
function rgb2hsv(r: number, g: number, b: number) {
  var s, v
  var max = Math.max(r, g, b)
  var min = Math.min(r, g, b)
  var delta = max - min;

  // hue
  let h = (() => {
    if (delta === 0) {
      return 0
    } else if (r === max) {
      return ((g-b) / delta) % 6
    } else if (g === max) {
      return (b-r) / delta + 2
    } else if (b === max) {
      return (r-g) / delta + 4
    }
  })() as number;

  h = Math.round(h*60)
  if (h < 0) h += 360

  // saturation
  s = Math.round((max === 0 ? 0 : (delta / max)) * 100)

  // value
  v = Math.round(max/255*100)

  return [h, s, v]
}