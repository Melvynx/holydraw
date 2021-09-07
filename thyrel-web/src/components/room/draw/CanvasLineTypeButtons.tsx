import { IconButton, Tooltip } from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import CloseIcon from '@material-ui/icons/Close';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import { useCanvasContext } from 'components/canvas/DrawingCanvasContext';
import CircleButtons from 'components/circle-button/CircleButtons';
import React from 'react';
import { LineType } from 'types/canvas.types';
import ActionButton from './ActionButton';

function getCurrentIcon(lineType: LineType) {
  switch (lineType) {
    case LineType.FILL:
      return FormatColorFillIcon;
    case LineType.LINE:
      return BrushIcon;
  }
  return BrushIcon;
}

type CanvasLineTypeButtonProps = {
  disabled?: boolean;
  spacing?: number;
};

export default function CanvasLineTypeButton({
  disabled,
  spacing = 1,
}: CanvasLineTypeButtonProps) {
  const { lineType, setLineType } = useCanvasContext();
  const Icon = getCurrentIcon(lineType);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'b':
          setLineType(LineType.LINE);
          break;
        case 'f':
          setLineType(LineType.FILL);
          break;
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [setLineType]);

  return (
    <CircleButtons
      circleBg="fill"
      spacing={spacing}
      action={({ open, sx }) => (
        <ActionButton
          disabled={disabled}
          ml={0}
          sx={sx}
          title={open ? 'Close' : 'Open'}>
          {open ? <CloseIcon /> : <Icon />}
        </ActionButton>
      )}>
      <IconButton onClick={() => setLineType(LineType.LINE)} size="large">
        <Tooltip title="hotkey: B">
          <BrushIcon />
        </Tooltip>
      </IconButton>
      <IconButton onClick={() => setLineType(LineType.FILL)} size="large">
        <Tooltip title="hotkey: F">
          <FormatColorFillIcon />
        </Tooltip>
      </IconButton>
    </CircleButtons>
  );
}
