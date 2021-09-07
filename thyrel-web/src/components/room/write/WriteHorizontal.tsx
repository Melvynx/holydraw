import { Box } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';
import React from 'react';
import CurrentDrawImage from '../CurrentDrawImage';
import DirectiveLabel from '../DirectiveLabel';
import HorizontalGameBar from '../draw/mobile/horizontal/HorizontalGameBar';
import StartForm from '../start/SentenceForm';

export default function WriteHorizontal() {
  const { currentElement } = useSessionContext();
  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <HorizontalGameBar />
      <Box
        sx={{
          maxWidth: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          my: 1,
        }}>
        <DirectiveLabel directive="Describe the scene" />
        <CurrentDrawImage
          src={currentElement?.parent.drawImage}
          sx={{
            '& > img': {
              width: '100%',
              height: 'auto',
            },
          }}
        />
        {currentElement && <StartForm />}
      </Box>
    </Box>
  );
}
