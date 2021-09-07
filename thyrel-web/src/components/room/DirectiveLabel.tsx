import { alpha, Box, Typography } from '@material-ui/core';

type DirectiveLabelProps = {
  directive: string;
  sentence?: string;
};

export default function DirectiveLabel({
  directive,
  sentence,
}: DirectiveLabelProps) {
  return (
    <Box
      sx={{
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.8),
        boxShadow: theme => theme.shadows[2],
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 32,
        padding: 1,
        display: 'flex',
        width: 1,
      }}>
      <Typography variant="subtitle1" color="textSecondary">
        {directive}
      </Typography>
      {sentence && (
        <Typography
          variant="h4"
          color="textPrimary"
          sx={{ textAlign: 'center' }}>
          {sentence}
        </Typography>
      )}
    </Box>
  );
}
