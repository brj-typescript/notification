import { Box, Stack } from '@mui/material';
import { NotificationType, NotificationVariant } from '../types';
import { ReactNode } from 'react';
import { Color } from '@brj-typescript/global-context';
import { FlashMessageItem } from './FlashMessageItem';
import { useNotification } from '../useNotification';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

export const variants: Record<NotificationVariant, { icon: ReactNode; background: Color; color?: Color }> = {
  [NotificationVariant.Success]: { icon: <CheckCircleIcon />, background: Color.prideGreen },
  [NotificationVariant.Error]: { icon: <ErrorIcon />, background: Color.prideRed, color: Color.white },
  [NotificationVariant.Warning]: { icon: <WarningIcon />, background: Color.prideOrange },
  [NotificationVariant.Info]: { icon: <InfoIcon />, background: Color.prideBlue, color: Color.white },
  [NotificationVariant.Internal]: { icon: <InfoIcon />, background: Color.pridePurple, color: Color.white },
};

export const FlashMessage = () => {
  const { getFilteredQueue } = useNotification();

  return (
    <Box sx={{ position: 'fixed', left: '2.5em', bottom: '9em', zIndex: 1000, width: '350px' }}>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {getFilteredQueue(NotificationType.FlashMessage).map((flashMessage) => (
          <FlashMessageItem flashMessage={flashMessage} key={flashMessage.id}/>
        ))}
      </Stack>
    </Box>
  );
};
