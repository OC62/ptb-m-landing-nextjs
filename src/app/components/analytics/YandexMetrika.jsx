// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_DECISION_KEY,
  getYandexDisableFlagName,
  isConsentDecision,
  isYandexMetrikaAllowed,
  LEGACY_YM_DISABLE_KEY,
  resolveAnalyticsConsent,
  YANDEX_METRIKA_ID,
} from './consent.mjs';

export default function YandexMetrika() {
  const [consentDecision, setConsentDecision] = useState(null);

  useEffect(() => {
    const disableFlagName = getYandexDisableFlagName();

    const applyDecision = (decision) => {
      if (!isConsentDecision(decision)) {
        window[disableFlagName] = true;
        setConsentDecision(null);
        return;
      }

      window[disableFlagName] = !isYandexMetrikaAllowed(decision);
      setConsentDecision(decision);
    };

    let cookieDecision = null;
    let legacyYandexDisabled = null;

    try {
      cookieDecision = localStorage.getItem(COOKIE_DECISION_KEY);
      legacyYandexDisabled = localStorage.getItem(LEGACY_YM_DISABLE_KEY);
    } catch {
      // If storage is unavailable, keep analytics disabled by default.
    }

    applyDecision(
      resolveAnalyticsConsent(cookieDecision, legacyYandexDisabled),
    );

    const handleConsentChange = (event) => {
      applyDecision(event?.detail?.decision);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    };
  }, []);

  const initializeMetrika = useCallback(() => {
    if (
      typeof window === 'undefined' ||
      !isYandexMetrikaAllowed(consentDecision)
    ) {
      return;
    }

    window[getYandexDisableFlagName()] = false;

    if (!window.ym) {
      window.ym = function() {
        (window.ym.a = window.ym.a || []).push(arguments);
      };
      window.ym.l = Date.now();
    }

    try {
      window.ym(YANDEX_METRIKA_ID, 'init', {
        clickmap: false,
        trackLinks: false,
        accurateTrackBounce: false,
        webvisor: false,
        trackHash: false,
        ecommerce: false,
        ut: 'noindex',
      });

      setTimeout(() => {
        if (
          window.ym &&
          isYandexMetrikaAllowed(consentDecision)
        ) {
          window.ym(YANDEX_METRIKA_ID, 'hit', window.location.href);
        }
      }, 2000);
    } catch (error) {
      console.warn('Ошибка инициализации Яндекс.Метрики:', error);
    }
  }, [consentDecision]);

  if (!isYandexMetrikaAllowed(consentDecision)) {
    return null;
  }

  return (
    <Script
      id="yandex-metrika"
      strategy="afterInteractive"
      src="https://mc.yandex.ru/metrika/tag.js"
      onReady={initializeMetrika}
      onError={(error) => {
        console.warn('Ошибка загрузки скрипта Яндекс.Метрики:', error);
      }}
    />
  );
}
