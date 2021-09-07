import AppLayout from 'components/AppLayout';
import Loading from 'components/Loading';
import { PlayerContextProvider } from 'hooks/PlayerProvider';
import { RoomContextProvider } from 'hooks/RoomProvider';
import { SessionContextProvider } from 'hooks/SessionProvider';
import { WebsocketProvider } from 'hooks/WebsocketProvider';
import ComponentTest from 'pages/ComponentTest';
import DevNav from 'pages/DevNav';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, RouteProps, Switch } from 'react-router-dom';

const HomeLazy = lazy(
  () => import(/* webpackChunkName: "Home" */ 'pages/Home'),
);
const LobbyLazy = lazy(
  () => import(/* webpackChunkName: "Lobby" */ 'pages/room/Lobby'),
);
const BookLazy = lazy(
  () => import(/* webpackChunkName: "Book" */ 'pages/room/Book'),
);
const DrawLazy = lazy(
  () => import(/* webpackChunkName: "Draw" */ 'pages/room/Draw'),
);
const StartLazy = lazy(
  () => import(/* webpackChunkName: "Start" */ 'pages/room/Start'),
);
const WriteLazy = lazy(
  () => import(/* webpackChunkName: "Write" */ 'pages/room/Write'),
);

export default function Routes() {
  return (
    <AppLayout>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            {/* Test routes */}
            <OnlyForDevRoute path="/t" component={ComponentTest} />
            <OnlyForDevRoute path="/t" component={DevNav} />
            <OnlyForDevRoute path="/start" component={StartLazy} />
            <OnlyForDevRoute path="/draw" component={DrawLazy} />
            <OnlyForDevRoute path="/write" component={WriteLazy} />

            {/* Game routes */}
            <Route path="/join/:identifier" component={HomeLazy} />
            <Route path="/home" component={HomeLazy} />
            <Route path="/room" component={RoomRoutes} />
            <Route path="/" component={HomeLazy} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AppLayout>
  );
}

function RoomRoutes() {
  return (
    <WebsocketProvider>
      <PlayerContextProvider>
        <RoomContextProvider>
          <Switch>
            <Route path="/room/lobby" component={LobbyLazy} />
            <Route path="/room" component={SessionRoutes} />
          </Switch>
        </RoomContextProvider>
      </PlayerContextProvider>
    </WebsocketProvider>
  );
}

function SessionRoutes() {
  return (
    <SessionContextProvider>
      <Switch>
        <Route path="/room/start" component={StartLazy} />
        <Route path="/room/draw" component={DrawLazy} />
        <Route path="/room/write" component={WriteLazy} />
        <Route path="/room/book" component={BookLazy} />
        <Route path="/room/lobby" component={LobbyLazy} />
      </Switch>
    </SessionContextProvider>
  );
}

function OnlyForDevRoute(props: RouteProps) {
  return process.env.NODE_ENV === 'development' ? <Route {...props} /> : null;
}
