export const COOKIE_DECISION_KEY = 'cookie_decision';
export const LEGACY_YM_DISABLE_KEY = 'ym_disable';
export const COOKIE_CONSENT_EVENT = 'ptb-cookie-consent-changed';
export const YANDEX_METRIKA_ID = 103534344;

export function isConsentDecision(value) {
  return value === 'accepted' || value === 'rejected';
}

export function resolveAnalyticsConsent(cookieDecision, legacyYandexDisabled) {
  if (isConsentDecision(cookieDecision)) {
    return cookieDecision;
  }

  if (legacyYandexDisabled === '1') {
    return 'rejected';
  }

  return null;
}

export function isYandexMetrikaAllowed(decision) {
  return decision === 'accepted';
}

export function getYandexDisableFlagName(counterId = YANDEX_METRIKA_ID) {
  return `disableYaCounter${counterId}`;
}
