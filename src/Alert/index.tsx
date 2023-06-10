'use client';

import { InternalNotification, NotificationVariant } from '../types';
import { FC, ReactElement } from 'react';
import { Color } from '@brj-typescript/global-context';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

const variants: Record<NotificationVariant, { icon: ReactElement; borderColor: Color }> = {
  [NotificationVariant.Success]: { icon: <CheckCircleIcon />, borderColor: Color.prideGreen },
  [NotificationVariant.Error]: { icon: <ErrorIcon />, borderColor: Color.prideRed },
  [NotificationVariant.Warning]: { icon: <WarningIcon />, borderColor: Color.prideOrange },
  [NotificationVariant.Info]: { icon: <InfoIcon />, borderColor: Color.prideBlue },
  [NotificationVariant.Internal]: { icon: <InfoIcon />, borderColor: Color.pridePurple },
};

export const Alert: FC<{ alert: InternalNotification }> = ({ alert }) => (
  <Box
    key={alert.id}
    data-elm={alert.dataElm}
    sx={{
      display: 'flex',
      borderLeft: `8px solid ${variants[alert.variant].borderColor}`,
      borderRadius: '8px',
      background: Color.white,
      color: Color.black,
      padding: '.75em',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center' }}>{variants[alert.variant].icon}</Box>
    <Box sx={{ marginLeft: '1em', display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box>{alert.content}</Box>
    </Box>
  </Box>
);
