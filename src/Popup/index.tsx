'use client';

import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { InternalNotification } from '../types';

type PopupDialogProps = InternalNotification & { onClose: (id: string) => void };

export const Popup: FC<PopupDialogProps> = ({
  id,
  open,
  content,
  title,
  onClose,
  actions,
  dataElms,
  maxWidth = 'sm',
}) => (
  <Dialog open={open} onClose={() => onClose(id)} maxWidth={maxWidth} fullWidth data-elm={dataElms?.dialogElm}>
    {title && (
      <DialogTitle sx={{ marginBottom: '.5em' }} data-elm={dataElms?.titleElm}>
        {title}
      </DialogTitle>
    )}
    {content}
    {actions && (
      <DialogActions sx={{ paddingRight: '1.8em' }}>
        {actions.map((action) => (
          <Button
            key={action.label}
            onClick={action.callback}
            startIcon={action.icon}
            data-elm={dataElms?.actionsElms?.get(action.label)}
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    )}
  </Dialog>
);
