import { Box } from '@material-ui/core';
import GameCanvasHorizontal from './GameCanvasHorizontal';
import HorizontalGameBar from './HorizontalGameBar';

export default function DrawMobileHorizontal() {
  return (
    <Box position="relative" height={1}>
      <HorizontalGameBar />
      <GameCanvasHorizontal />
    </Box>
  );
}
