import { useContext, useEffect, useState } from "react";
import { PickedColorContext } from "../contexts";

interface Options {
  canvas?: CanvasRenderingContext2D | null;
  x?: number;
  y?: number;
  hueColor?: string;
}

export function useColorPicker({ canvas, x, y, hueColor }: Options) {
  const { pickedColor, onColorChange } = useContext(PickedColorContext);

  useEffect(() => {
    if (x == null || y == null) {
      return;
    }

    // const context = canvas?.getContext("2d");

    if (canvas == null) {
      return;
    }

    const data = canvas?.getImageData(x, y, 1, 1).data;
    const color = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`

    onColorChange(color);

  }, [x, y, hueColor]);

  return { pickedColor } as const;
}