import { Box } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';
import PlayerCount from './room/PlayerCount';
import StepTimer from './room/StepTimer';
import MediaqueryHeight from 'styles/breakpoint';

type GameBarProps = {
  onFinish?: () => void;
};

export default function GameBar({ onFinish }: GameBarProps) {
  const { session } = useSessionContext();
  return (
    <Box
      sx={{
        width: 1,
        justifyContent: 'space-between',
        px: { xs: 2, sm: 4 },
        p: 1,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        [MediaqueryHeight.SM]: {
          position: 'absolute',
        },
      }}>
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
          onFinish={onFinish}
        />
      </Box>
    </Box>
  );
}
