import { Box } from '@material-ui/core';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import { useSessionContext } from 'hooks/SessionProvider';
import React from 'react';
import { colors } from 'utils/app-constant';
import DirectiveLabel from '../../DirectiveLabel';
import { useDisableBodyOverflow } from '../useDisableBodyOverflow';
import DesktopCanvasActionButtons from './DesktopCanvasActionButtons';
import DesktopColorPicker from './DesktopColorPicker';
import SizePickerV2 from './SizePickerV2';

export default function DrawDesktopCanvas() {
  const [color, setColor] = React.useState(colors[5]);
  const [size, setSize] = React.useState(8);
  const { onSave } = useSessionContext();
  const { currentElement } = useSessionContext();
  useDisableBodyOverflow();

  const isFinish = Boolean(currentElement?.finishAt);

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      alignItems="center">
      <DesktopColorPicker
        disabled={isFinish}
        currentColor={color}
        onColorChange={setColor}
      />
      <Box
        display="flex"
        flexDirection="column"
        mx={2}
        width={{ md: 768, lg: 800 }}>
        <Box mb={2}>
          <DirectiveLabel
            directive="Time to Draw"
            sentence={currentElement?.parent?.text || 'Default sentence'}
          />
        </Box>
        <DrawingCanvasProvider
          color={color}
          lineSize={size}
          disabled={isFinish}>
          <Box>
            <DrawingCanvas disabled={isFinish} />
          </Box>
          <DesktopCanvasActionButtons
            onSave={canvasImage => {
              if (!canvasImage) return;
              onSave(canvasImage);
            }}
            isFinish={isFinish}
          />
        </DrawingCanvasProvider>
      </Box>
      <Box>
        <SizePickerV2 size={size} onSizeChange={setSize} />
      </Box>
    </Box>
  );
}
