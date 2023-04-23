import { NotificationType, NotificationVariant } from '../types';
import { isFreshNotification } from './isFreshNotification';

const base = {
  type: NotificationType.Alert,
  id: '1',
  variant: NotificationVariant.Success,
  content: 'Sample notification',
};

describe('isFreshNotification', () => {
  test('Is open', () => {
    expect(isFreshNotification({ ...base, open: true })).toEqual(true);
  });
  test('Is open and in future', () => {
    expect(
      isFreshNotification({
        ...base,
        open: true,
        startDate: Date.parse('now + 5 seconds').toLocaleString(),
      })
    ).toEqual(false);
  });
  test('Is not open', () => {
    expect(isFreshNotification({ ...base, open: false })).toEqual(false);
  });
  test('Is not open and in future', () => {
    expect(
      isFreshNotification({
        ...base,
        open: false,
        startDate: Date.parse('now + 5 seconds').toLocaleString(),
      })
    ).toEqual(false);
  });
  test('Is open but in past', () => {
    expect(
      isFreshNotification({
        ...base,
        open: false,
        startDate: Date.parse('now - 5 seconds').toLocaleString(),
      })
    ).toEqual(false);
  });
  test('Is open but expired in past', () => {
    expect(
      isFreshNotification({
        ...base,
        open: true,
        endDate: Date.parse('now - 5 seconds').toLocaleString(),
      })
    ).toEqual(false);
  });
});
