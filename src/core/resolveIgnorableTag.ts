import { NotificationType } from '../types';

export const resolveIgnorableTag = (tag: string | undefined, type: NotificationType) => (tag ? `${type}_${tag}` : '');
