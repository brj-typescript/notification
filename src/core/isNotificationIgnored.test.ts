import { isNotificationIgnored } from './isNotificationIgnored';

describe('isNotificationIgnored', () => {
  test('Show notification', () => {
    expect(isNotificationIgnored({ content: 'Message' }, 'my-tag', (): string[] => [])).toEqual(false);
  });
  test('Show once but missing ignorable tag', () => {
    jest.spyOn(console, 'warn').mockImplementation();
    expect(isNotificationIgnored({ content: 'Message', showOnce: true }, '', (): string[] => [])).toEqual(false);
  });
  test('Ignored tag but no show once', () => {
    expect(
      isNotificationIgnored(
        {
          content: 'Message',
          showOnce: true,
        },
        'my-tag',
        (): string[] => ['my-tag']
      )
    ).toEqual(true);
  });
  test('Ignored tag and show once', () => {
    expect(isNotificationIgnored({ content: 'Message' }, 'my-tag', (): string[] => ['my-tag'])).toEqual(false);
  });
  test('persistIgnorableTagToContext', () => {
    expect(
      isNotificationIgnored(
        { content: 'Message', showOnce: false, persistIgnorableTagToContext: true },
        '',
        (): string[] => ['']
      )
    ).toEqual(false);
  });
  test('persistIgnorableTagToLocalStorage', () => {
    expect(
      isNotificationIgnored(
        { content: 'Message', showOnce: false, persistIgnorableTagToLocalStorage: true },
        '',
        (): string[] => ['']
      )
    ).toEqual(false);
  });
});
