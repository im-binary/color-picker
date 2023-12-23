import { useEffect, useState } from 'react';

interface Options {
  element?: HTMLElement | null;
  maxX: number;
  maxY: number;
}

export function useCursorPosition({ element, maxX, maxY } : Options) {
  // 기본값 rgb(255,255,255)
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    if (element == null) {
      return;
    }

    const settingPosition = function(e: MouseEvent){
      if (e.buttons === 0) {
        return;
      }

      const rect = element.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // NOTE: Canvas의 영역을 벗어나지 않은 경우에만 좌표를 업데이트
      const OFFSET = 50;
      if (x > (-1 * OFFSET) && x < rect.width + OFFSET && y > (-1 * OFFSET) && y < rect.height + OFFSET) {
        // NOTE: 가장 (오른쪽 / 하단쪽)의 경우 Canvas에 존재하지 않은 영역이므로 -1을 해야함
        setX(Math.max(Math.min(maxX - 1, x), 0));
        setY(Math.max(Math.min(maxY - 1, y), 0));
      }
    }

    element.addEventListener('mousedown', settingPosition);
    window.addEventListener('mousemove', settingPosition);
  
    return () => {
      element.removeEventListener('mousedown', settingPosition);
      window.removeEventListener('mousemove', settingPosition);
    }
  }, [element, x, y, maxX, maxY]);

  return { x, y } as const;
}