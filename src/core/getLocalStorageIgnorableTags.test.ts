import { getLocalStorageIgnorableTags } from './getLocalStorageIgnorableTags';

describe('getLocalStorageIgnorableTags', () => {
  test('Empty', () => {
    expect(getLocalStorageIgnorableTags()).toEqual([]);
    expect(getLocalStorageIgnorableTags('')).toEqual([]);
  });
  test('One value', () => {
    expect(getLocalStorageIgnorableTags('abcd')).toEqual(['abcd']);
  });
  test('Many values', () => {
    expect(getLocalStorageIgnorableTags('ab|  cd  |  |ef')).toEqual(['ab', 'cd', 'ef']);
  });
});
