import { Alert, Box } from '@material-ui/core';
import DirectiveLabel from 'components/room/DirectiveLabel';
import { useDisableBodyOverflow } from 'components/room/draw/useDisableBodyOverflow';
import GameLayout from 'components/room/GameLayout';
import { useSessionContext } from 'hooks/SessionProvider';
import { useState } from 'react';
import GameCanvasVertical from '../../GameCanvasVertical';

export default function DrawMobileVertical() {
  useDisableBodyOverflow();

  return (
    <GameLayout maxWidth="md">
      <Box
        width={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        height={1}
        gap={2}>
        <Box width={1}>
          <CurrentDirectiveLabel />
          <DismissAlert />
        </Box>

        <Box
          display="flex"
          width="100%"
          height={1}
          justifyContent="center"
          flexDirection="column"
          gap={2}>
          <GameCanvasVertical />
        </Box>
      </Box>
    </GameLayout>
  );
}

function CurrentDirectiveLabel() {
  const { currentElement } = useSessionContext();
  return (
    <DirectiveLabel
      directive="Time to Draw"
      sentence={currentElement?.parent?.text}
    />
  );
}

function DismissAlert() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <Alert
      sx={{ borderRadius: 32, mt: 1 }}
      color="warning"
      onClose={() => setOpen(false)}>
      For better experience, please turn your phone on horizontal.
    </Alert>
  );
}
