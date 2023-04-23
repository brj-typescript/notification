import { InternalNotification } from '../types';

export const isFreshNotification = (notification: InternalNotification): boolean =>
  notification.open &&
  (notification.startDate ? Date.parse(notification.startDate) > Date.now() : true) &&
  (notification.endDate ? Date.parse(notification.endDate) < Date.now() : true);
