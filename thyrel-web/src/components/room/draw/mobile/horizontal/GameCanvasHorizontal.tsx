import { alpha, Box, Typography } from '@material-ui/core';
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
import { PropsWithChildren, useState } from 'react';
import { colors } from 'utils/app-constant';
import ActionButton from '../../ActionButton';
import CanvasLineTypeButton from '../../CanvasLineTypeButtons';
import { ColorPickerButton } from '../../ColorPickerButton';

export default function GameCanvasHorizontal() {
  const { currentElement, onSave } = useSessionContext();

  const [color, setColor] = useState(colors[5]);
  // TODO: add size picker modal
  // const [size, setSize] = useState(8);
  const size = 4;

  const isFinish = Boolean(currentElement?.finishAt);
  const sentence = currentElement?.parent?.text;

  return (
    <DrawingCanvasProvider color={color} lineSize={size}>
      <Box
        sx={{
          width: 1,
          height: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 2,
          pb: 0.5,
        }}>
        <ActionsWrapper>
          <CanvasLineTypeButton disabled={isFinish} spacing={0.65} />
          <OnUndoAction>
            <ActionButton ml={0} disabled={isFinish} title="CMD + Z">
              <UndoIcon />
            </ActionButton>
          </OnUndoAction>
          <OnClearAction>
            <ActionButton ml={0} disabled={isFinish} title="hotkey: C">
              <DeleteIcon />
            </ActionButton>
          </OnClearAction>
        </ActionsWrapper>
        <Box
          sx={{
            maxWidth: 460,
            display: 'flex',
            flexDirection: 'column',
            height: 1,
            pt: 1,
            justifyContent: 'space-between',
          }}>
          <Box
            sx={{
              backgroundColor: theme => alpha(theme.palette.primary.main, 0.8),
              boxShadow: theme => theme.shadows[2],
              display: 'flex',
              borderRadius: 32,
              alignItems: 'center',
              flexDirection: 'column',
              padding: 0.5,
            }}>
            <Typography
              sx={{ fontSize: 12 }}
              variant="subtitle1"
              color="textSecondary">
              Time to draw
            </Typography>
            {sentence && (
              <Typography
                sx={{ fontSize: '20px !important' }}
                variant="h4"
                color="textPrimary">
                {sentence}
              </Typography>
            )}
          </Box>
          <DrawingCanvas />
        </Box>
        <ActionsWrapper>
          <OnRedoAction>
            <ActionButton ml={0} disabled={isFinish} title="CMD + SHIFT + Z">
              <RedoIcon />
            </ActionButton>
          </OnRedoAction>
          <ColorPickerButton
            currentColor={color}
            onColorChange={setColor}
            isFinish={isFinish}
          />
          <OnSaveAction onSave={imageUrl => imageUrl && onSave(imageUrl)}>
            <ActionButton
              ml={0}
              color="primary"
              title={isFinish ? 'Edit' : 'Finish'}>
              {isFinish ? <EditIcon /> : <CheckIcon />}
            </ActionButton>
          </OnSaveAction>
        </ActionsWrapper>
      </Box>
    </DrawingCanvasProvider>
  );
}

function ActionsWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 1 }}>
      {children}
    </Box>
  );
}
