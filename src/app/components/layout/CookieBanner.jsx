// src/app/components/layout/CookieBanner.jsx
'use client';

import { useEffect, useState } from 'react';
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_DECISION_KEY,
  getYandexDisableFlagName,
  LEGACY_YM_DISABLE_KEY,
  resolveAnalyticsConsent,
} from '../analytics/consent.mjs';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let cookieDecision = null;
    let legacyYandexDisabled = null;

    try {
      cookieDecision = localStorage.getItem(COOKIE_DECISION_KEY);
      legacyYandexDisabled = localStorage.getItem(LEGACY_YM_DISABLE_KEY);
    } catch {
      // If storage is unavailable, stay privacy-conservative and ask again.
    }

    const decision = resolveAnalyticsConsent(
      cookieDecision,
      legacyYandexDisabled,
    );

    if (!decision) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, []);

  const broadcastDecision = (decision) => {
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_EVENT, {
        detail: { decision },
      }),
    );
  };

  const acceptCookies = () => {
    try {
      localStorage.setItem(COOKIE_DECISION_KEY, 'accepted');
      localStorage.removeItem(LEGACY_YM_DISABLE_KEY);
    } catch {
      // Consent still applies for this page even if persistence is unavailable.
    }

    window[getYandexDisableFlagName()] = false;
    broadcastDecision('accepted');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    try {
      localStorage.setItem(COOKIE_DECISION_KEY, 'rejected');
      localStorage.setItem(LEGACY_YM_DISABLE_KEY, '1');
    } catch {
      // Rejection still applies for this page even if persistence is unavailable.
    }

    window[getYandexDisableFlagName()] = true;
    broadcastDecision('rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
      <div className="flex flex-col space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Использование cookies
        </h3>
        <p className="text-sm text-gray-600">
          Мы используем Яндекс.Метрику для анализа посещаемости сайта.
          Вы можете отказаться от сбора данных.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Принять
          </button>
          <button
            onClick={rejectCookies}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
