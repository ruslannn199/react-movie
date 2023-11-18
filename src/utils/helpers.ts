import type { CurrencyFormat, Money } from '../types/types';

const convertCurrency = (currency: string): CurrencyFormat => {
  switch (currency) {
    case '₽':
      return { language: 'ru-RU', ISO: 'RUB' };
    case '€':
      return { language: 'de-DE', ISO: 'EUR' };
    case '£':
      return { language: 'en-GB', ISO: 'GBP' };
    case '¥':
      return { language: 'ja-JP', ISO: 'JPY' };
    default:
      return { language: 'en-US', ISO: 'USD' };
  }
}

// Convert time to hours and minutes
export const calcTime = (time: number): string => {
  const hours: number = Math.floor(time / 60);
  const mins: number = time % 60;
  return `${hours}ч ${mins}м`;
}

// Convert a number to money formatting
export const convertMoney = ({ value, currency }: Money): string => {
  const { language, ISO } = convertCurrency(currency || '$');
  const formatter: Intl.NumberFormat = new Intl.NumberFormat(language, {
    style: 'currency',
    currency: ISO,
    minimumFractionDigits: 0,
  });
  return formatter.format(value || 0);
}

export const isPersistedState = <T>(stateName: string): T => {
  const sessionState: string | null = sessionStorage.getItem(stateName);
  return sessionState && JSON.parse(sessionState);
}
