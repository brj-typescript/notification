'use client';

import { NotificationType } from '../types';
import { useNotification } from '../useNotification';
import { Popup } from './index';

export const PopupContainer = () => {
  const { closeActivePopup, closeNotification } = useNotification();
  const { getFilteredQueue } = useNotification();

  return (
    <>
      {getFilteredQueue(NotificationType.Popup).map((popup) => (
        <Popup
          key={popup.id}
          {...popup}
          onClose={(id: string | undefined = undefined) => {
            id ? closeNotification(id) : closeActivePopup();
          }}
          actions={popup.actions}
          dataElms={popup.dataElms}
        />
      ))}
    </>
  );
};
