import { NotificationType } from '../types';
import { resolveIgnorableTag } from './resolveIgnorableTag';

describe('resolveIgnorableTag', () => {
  test('Basic scenario', () => {
    expect(resolveIgnorableTag('my-tag', NotificationType.Alert)).toEqual('alert_my-tag');
    expect(resolveIgnorableTag('my-tag', NotificationType.Popup)).toEqual('popup_my-tag');
    expect(resolveIgnorableTag('', NotificationType.Alert)).toEqual('');
    expect(resolveIgnorableTag(undefined, NotificationType.Alert)).toEqual('');
  });
});
