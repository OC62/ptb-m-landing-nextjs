import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getYandexDisableFlagName,
  isConsentDecision,
  isYandexMetrikaAllowed,
  resolveAnalyticsConsent,
  YANDEX_METRIKA_ID,
} from './consent.mjs';

test('recognizes only explicit consent decisions', () => {
  assert.equal(isConsentDecision('accepted'), true);
  assert.equal(isConsentDecision('rejected'), true);
  assert.equal(isConsentDecision(null), false);
  assert.equal(isConsentDecision(''), false);
  assert.equal(isConsentDecision('unknown'), false);
});

test('defaults analytics consent to no decision', () => {
  assert.equal(resolveAnalyticsConsent(null, null), null);
  assert.equal(resolveAnalyticsConsent('', null), null);
  assert.equal(resolveAnalyticsConsent('unknown', null), null);
});

test('preserves legacy Yandex opt-out as rejection', () => {
  assert.equal(resolveAnalyticsConsent(null, '1'), 'rejected');
  assert.equal(resolveAnalyticsConsent('unknown', '1'), 'rejected');
});

test('explicit cookie decision takes precedence over legacy flag', () => {
  assert.equal(resolveAnalyticsConsent('accepted', '1'), 'accepted');
  assert.equal(resolveAnalyticsConsent('rejected', null), 'rejected');
});

test('Yandex Metrika is allowed only after explicit acceptance', () => {
  assert.equal(isYandexMetrikaAllowed('accepted'), true);
  assert.equal(isYandexMetrikaAllowed('rejected'), false);
  assert.equal(isYandexMetrikaAllowed(null), false);
});

test('builds the official Yandex opt-out flag name', () => {
  assert.equal(
    getYandexDisableFlagName(),
    `disableYaCounter${YANDEX_METRIKA_ID}`,
  );
  assert.equal(getYandexDisableFlagName(123), 'disableYaCounter123');
});
