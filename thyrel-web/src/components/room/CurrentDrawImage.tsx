import { Box } from '@material-ui/core';
import { SxProps, Theme } from '@material-ui/system';

type CurrentDrawImageProps = {
  sx?: SxProps<Theme>;
  src?: string;
};

export default function CurrentDrawImage({ sx, src }: CurrentDrawImageProps) {
  return (
    <Box
      sx={{
        border: theme => `4px solid ${theme.palette.default.main}`,
        bgcolor: 'common.white',
        borderRadius: 8,
        boxShadow: 1,
        display: 'flex',
        overflow: 'hidden',
        ...sx,
      }}>
      <img src={src} alt="" />
    </Box>
  );
}

/*

        border: theme => `4px solid ${theme.palette.default.main}`,
        bgcolor: theme => theme.palette.common.white,
        borderRadius: '32px',
        boxSadow: 1,
        display: 'flex',
        ...sx,
*/
