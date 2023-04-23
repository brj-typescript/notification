import { Box } from '@mui/material';
import { NotificationType } from '../types';
import { useNotification } from '../useNotification';
import { Alert } from './index';

export const AlertContainer = () => {
  const { getFilteredQueue } = useNotification();
  const queue = getFilteredQueue(NotificationType.Alert);

  return (
    <>
      {queue.length > 0 && (
        <Box sx={{ mx: 4 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: '.5em', margin: '15px 0' }}>
            {queue.map((alert) => (
              <Box key={alert.id} sx={{ flex: '1 1 33.333%', mb: 1 }}>
                <Alert alert={alert} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};
