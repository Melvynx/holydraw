import { AlertColor, Box, IconButton } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import { useWebsocketContext } from 'hooks/WebsocketProvider';
import React from 'react';
import { WsStates } from 'types/websocket.types';
import SignalCellularConnectedNoInternet0BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet0Bar';
import SignalCellularConnectedNoInternet2BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet2Bar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function getSeverity(state: WsStates): AlertColor {
  switch (state) {
    case WsStates.CLOSED:
      return 'error';
    case WsStates.CONNECTING:
      return 'info';
    case WsStates.CONNECTED:
      return 'success';
    case WsStates.IDLE:
      return 'info';
  }
}

function getIcon(state: WsStates) {
  switch (state) {
    case WsStates.CLOSED:
      return <SignalCellularConnectedNoInternet0BarIcon />;
    case WsStates.CONNECTING:
      return <SignalCellularConnectedNoInternet2BarIcon />;
    case WsStates.CONNECTED:
      return <CheckCircleIcon />;
    case WsStates.IDLE:
      return <SignalCellularConnectedNoInternet2BarIcon />;
  }
}

export default function WebsocketStateDebug() {
  const [show, setShow] = React.useState(false);
  const { wsState } = useWebsocketContext();

  return (
    <Box position="absolute" bottom={0} right={0}>
      {show ? (
        <Alert
          onClose={() => setShow(false)}
          variant="filled"
          elevation={4}
          severity={getSeverity(wsState)}>
          WS: {wsState}
        </Alert>
      ) : (
        <IconButton size="small" onClick={() => setShow(true)}>
          {getIcon(wsState)}
        </IconButton>
      )}
    </Box>
  );
}
