import { css } from '@emotion/css';
import {
  IconButton,
  IconButtonProps,
  Tooltip,
  useTheme,
} from '@material-ui/core';
import React from 'react';

type ActionButtonProps = {
  children: React.ReactElement;
  title?: string;
  color?: 'primary' | 'default';
  ml?: number;
  className?: string;
} & IconButtonProps;

export default function ActionButton({
  children,
  title,
  color = 'default',
  ml = 1,
  className,
  disabled,
  sx,
  ...props
}: ActionButtonProps) {
  const theme = useTheme();

  return (
    <IconButton
      color={color}
      disabled={disabled}
      sx={{
        color: theme => theme.palette.common.white,
        backgroundColor: theme =>
          color === 'primary'
            ? theme.palette.primary.main
            : theme.palette.default.main,
        marginLeft: ml,
        '&:hover': {
          backgroundColor: theme =>
            color === 'primary' ? theme.palette.primary.dark : undefined,
        },
        ...sx,
      }}
      className={className}
      size="large"
      {...props}>
      {title ? (
        <Tooltip title={title}>
          {React.cloneElement(children, {
            className: css({
              color: disabled
                ? theme.palette.text.secondary
                : theme.palette.text.primary,
            }),
          })}
        </Tooltip>
      ) : (
        React.cloneElement(children, {
          className: css({
            color: disabled
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          }),
        })
      )}
    </IconButton>
  );
}
