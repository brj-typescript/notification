'use client';

import { ReactNode } from 'react';
import { Color } from '@brj-typescript/global-context';
import { Box } from '@mui/material';

export const renderFlashMessageDetail = (content: string | ReactNode, detail: ReactNode | undefined = undefined) => (
  <Box>
    <Box sx={{ paddingBottom: '0.5em' }}>{content}</Box>
    <Box
      sx={{
        backgroundColor: Color.warningBackground,
        color: Color.white,
        padding: '1em',
        paddingTop: 0,
        borderRadius: '0.5em',
        position: 'relative',
        left: '-2em',
      }}
    >
      {detail}
    </Box>
  </Box>
);
