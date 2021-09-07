import { Box, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import BigButton from 'components/BigButton';
import BigInput from 'components/BigInput';
import { useRoomContext } from 'hooks/RoomProvider';
import { useSessionContext } from 'hooks/SessionProvider';
import { useRandomSentence } from 'hooks/useRandomSentence';
import { useTimerEvent } from 'hooks/useTimerInterval';
import React from 'react';
import { HolyElement } from 'types/HolyElement.type';
import { RoomMode } from 'types/Room.type';
import { SessionStepType } from 'types/Session.type';

export default function StartForm() {
  const { session, currentElement, onSave } = useSessionContext();
  const [sentence, setSentence] = React.useState(currentElement?.text || '');
  const [loading, setLoading] = React.useState(false);
  const { room } = useRoomContext();

  const isOneWord = room?.mode === RoomMode.OneWord;
  const defaultSentence = useRandomSentence(isOneWord);

  const isEditing = Boolean(!currentElement?.finishAt);
  const saveSentence = sentence || defaultSentence;

  function handleChange(event: any) {
    const value: string = event.target.value;
    if (isOneWord) {
      if (value.length <= 20) {
        setSentence(value.trim());
      }
    }
    setSentence(value);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (loading || event.key !== 'Enter') return;
    setLoading(true);
    onSave(saveSentence).then(() => setLoading(false));
  }

  useTimerEvent({
    finishAt: new Date(session?.stepFinishAt || ''),
    timeDuration: session?.timeDuration || 60,
    onFinish: () => {
      client<HolyElement>(`element/auto/${currentElement?.id}`, {
        token: getToken(),
        method: 'PATCH',
        data: { text: saveSentence },
      });
    },
    onFinishPercentage: 98,
  });

  React.useEffect(() => {
    if (!currentElement?.text) return;
    setSentence(currentElement?.text);
  }, [currentElement]);

  return (
    <>
      <Grid item className="full-width">
        <Box
          display="flex"
          width="100%"
          flexDirection={{ xs: 'column', sm: 'row' }}>
          <BigInput
            fullWidth
            disabled={!isEditing}
            placeholder={
              session?.stepType === SessionStepType.Start
                ? defaultSentence
                : 'Your description!'
            }
            value={sentence}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />

          <BigButton
            sx={{
              marginLeft: { xs: 0, sm: 1 },
              fontSize: 28,
              marginTop: { xs: 1, sm: 0 },
              width: { xs: '100%', sm: 'auto' },
            }}
            color="primary"
            loading={loading}
            onClick={() => {
              setLoading(true);
              onSave(saveSentence).then(() => setLoading(false));
            }}
            startIcon={
              isEditing ? (
                <SaveIcon style={{ fontSize: 28 }} />
              ) : (
                <EditIcon style={{ fontSize: 28 }} />
              )
            }>
            {isEditing ? 'Save' : 'Edit'}
          </BigButton>
        </Box>
      </Grid>
    </>
  );
}
