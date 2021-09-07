import { Box } from '@material-ui/system';
import PlayerCount from 'components/room/PlayerCount';
import StepTimer from 'components/room/StepTimer';
import { useSessionContext } from 'hooks/SessionProvider';

export default function HorizontalGameBar() {
  const { session } = useSessionContext();

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      position="absolute"
      top={8}
      px={2}
      width="100%">
      <Box width={{ xs: 32, sm: 64 }}>
        <PlayerCount
          count={session?.playerFinished || 0}
          max={session?.totalPlayers || 0}
        />
      </Box>

      <Box width={{ xs: 32, sm: 64 }}>
        <StepTimer
          finishAt={new Date(session?.stepFinishAt || '')}
          timeDuration={session?.timeDuration || 60}
        />
      </Box>
    </Box>
  );
}
