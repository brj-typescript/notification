import { Notification } from '../types';

export const isNotificationIgnored = (
  configuration: Notification,
  ignorableTag: string,
  getIgnorableTags: () => string[]
): boolean => {
  if (configuration.showOnce && !ignorableTag) {
    console.warn('Notification can not be ignored when tag has not been defined.');
  } else if (ignorableTag) {
    if (configuration.showOnce && getIgnorableTags().includes(ignorableTag)) return true;
  } else if (configuration.persistIgnorableTagToContext || configuration.persistIgnorableTagToLocalStorage) {
    console.error('Notification can not be marked as ignorable when tag has not been defined.');
  }

  return false;
};
