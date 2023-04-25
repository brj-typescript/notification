import { InternalNotification } from '../types';
import { Box, IconButton } from '@mui/material';
import { variants } from './index';
import { FadeOutAnimation } from './FadeOutAnimation';
import { useNotification } from '../useNotification';
import { FC, useState } from 'react';
import { Color } from '@brj-typescript/global-context';
import CloseIcon from '@mui/icons-material/Close';

export const FlashMessageItem: FC<{ flashMessage: InternalNotification }> = ({ flashMessage }) => {
  const { closeNotification } = useNotification();
  const [isAnimationRunning, runAnimation] = useState(false);
  const variant = variants[flashMessage.variant];

  return (
    <FadeOutAnimation duration="1" start={isAnimationRunning} key={flashMessage.id}>
      <Box
        sx={{
          background: variant.background,
          color: variant.color ?? Color.black,
          padding: '.75em',
          display: 'flex',
          borderRadius: '.75em',
        }}
        data-elm={flashMessage.tag}
      >
        <Box sx={{ width: '3em' }}>{variant.icon}</Box>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Box>{flashMessage.content}</Box>
        </Box>
        <Box sx={{ width: '2.5em', textAlign: 'right' }}>
          <IconButton
            onClick={() => {
              runAnimation(true);
              setTimeout(() => closeNotification(flashMessage.id), 1000);
            }}
          >
            <CloseIcon sx={{ height: '.75em' }} />
          </IconButton>
        </Box>
      </Box>
    </FadeOutAnimation>
  );
};
