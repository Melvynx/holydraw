import { Box, Container } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles';
import GameBar from 'components/GameBar';
import { useSessionContext } from 'hooks/SessionProvider';
import React from 'react';
import StepProgress from './StepProgress';

type GameLayoutProps = {
  maxWidth?: Breakpoint;
  children: React.ReactElement | React.ReactElement[];
};

export default function GameLayout({
  maxWidth = 'sm',
  children,
}: GameLayoutProps) {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <GameBar />
      <Container maxWidth={maxWidth} className="full-height">
        {children}
      </Container>
      <StepProgressWithContext />
    </Box>
  );
}

const StepProgressWithContext = () => {
  const { session } = useSessionContext();

  return (
    <StepProgress
      stepActual={session?.actualStep}
      stepMax={session?.totalPlayers}
    />
  );
};
