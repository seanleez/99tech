const DEFAULT_MOCK_CURRENCIES_BALANCE = {
  BUSD: 20000,
  ETH: 1400,
  WBTC: 150
};

export const getAvailableBalanceAPI = () => {
  return new Promise<Record<string, number>>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      let parseBalance = {};
      try {
        const _localBalance = localStorage.getItem('currenciesBalance');
        parseBalance = _localBalance ? JSON.parse(localStorage.getItem('currenciesBalance') ?? '{}') : DEFAULT_MOCK_CURRENCIES_BALANCE;
      } catch (error) {
        reject(error);
        console.error(error);
      }

      resolve(parseBalance);
      clearTimeout(timeoutId);
    }, 1500);
  });
};
