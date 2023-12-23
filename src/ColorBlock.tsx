import { useContext } from "react";
import { PickedColorContext } from "./contexts";

interface ColorBlockProps {
  width: number;
  height: number;
}

export function ColorBlock({ width, height }: ColorBlockProps) {
  const { pickedColor } = useContext(PickedColorContext);

  
  return (
    <div
      style={{
        display: 'inline-block',
        width: `${width}px`,
        height: `${height}px`,
        ...(
          pickedColor == null ? {} : { backgroundColor: `${pickedColor}` }
        )
      }}
    />
  )
}
