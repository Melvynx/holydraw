import Loading from 'components/Loading';
import useMobileHorizontal from 'hooks/useMobileHorizontal';
import { lazy, Suspense } from 'react';

const WriteHorizontalLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "WriteHorizontal" */ 'components/room/write/WriteHorizontal'
    ),
);

const WriteVerticalLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "WriteVertical" */ 'components/room/write/WriteVertical'
    ),
);

export default function Write() {
  const isHorizontal = useMobileHorizontal();

  return (
    <Suspense fallback={<Loading />}>
      {isHorizontal ? <WriteHorizontalLazy /> : <WriteVerticalLazy />}
    </Suspense>
  );
}
