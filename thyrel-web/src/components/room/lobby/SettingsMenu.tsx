import { Box } from '@material-ui/core';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import RoomModeSelector from './room-mode/RoomModeSelector';
import ShareRoomButton from './ShareRoomButton';

export default function SettingsMenu() {
  const { room } = useRoomContext();
  const { player } = usePlayerContext();

  return (
    <Box
      minWidth={288}
      pl={2}
      pb={1}
      height={{ xs: 'auto', sm: '100%' }}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      gap={3}>
      <ShareRoomButton identifier={room?.identifier} player={player} />
      <RoomModeSelector />
    </Box>
  );
}
