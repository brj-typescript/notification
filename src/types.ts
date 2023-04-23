import { ReactNode } from 'react';

export enum NotificationType {
  Popup = 'popup',
  FlashMessage = 'flashMessage',
  Alert = 'alert',
}

export enum NotificationVariant {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Internal = 'internal',
}

type DynamicNotification = {
  content: ReactNode;
};

type StaticNotification = {
  content: string;
};

type NotificationWithContent = DynamicNotification | StaticNotification;

export const IgnorableTagsLocalStorageKey = 'notificationIgnorableTags';

export type NotificationDateTime = string;

export type NotificationAction = {
  label: string;
  icon?: ReactNode;
  callback?: () => void;
};

export type Notification = NotificationWithContent & {
  tag?: string;
  dataElm?: string;
  title?: string;
  variant?: NotificationVariant;
  actions?: NotificationAction[];
  startDate?: NotificationDateTime;
  endDate?: NotificationDateTime;
  maxWidth?: 'xs' | 'sm' | 'md' | 'xl';
  persistIgnorableTagToContext?: boolean;
  persistIgnorableTagToLocalStorage?: boolean;
  showOnce?: boolean;
  dataElms?: Partial<PopupDataElms>;
};

export type InternalNotification = Notification & {
  type: NotificationType;
  id: string;
  open: boolean;
  variant: NotificationVariant;
  isAnimationRunning?: boolean;
};

export type PopupDataElms = {
  dialogElm: string;
  closeBtn: string;
  titleElm: string;
  actionsElms: Map<string, string>;
};

export type NotificationQueue = {
  items: InternalNotification[];
  ignorableTags: string[];
};
