import { Box, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { colorsMobile } from 'utils/app-constant';

type ColorPickerMobileModalProps = {
  open: boolean;
  currentColor: string;
  onColorChange?: (color: string) => void;
  onClose: () => void;
};

export default function ColorPickerMobileModal({
  currentColor,
  onColorChange,
  open,
  onClose,
}: ColorPickerMobileModalProps) {
  return (
    <Dialog fullScreen onClose={() => onClose()} open={open}>
      <Box
        display="flex"
        flexDirection="row"
        maxWidth="100%"
        justifyContent="center">
        <Box mt={2}>
          <Typography variant="h6">Choose a color</Typography>
          <IconButton
            sx={{
              position: 'absolute',
              right: theme => theme.spacing(1),
              top: theme => theme.spacing(1),
              margin: 0,
            }}
            onClick={() => onClose()}
            size="large">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          ml: 1,
          mr: 1,
          height: 1,
          placeContent: 'center',
          flexWrap: 'wrap',
          flexDirection: 'row',
          display: 'flex',
        }}>
        {colorsMobile.map(color => {
          const isSelected = color === currentColor;
          return (
            <Box
              component="button"
              key={color}
              onClick={() => {
                onColorChange?.(color);
                onClose();
              }}
              sx={{
                cursor: 'pointer',
                borderRadius: '50%',
                width: 50,
                height: 50,
                boxShadow: isSelected ? 4 : 0,
                backgroundColor: color,
                m: 0.5,
                border: 2,
                borderColor: isSelected ? '#ffffff' : color,
              }}
            />
          );
        })}
      </Box>
    </Dialog>
  );
}
