import i18next from 'i18next';

import en from '../translations/en.json';
import ko from '../translations/ko.json';

const translations = {
  en,
  ko,
};

export const initializeI18n = async (locale: keyof typeof translations) => {
  const translation = translations[locale];
  i18next.init({
    lng: locale,
    resources: {
      [locale]: {
        translation,
      },
    },

    interpolation: {
      escapeValue: false,
      prefix: '{',
      suffix: '}',
    },
    nonExplicitWhitelist: true,
    keySeparator: false,
  });
};

export default i18next;
