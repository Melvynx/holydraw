import { Box } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import {
  OnClearAction,
  OnRedoAction,
  OnSaveAction,
  OnUndoAction,
} from 'components/canvas/DrawingCanvasActions';
import React from 'react';
import ActionButton from '../ActionButton';
import CanvasLineTypeButton from '../CanvasLineTypeButtons';

type CanvasActionButtonsProps = {
  onSave: (image?: string) => void;
  isFinish?: boolean;
};

export default function DesktopCanvasActionButtons({
  onSave,
  isFinish,
}: CanvasActionButtonsProps) {
  return (
    <Box
      mt={2}
      minHeight={80}
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between">
      <CanvasLineTypeButton disabled={isFinish} />
      <Box display="flex" alignItems="center">
        <OnClearAction>
          <ActionButton disabled={isFinish} title="hotkey: C">
            <DeleteIcon />
          </ActionButton>
        </OnClearAction>
        <OnUndoAction>
          <ActionButton disabled={isFinish} title="CMD + Z">
            <UndoIcon />
          </ActionButton>
        </OnUndoAction>
        <OnRedoAction>
          <ActionButton disabled={isFinish} title="CMD + SHIFT + Z">
            <RedoIcon />
          </ActionButton>
        </OnRedoAction>
        <OnSaveAction onSave={onSave}>
          <ActionButton color="primary" title={isFinish ? 'Edit' : 'Finish'}>
            {isFinish ? <EditIcon /> : <CheckIcon />}
          </ActionButton>
        </OnSaveAction>
      </Box>
    </Box>
  );
}
