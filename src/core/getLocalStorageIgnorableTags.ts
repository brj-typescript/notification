import { IgnorableTagsLocalStorageKey } from '../types';

export const getLocalStorageIgnorableTags = (haystack: string | undefined = undefined): string[] =>
  String(haystack || localStorage.getItem(IgnorableTagsLocalStorageKey) || '')
    .split('|')
    .map((item) => item.replace(/\s+/g, ''))
    .filter((item) => item);
