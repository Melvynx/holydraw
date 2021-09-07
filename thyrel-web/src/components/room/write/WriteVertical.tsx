import { Box, Grid } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';
import CurrentDrawImage from '../CurrentDrawImage';
import DirectiveLabel from '../DirectiveLabel';
import GameLayout from '../GameLayout';
import StartForm from '../start/SentenceForm';

export default function WriteVertical() {
  return (
    <GameLayout>
      <Box
        sx={{
          maxWidth: 600,
          alignItems: 'center',
          height: '100%',
        }}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          className="full-height"
          justifyContent="center">
          <Grid item className="full-width">
            <DirectiveLabel directive="Describe this scene" />
          </Grid>
          <Grid item className="full-width">
            <CurrentDrawImageWithContext />
          </Grid>
          <StartFormLoading />
        </Grid>
      </Box>
    </GameLayout>
  );
}

function CurrentDrawImageWithContext() {
  const { currentElement } = useSessionContext();
  return (
    <CurrentDrawImage
      src={currentElement?.parent.drawImage}
      sx={{
        '& > img': {
          width: '100%',
          height: 'auto',
          minHeight: { xs: 0, sm: 320 },
        },
      }}
    />
  );
}

function StartFormLoading() {
  const { currentElement } = useSessionContext();
  if (!currentElement) return null;

  return <StartForm />;
}
