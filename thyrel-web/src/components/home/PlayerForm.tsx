import { useRandomUsername } from 'hooks/useRandomUsername';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { client } from 'api/client';
import { setToken } from 'api/player-provider';
import profilesPictures from 'images/profiles/profiles-pictures';
import Player from 'types/Player.type';
import BigButton from '../BigButton';
import BigInput from '../BigInput';
import ButtonModalJoin from './ButtonModalJoin';
import PlayerAvatar from './PlayerAvatar';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  marginButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function PlayerForm({ identifier }: { identifier?: string }) {
  const [username, setUsername] = React.useState('');
  const [ppIndex, setPpIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const defaultUsername = useRandomUsername();
  const classes = useStyles();

  const nextPp = () => {
    setPpIndex((p: number) => (p >= profilesPictures.length - 1 ? 0 : p + 1));
  };

  function onConnect(token: string, text: string, isSuccess: boolean = true) {
    enqueueSnackbar(text, { variant: 'success' });
    setToken(token);
    history?.push('/r/lobby');
  }

  function onCreate() {
    setLoading(true);
    client<Player>('room', {
      data: {
        username: username || defaultUsername,
        avatarUrl: String(ppIndex),
      },
    })
      .then(
        player => {
          if (player.token?.tokenKey)
            onConnect(player.token?.tokenKey, 'Room successfully created 🙌');
        },
        () =>
          enqueueSnackbar('Sorry, an error occured 😕 [Room-POST]', {
            variant: 'error',
          }),
      )
      .finally(() => setLoading(false));
  }

  function onJoin(identifier: string) {
    const catchedIdentifier = identifier.startsWith('http')
      ? identifier.split('/').pop()
      : identifier;
    setLoading(true);
    client<Player>(`room/join/${catchedIdentifier}`, {
      data: {
        username: username || defaultUsername,
        avatarUrl: String(ppIndex),
      },
      method: 'PATCH',
    })
      .then(
        player => {
          if (player.token?.tokenKey)
            onConnect(player.token?.tokenKey, "You've joined the room!");
        },
        () =>
          enqueueSnackbar('Sorry, an error occured 😕 [Room-PATCH]', {
            variant: 'error',
          }),
      )
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Grid item>
        <PlayerAvatar image={profilesPictures[ppIndex]} onShuffle={nextPp} />
      </Grid>

      <Grid item>
        <Box display="flex" flexDirection="column" mb={1} px={1} maxWidth={356}>
          <BigInput
            value={username}
            fullWidth
            onChange={e => setUsername(e.target.value)}
            placeholder={defaultUsername}
          />

          <Box display="flex" mt={2}>
            <ButtonModalJoin
              identifier={identifier}
              onClick={onJoin}
              loading={loading}
            />

            {!identifier && (
              <BigButton
                fullWidth
                className={classes.marginButton}
                color="primary"
                startIcon={<PlayArrowIcon style={{ fontSize: 32 }} />}
                onClick={onCreate}
                loading={loading}>
                Create
              </BigButton>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
}