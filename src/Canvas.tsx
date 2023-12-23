import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { PickedColorContext } from "./contexts";
import { useCursorPosition } from "./hooks/useCursorPosition";

interface CanvasProps {
  width: number;
  height: number;
  hueColor?: string;
}

export function Canvas({ width, height, hueColor }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [element, setElement] = useState<HTMLCanvasElement | null>(ref.current);
  const { x, y } = useCursorPosition({ element, maxX: width, maxY: height });
  const { pickedColor, onColorChange } = useContext(PickedColorContext);

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    const context = ref?.current?.getContext('2d');

    if (hueColor == null || ref?.current == null || context == null) {
      return;
    }

    const { width, height } = getElementComputedSize(ref.current);
    const canvasContext = { context, width, height };

    drawGradientBackground({
      ...canvasContext,
      gradient: context.createLinearGradient(0, 0, width, 0),
      startColor: `hsl(${hueColor}, 0%, 100%)`,
      endColor: `hsl(${hueColor}, 100%, 50%)`
    });

    drawGradientBackground({
      ...canvasContext,
      gradient: context.createLinearGradient(0, height, 0, 0),
      startColor: `hsl(${hueColor}, 0%, 0%)`,
      endColor: `hsla(${hueColor}, 0%, 0%, 0)`
    });
  }, [hueColor]);

  useEffect(() => {
    if (x == null || y == null) {
      return;
    }

    const context = ref.current?.getContext("2d");

    if (context == null) {
      return;
    }

    const data = context.getImageData(x, y, 1, 1).data;

    let color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`
    if (x === 0 && y === 0) {
      color = `rgb(255, 255, 255)`;
    }

    if (onColorChange != null) {
      onColorChange(color);
    }

  }, [x, y, hueColor]);

  return (
    <Wrapper>
      <canvas ref={ref} id="canvas" width={width} height={height} />

      <Picker color={pickedColor} position={{ x, y }} />
    </Wrapper>
  )
}

function Wrapper({ children }: { children?: ReactNode }) {
  return (
    <div style={{position: 'relative', display: 'flex'}}>{children}</div>
  )
}

function Picker({ position, color }: { position: { x?: number; y?: number; }; color?: string }) {
  if (color == null || position.x == null || position.y == null) {
    return null;
  }

  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        position: 'absolute',
        transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        border: `2px solid white`,
        background: color,
        borderRadius: '50%',
        cursor: 'pointer',
      }}
    />
  );
}

interface Options {
  context: CanvasRenderingContext2D;
  gradient: CanvasGradient;
  width: number;
  height: number;
  startColor: string;
  endColor: string;
}

function drawGradientBackground({ context, gradient, height, width, startColor, endColor }: Options) {
  gradient.addColorStop(0, startColor);
  gradient.addColorStop(1, endColor);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width + 1, height + 1);
}

/**
 * @name getElementComputedSize
 * @description width, height 실제 픽셀 값을 구할 수 있습니다.
 */
function getElementComputedSize(element: HTMLElement) {
  const computedStyle = getComputedStyle(element);
  return {
    width: parseInt(computedStyle.width),
    height: parseInt(computedStyle.height),
  }
}
