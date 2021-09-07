import { Box, ClickAwayListener, Theme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import React from 'react';
import CircleButton from './CircleButton';

type CircleBg = 'fill' | 'border' | 'none';

type CircleButtonsProps = {
  action: ({
    open,
    sx,
  }: {
    open: boolean;
    sx: SxProps<Theme>;
  }) => React.ReactElement;
  children: React.ReactElement[];
  width?: number;
  circleBg?: CircleBg;
  spacing?: number;
};

export default function CircleButtons({
  action,
  children,
  width = 48,
  circleBg = 'border',
  spacing = 1.2,
}: CircleButtonsProps) {
  const [open, setOpen] = React.useState(false);

  const actionComponent = action({
    open,
    sx: {
      position: 'absolute',
      width: width,
      height: width,
      top: 0,
      right: 0,
      zIndex: 2,
    },
  });

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box position="relative" width={width} height={width}>
        {React.cloneElement(actionComponent, {
          onClick: () => setOpen(prev => !prev),
        })}
        <Box
          position="absolute"
          sx={{
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            opacity: open ? '1' : '0',
            transition: 'all .05s ease-in-out',
            backgroundColor: theme =>
              circleBg === 'fill' ? theme.palette.background.paper : undefined,
            border: theme =>
              circleBg === 'border'
                ? `2px solid ${theme.palette.background.paper}`
                : undefined,
          }}
          borderRadius="50%"
          width={width * (spacing * 2)}
          height={width * (spacing * 2)}
        />
        {children.map((button, index) => (
          <CircleButton
            key={index}
            open={open}
            spacing={spacing}
            width={width}
            count={index + 1}
            onClick={() => setOpen(false)}
            max={children.length}>
            {button}
          </CircleButton>
        ))}
      </Box>
    </ClickAwayListener>
  );
}
