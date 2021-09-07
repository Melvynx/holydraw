import { Box, Container } from '@material-ui/core';
import React from 'react';
import MediaqueryHeight from 'styles/breakpoint';

type AppLayoutProps = {
  children?: React.ReactElement | React.ReactElement[];
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container
      sx={{
        padding: 0,
        height: '100%',
        maxWidth: theme => `calc(${theme.breakpoints.values.lg}px - 128px)`,
      }}
      maxWidth="lg">
      <Box
        sx={{
          display: 'block',
          margin: 'auto',
          height: 1,
          width: 1,
          pb: { xs: 0, sm: 2 },
          minWidth: 320,
          [MediaqueryHeight.SM]: {
            pb: 0,
          },
        }}>
        {children}
      </Box>
    </Container>
  );
}
