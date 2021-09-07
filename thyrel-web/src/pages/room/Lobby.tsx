import { Box } from '@material-ui/core';
import HolyDrawLogo from 'components/HolyDrawLogo';
import LobbyStartButton from 'components/room/lobby/LobbyStartAction';
import { PlayerCountBox, Players } from 'components/room/lobby/Players';
import SettingsMenu from 'components/room/lobby/SettingsMenu';

export default function Lobby() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      pb={2}>
      <Box mb={2} width="100%" display="flex" justifyContent="center">
        <HolyDrawLogo width={22} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="background.paper"
        maxWidth={656}
        borderRadius="16px"
        maxHeight={384}
        height={{ sm: '100%' }}
        py={1}
        px={2}
        alignItems="flex-end"
        width="100%">
        <PlayerCountBox />
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          height={{ sm: '100%' }}
          sx={{
            alignItems: { xs: 'center', sm: 'flex-start' },
            flexDirection: { xs: 'column', sm: 'row' },
          }}>
          <SettingsMenu />
          <Players />
        </Box>
      </Box>
      <LobbyStartButton />
    </Box>
  );
}
