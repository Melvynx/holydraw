import { alpha, InputBase, InputBaseProps, Theme } from '@material-ui/core';
import { Box } from '@material-ui/system';
import clsx from 'clsx';
import React from 'react';
import MediaqueryHeight from 'styles/breakpoint';

type Variant = 'medium' | 'large';

type BigInputProps = {
  startIcon?: React.ReactElement;
  variant?: Variant;
  fullWidth?: boolean;
} & InputBaseProps;

export default function BigInput({
  disabled,
  variant = 'medium',
  startIcon,
  fullWidth,
  ...props
}: BigInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const inputSx =
    variant === 'medium'
      ? {
          fontSize: { xs: 26, sm: 28 },
          height: { xs: 32, sm: 36 },
        }
      : {
          fontSize: { xs: 32, sm: 36 },
          height: { xs: 38, sm: 40 },
        };

  return (
    <Box
      sx={{
        display: 'flex',
        padding: variant === 'medium' ? '16px 20px' : '20px 20px',
        backgroundColor: theme =>
          disabled ? '#15181F' : theme.palette.background.paper,
        cursor: disabled ? 'not-allowed' : 'text',
        border: theme =>
          disabled
            ? `2px solid ${alpha(theme.palette.primary.main, 0.6)}`
            : `2px solid ${theme.palette.primary.main}`,
        borderRadius: variant === 'medium' ? 34 : 38,
        alignItems: 'center',
        transition: 'box-shadow ease-in .2s',
        boxShadow: 2,
        [MediaqueryHeight.SM]: {
          padding: '12px 20px',
        },
        '&:focus-within': {
          boxShadow: theme =>
            `0 0 2px 0.2rem ${alpha(theme.palette.primary.main, 0.4)}`,
        },
      }}
      className={clsx({ 'full-width': fullWidth })}
      onClick={() => inputRef.current?.focus()}>
      {startIcon &&
        React.cloneElement(startIcon, {
          sx:
            variant === 'medium'
              ? {
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                  marginRight: { xs: 1.5, sm: 2 },
                  color: (theme: Theme) =>
                    disabled
                      ? theme.palette.text.disabled
                      : theme.palette.text.primary,
                }
              : {
                  width: { xs: 38, sm: 40 },
                  height: { xs: 38, sm: 40 },
                  marginRight: { xs: 1.5, sm: 2 },
                  color: (theme: Theme) =>
                    disabled
                      ? theme.palette.text.disabled
                      : theme.palette.text.primary,
                },
          'data-testid': 'biginput-icon',
        })}
      <InputBase
        ref={inputRef}
        sx={{
          backgroundColor: 'inherit',
          border: 'none',
          width: '100%',
          fontFamily: 'Work Sans',
          color: theme => theme.palette.text.primary,
          cursor: 'inherit',
          ...inputSx,
        }}
        className={clsx('big-input-safari')}
        disabled={disabled}
        {...props}
      />
    </Box>
  );
}
