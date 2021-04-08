import { Box, Grid, makeStyles } from '@material-ui/core';
import StartForm from 'components/room/start/SentenceForm';
import DirectiveLabel from 'components/room/DirectiveLabel';
import GameLayout from 'components/room/GameLayout';
import CurrentDrawImage from 'components/room/CurrentDrawImage';
import { useSessionContext } from 'hooks/SessionProvider';

const useStyles = makeStyles(theme => ({
  width: {
    width: 512,
    height: 'auto',
    minHeight: 320,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

export default function Write() {
  const classes = useStyles();
  return (
    <GameLayout>
      <Box maxWidth={520}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          className="full-height"
          wrap="nowrap"
          justify="center">
          <Grid item className="full-width">
            <DirectiveLabel directive="Describe this scene" />
          </Grid>
          <Grid item>
            <CurrentDrawImageWithContext className={classes.width} />
          </Grid>
          <StartForm />
        </Grid>
      </Box>
    </GameLayout>
  );
}

export function CurrentDrawImageWithContext({
  className,
}: {
  className: string;
}) {
  const { currentElement } = useSessionContext();
  return (
    <CurrentDrawImage
      src={currentElement?.parent.drawImage}
      className={className}
    />
  );
}
