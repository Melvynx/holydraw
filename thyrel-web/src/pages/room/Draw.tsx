import { useMediaQuery } from '@material-ui/core';
import Loading from 'components/Loading';
import { useDisableBodyOverflow } from 'components/room/draw/useDisableBodyOverflow';
import useMobileHorizontal from 'hooks/useMobileHorizontal';
import { lazy, Suspense } from 'react';
import theme from 'theme';

const DrawDesktopLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "DrawDesktop" */ 'components/room/draw/desktop/DrawDesktop'
    ),
);
const DrawMobileVerticalLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "DrawMobileVertical" */ 'components/room/draw/mobile/vertical/DrawMobileVertical'
    ),
);
const DrawMobileHorizontalLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "DrawMobileHorizontal" */ 'components/room/draw/mobile/horizontal/DrawMobileHorizontal'
    ),
);

export default function Draw() {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  useDisableBodyOverflow();

  return (
    <Suspense fallback={<Loading />}>
      {isDesktop ? <DrawDesktopLazy /> : <DrawMobile />}
    </Suspense>
  );
}

function DrawMobile() {
  const isHorizontal = useMobileHorizontal();

  if (isHorizontal) {
    return <DrawMobileHorizontalLazy />;
  }
  return <DrawMobileVerticalLazy />;
}
