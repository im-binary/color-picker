import { createContext } from 'react';

export const PickedColorContext = createContext({
  pickedColor: "rgb(255, 255, 255)",
  onColorChange: (color: string) => {},
})

