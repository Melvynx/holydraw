import React from 'react';

type UseCanvasEventListenerProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isPainting?: boolean;
  onMouseUp: (event: MouseEvent) => void;
  onMouseEnter: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseDown: (event: MouseEvent) => void;
  onResize: (event?: UIEvent) => void;
  disabled?: boolean;
};

export default function useCanvasEventListener({
  canvasRef,
  isPainting,
  onMouseMove,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
  disabled,
  onResize,
}: UseCanvasEventListenerProps) {
  React.useEffect(() => {
    if (!isPainting || disabled) return;

    function touchMove(event: TouchEvent) {
      if (!event) return;

      const mouseEvent = new MouseEvent('mousedown', {
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      });
      onMouseMove(mouseEvent);
    }

    window.document.addEventListener('mousemove', onMouseMove);
    window.document.addEventListener('touchmove', touchMove);
    return () => {
      window.document.removeEventListener('mousemove', onMouseMove);
      window.document.removeEventListener('touchmove', touchMove);
    };
  }, [disabled, isPainting, onMouseMove]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preventDefault = (event: Event) => event.preventDefault();

    canvas.addEventListener('touchstart', preventDefault);
    canvas.addEventListener('touchmove', preventDefault);

    return () => {
      canvas.removeEventListener('touchstart', preventDefault);
      canvas.removeEventListener('touchmove', preventDefault);
    };
  }, [canvasRef]);

  React.useEffect(() => {
    if (!canvasRef.current || disabled) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mouseenter', onMouseEnter);
    return () => {
      canvas.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [canvasRef, disabled, onMouseEnter]);

  React.useEffect(() => {
    if (!canvasRef.current || disabled) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    function touchStart(event: TouchEvent) {
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      });
      onMouseDown(mouseEvent);
    }

    function touchEnd(event: TouchEvent) {
      event.preventDefault();
      const touches = event.touches[0];

      // if no touches, just stop the drawing with empty event
      if (!touches) {
        onMouseUp(new MouseEvent('mousedown', {}));
        return;
      }

      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touches.clientX,
        clientY: touches.clientY,
      });
      onMouseUp(mouseEvent);
    }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('touchstart', touchStart);
    canvas.addEventListener('touchend', touchEnd);
    canvas.addEventListener('touchcancel', touchEnd);
    window.document.addEventListener('mouseup', onMouseUp);
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('touchstart', touchStart);
      canvas.removeEventListener('touchend', touchEnd);
      canvas.removeEventListener('touchcancel', touchEnd);
      window.document.removeEventListener('mouseup', onMouseUp);
    };
  }, [canvasRef, disabled, onMouseDown, onMouseUp]);

  React.useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);
}
