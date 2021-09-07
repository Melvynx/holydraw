import { Box } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import {
  OnClearAction,
  OnRedoAction,
  OnSaveAction,
  OnUndoAction,
} from 'components/canvas/DrawingCanvasActions';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import { useSessionContext } from 'hooks/SessionProvider';
import { useState } from 'react';
import { colors } from 'utils/app-constant';
import ActionButton from './ActionButton';
import { ColorPickerButton } from './ColorPickerButton';
import SizePickerV2 from './desktop/SizePickerV2';

export default function GameCanvas() {
  const { currentElement, onSave } = useSessionContext();
  const isFinish = Boolean(currentElement?.finishAt);
  const [color, setColor] = useState(colors[5]);
  const [size, setSize] = useState(8);

  return (
    <DrawingCanvasProvider color={color} disabled={isFinish} lineSize={size}>
      <Box display="flex" flexDirection="column" gap={4} alignItems="center">
        <Box width="100%">
          <DrawingCanvas disabled={isFinish} />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          width="100%">
          <OnClearAction>
            <ActionButton ml={0} disabled={isFinish} title="hotkey: C">
              <DeleteIcon />
            </ActionButton>
          </OnClearAction>
          <OnUndoAction>
            <ActionButton ml={0} disabled={isFinish} title="CMD + Z">
              <UndoIcon />
            </ActionButton>
          </OnUndoAction>
          <OnRedoAction>
            <ActionButton ml={0} disabled={isFinish} title="CMD + SHIFT + Z">
              <RedoIcon />
            </ActionButton>
          </OnRedoAction>
          <ColorPickerButton
            isFinish={isFinish}
            currentColor={color}
            onColorChange={setColor}
          />
          <OnSaveAction
            onSave={canvasImage => {
              if (!canvasImage) return;
              onSave(canvasImage);
            }}>
            <ActionButton
              ml={0}
              color="primary"
              title={isFinish ? 'Edit' : 'Finish'}>
              {isFinish ? <EditIcon /> : <CheckIcon />}
            </ActionButton>
          </OnSaveAction>
        </Box>
        <SizePickerV2
          orientation="horizontal"
          onSizeChange={setSize}
          size={size}
        />
      </Box>
    </DrawingCanvasProvider>
  );
}
