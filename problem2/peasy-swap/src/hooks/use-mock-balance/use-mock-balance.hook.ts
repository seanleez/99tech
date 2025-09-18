import { useState } from 'react';

const DEFAULT_MOCK_CURRENCIES_BALANCE = {
  BUSD: 20000,
  ETH: 1400,
  WBTC: 150
};

export const useMockBalance = () => {
  const [availableBalance, setAvailableBalance] = useState<Record<string, number>>(() => {
    let parseBalance = {};
    try {
      const _localBalance = localStorage.getItem('currenciesBalance');
      parseBalance = _localBalance ? JSON.parse(localStorage.getItem('currenciesBalance') ?? '{}') : DEFAULT_MOCK_CURRENCIES_BALANCE;
    } catch (error) {
      console.error(error);
    }

    return parseBalance;
  });

  const updateAvailableBalance = (balance: Record<string, number>) => {
    localStorage.setItem('currenciesBalance', JSON.stringify(balance));
    setAvailableBalance(balance);
  };

  return { availableBalance, updateAvailableBalance };
};
