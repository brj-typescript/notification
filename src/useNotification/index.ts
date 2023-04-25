import {
  IgnorableTagsLocalStorageKey,
  InternalNotification,
  Notification,
  NotificationQueue,
  NotificationType,
  NotificationVariant,
} from '../types';
import { getLocalStorageIgnorableTags } from '../core/getLocalStorageIgnorableTags';
import { renderFlashMessageDetail } from './renderFlashMessageDetail';
import { isNotificationIgnored } from '../core/isNotificationIgnored';
import { isFreshNotification } from '../core/isFreshNotification';
import { resolveIgnorableTag } from '../core/resolveIgnorableTag';
import { useShareObject } from '@brj-typescript/global-context';
import { uuid } from "@brj-typescript/system";
import { ReactNode } from 'react';

export const useNotification = () => {
  const { getStorage, setStorage } = useShareObject();

  const getState = (): NotificationQueue =>
    getStorage<NotificationQueue>('notification', { items: [], ignorableTags: [] });

  const setState = (state: NotificationQueue) => setStorage<NotificationQueue>('notification', state);

  const createPopup = (configuration: Notification) => createNotification(configuration, NotificationType.Popup);

  const createFlashMessage = (configuration: Notification) =>
    createNotification(configuration, NotificationType.FlashMessage);

  const createFlashMessageDetail = (configuration: Notification, detail: ReactNode | undefined = undefined) => {
    createNotification(
      {
        ...configuration,
        ...(detail ? { content: renderFlashMessageDetail(configuration.content, detail) } : {}),
      },
      NotificationType.FlashMessage
    );
  };

  const createAlert = (configuration: Notification) => createNotification(configuration, NotificationType.Alert);

  const createNotification = (configuration: Notification, type: NotificationType) => {
    const tag = configuration.tag ?? configuration.dataElm;
    const ignorableTag = resolveIgnorableTag(tag, type);
    if (isNotificationIgnored(configuration, ignorableTag, getIgnorableTags)) {
      console.debug(`Notification with tag '${ignorableTag}' has been ignored.`);
      return;
    }
    if (ignorableTag && configuration.persistIgnorableTagToLocalStorage) {
      const ls = localStorage.getItem(IgnorableTagsLocalStorageKey);
      localStorage.setItem(IgnorableTagsLocalStorageKey, `${ls ? `${ls}|` : ''}${ignorableTag}`);
    }
    if (ignorableTag && configuration.persistIgnorableTagToContext) {
      addIgnorableTag(ignorableTag);
    }
    addNotification({
      id: `${tag ? `${tag}_` : ''}${uuid()}`,
      type: type,
      open: true,
      tag: tag,
      variant: configuration.variant ?? NotificationVariant.Info,
      ...configuration,
    });
  };

  const getQueue = (): InternalNotification[] => getState().items;

  const getFilteredQueue = (type: NotificationType | undefined = undefined) =>
    getQueue().filter((item) => (type === undefined || item.type === type) && isFreshNotification(item));

  const isQueueEmpty = (type: NotificationType | undefined = undefined) => getFilteredQueue(type).length === 0;

  const getIgnorableTags = (): string[] => [...(getState().ignorableTags ?? []), ...getLocalStorageIgnorableTags()];

  const closeNotification = (id: string) =>
    setState({
      ...getState(),
      items: getState().items.map((item) => (item.id === id ? { ...item, open: false } : item)),
    });

  const runAnimation = (id: string) =>
    setState({
      ...getState(),
      items: getState().items.map((item) => (item.id === id ? { ...item, isAnimationRunning: true } : item)),
    });

  const closeActivePopup = () => closeActiveNotification(NotificationType.Popup);

  const closeActiveNotification = (type: NotificationType | undefined = undefined) =>
    closeNotification(String(getActiveNotification(type)?.id));

  const closeAllNotifications = (type: NotificationType | undefined = undefined) =>
    setState({
      ...getState(),
      items: getState().items.map((item) =>
        type === undefined || item.type === type ? { ...item, open: false } : item
      ),
    });

  const getActiveNotification = (type: NotificationType | undefined = undefined) =>
    getFilteredQueue(type).find((item) => item.open);

  const addNotification = (notification: InternalNotification) =>
    setState({
      ...getState(),
      items: [...getState().items, notification],
    });
  const addIgnorableTag = (tag: string) =>
    setState({ ...getState(), ignorableTags: [...getState().ignorableTags, tag] });

  const runGarbageCollector = () =>
    setState({
      ...getState(),
      items: getState().items.filter((item) => item.open || isFreshNotification(item)),
    });

  return {
    createPopup,
    createFlashMessage,
    createFlashMessageDetail,
    createAlert,
    getQueue,
    getFilteredQueue,
    isQueueEmpty,
    getIgnorableTags,
    closeNotification,
    closeActivePopup,
    closeActiveNotification,
    closeAllNotifications,
    getActiveNotification,
    runAnimation,
    runGarbageCollector,
  };
};
