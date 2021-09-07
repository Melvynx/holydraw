import {
  createTheme,
  PaletteOptions,
  responsiveFontSizes,
} from '@material-ui/core';
import MediaqueryHeight from 'styles/breakpoint';

export const PRIMARY = '#880061';
export const SECONDARY = '#DB39F8';

const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: PRIMARY,
  },
  secondary: {
    main: SECONDARY,
  },
  background: {
    default: '#0f131a',
    paper: '#1a1d24',
  },
  default: {
    hover: '#22262c',
    main: '#272b31',
  },
};

function createBaseTheme() {
  return createTheme({
    palette: palette,
    typography: {
      h1: {
        fontSize: 64,
        fontFamily: 'Modak',
      },
      h4: {
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 32,
      },
      h5: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, Segoe UI',
      },
      subtitle1: {
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 16,
      },
      subtitle2: {
        fontSize: 12,
      },
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
      },
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Open Sans',
        'Helvetica Neue',
        'sans-serif',
      ].join(','),
    },
    spacing: 8,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 32,
            background: '#1a1d24',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 32,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          sizeLarge: {
            height: 68,
            minWidth: 128,
            fontSize: 20,
            color: palette.common?.white,
            padding: '16px 24px',
            borderRadius: 34,
            fontFamily: 'Work Sans',
            position: 'relative',
            '@media (min-width: 600px)': {
              fontSize: 28,
              height: 72,
            },
            [MediaqueryHeight.SM]: {
              height: 64,
            },
            '&:hover': {
              backgroundColor: palette.action?.hover,
            },
          },
          containedSizeSmall: {
            fontSize: 18,
            height: 38,
            borderRadius: 20,
            '@media (min-width: 600px)': {
              fontSize: 20,
              height: 42,
              padding: '8px 16px',
              borderRadius: 22,
            },
          },
          iconSizeLarge: {
            marginLeft: 0,
          },
        },
      },
    },
  });
}

type DefaultColor = {
  main: string;
  hover: string;
};

declare module '@material-ui/core' {
  interface Palette {
    default: DefaultColor;
  }

  interface PaletteOptions {
    default: DefaultColor;
  }
}

const theme = responsiveFontSizes(createBaseTheme());

export default theme;
