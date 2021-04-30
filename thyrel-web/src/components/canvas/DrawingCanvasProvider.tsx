import React from 'react';
import { getCoordinates } from 'utils/canvas.utils';
import { DrawingCanvasProviderProps } from './canvas.type';
import { DrawingCanvasContext } from './DrawingCanvasContext';
import useCanvasEventListener from './useCanvasEventListener';
import useCanvasPaint from './useCanvasPaint';

const canvasWidth = {
  width: 512,
  height: 320,
  border: 4,
  scale: 2,
};

const ratio = 1.6;

export function DrawingCanvasProvider({
  color = '#900050',
  lineSize = 4,
  disabled = false,
  children,
}: DrawingCanvasProviderProps) {
  const [currentSize, setCurrentSize] = React.useState(canvasWidth);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = React.useState(false);

  const onResize = React.useCallback(() => {
    const newWidth = canvasRef.current?.parentElement?.parentElement?.getBoundingClientRect()
      .width;
    if (!newWidth || newWidth < 64) return;

    const scale = 1024 / newWidth;
    const newHeight = newWidth / ratio;
    const border = newWidth < 400 ? 2 : 4;
    const noUpdateRange = 1;

    if (
      newWidth - noUpdateRange > currentSize.width ||
      newWidth + noUpdateRange < currentSize.width
    ) {
      setCurrentSize({
        width: newWidth - border * 2,
        height: newHeight - border * 2,
        border,
        scale,
      });
    }
  }, [currentSize.width]);

  const {
    paint,
    create,
    addLastLine,
    clear,
    undo,
    refresh,
    redo,
  } = useCanvasPaint({
    color,
    size: lineSize,
    canvasRef,
    scale: currentSize.scale,
  });

  const onMouseDown = React.useCallback(
    (event: MouseEvent, isNewLine: boolean = true) => {
      const coordinates = getCoordinates(
        event,
        currentSize.scale,
        canvasRef.current,
      );
      if (!coordinates) return;
      setIsPainting(true);

      create(coordinates, isNewLine);
    },
    [create, currentSize.scale],
  );

  const onMouseUp = React.useCallback(
    (event: MouseEvent) => {
      setIsPainting(false);
      const coordinate = getCoordinates(event, currentSize.scale);
      addLastLine(coordinate);
    },
    [addLastLine, currentSize.scale],
  );

  const onMouseEnter = React.useCallback(
    (event: MouseEvent) => {
      if (isPainting) onMouseDown(event, false);
    },
    [isPainting, onMouseDown],
  );

  const onMouseMove = React.useCallback(
    (event: MouseEvent) => {
      if (!isPainting || !canvasRef.current) return;
      const newMousePosition = getCoordinates(
        event,
        currentSize.scale,
        canvasRef.current,
      );
      paint(newMousePosition);
    },
    [currentSize.scale, isPainting, paint],
  );

  useCanvasEventListener({
    canvasRef,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseMove,
    isPainting,
    onResize,
    disabled,
  });

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.width = currentSize.width * currentSize.scale;
    canvas.height = currentSize.height * currentSize.scale;
    refresh();
  }, [canvasRef, refresh, currentSize]);

  const values = React.useMemo(
    () => ({ clear, undo, canvasRef, redo, size: currentSize }),
    [clear, currentSize, redo, undo],
  );

  return (
    <DrawingCanvasContext.Provider value={values}>
      {children}
    </DrawingCanvasContext.Provider>
  );
}
