import { Box, IconButton, Stack } from '@mui/material';
import { NotificationType, NotificationVariant } from '../types';
import { ReactNode } from 'react';
import { Color } from '@brj-typescript/global-context';
import { FadeOutAnimation } from './FadeOutAnimation';
import { useNotification } from '../useNotification';
import CloseIcon from '@mui/icons-material/Close';
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
  const { closeNotification } = useNotification();
  const { getFilteredQueue, runAnimation } = useNotification();

  return (
    <Box sx={{ position: 'fixed', left: '2.5em', bottom: '9em', zIndex: 1000, width: '350px' }}>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {getFilteredQueue(NotificationType.FlashMessage).map((flashMessage) => (
          <FadeOutAnimation duration="1" start={Boolean(flashMessage.isAnimationRunning)} key={flashMessage.id}>
            <Box
              sx={{
                background: variants[flashMessage.variant].background,
                color: variants[flashMessage.variant].color ?? Color.black,
                padding: '.75em',
                display: 'flex',
                borderRadius: '.75em',
              }}
              data-elm={flashMessage.tag}
            >
              <Box sx={{ width: '3em' }}>{variants[flashMessage.variant].icon}</Box>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Box>{flashMessage.content}</Box>
              </Box>
              <Box sx={{ width: '2.5em', textAlign: 'right' }}>
                <IconButton
                  onClick={() => {
                    runAnimation(flashMessage.id);
                    setTimeout(() => closeNotification(flashMessage.id), 1000);
                  }}
                >
                  <CloseIcon sx={{ height: '.75em' }} />
                </IconButton>
              </Box>
            </Box>
          </FadeOutAnimation>
        ))}
      </Stack>
    </Box>
  );
};
