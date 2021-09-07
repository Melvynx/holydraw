import { useState } from 'react';
import ColorPickerMobileModal from './ColorPickerMobileModal';
import ActionButton from './ActionButton';
import PaletteIcon from '@material-ui/icons/Palette';

export function ColorPickerButton({
  isFinish,
  currentColor,
  onColorChange,
}: {
  isFinish: boolean;
  currentColor: string;
  onColorChange: (color: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ActionButton ml={0} disabled={isFinish} onClick={() => setOpen(p => !p)}>
        <PaletteIcon />
      </ActionButton>
      <ColorPickerMobileModal
        open={open}
        onClose={() => setOpen(false)}
        currentColor={currentColor}
        onColorChange={color => onColorChange(color)}
      />
    </>
  );
}
