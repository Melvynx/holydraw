import { Box } from '@material-ui/core';
import useCss from 'hooks/useCss';
import useMobileHorizontal from 'hooks/useMobileHorizontal';
import HolyDrawImage from 'images/holydraw-logo.svg';
import MediaqueryHeight from 'styles/breakpoint';

export default function HolyDrawLogo({ width = 24 }: { width?: number }) {
  const isHorizontal = useMobileHorizontal();
  if (isHorizontal) {
    width = 16;
  }
  const imgClass = useCss(theme => ({
    textAlign: 'center',
    width: ((width * 8) / 3) * 2,
    height: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: width * 8,
    },
    [MediaqueryHeight.SM]: {
      width: ((width * 8) / 3) * 2,
    },
  }));

  if (isHorizontal) {
    return (
      <Box position="absolute" top={2} left={8}>
        <img src={HolyDrawImage} className={imgClass} alt="holy draw logo" />
      </Box>
    );
  }

  return <img src={HolyDrawImage} className={imgClass} alt="holy draw logo" />;
}
