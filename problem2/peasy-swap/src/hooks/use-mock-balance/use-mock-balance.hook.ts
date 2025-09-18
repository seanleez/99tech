import { useEffect, useState } from 'react';

import { getAvailableBalanceAPI } from '../../apis';
import { useToast } from '../../contexts';

export const useMockBalance = () => {
  const { showToast } = useToast();
  const [availableBalance, setAvailableBalance] = useState<Record<string, number>>();
  const [loading, setLoading] = useState<boolean>(false);

  // BE Should handle this after converting, just mock FE side
  const updateAvailableBalance = (balance: Record<string, number>) => {
    localStorage.setItem('currenciesBalance', JSON.stringify(balance));
    setAvailableBalance(balance);
  };

  useEffect(() => {
    if (availableBalance) return;

    const fetchAvailableBalance = async () => {
      try {
        setLoading(true);
        const balance = await getAvailableBalanceAPI();
        setAvailableBalance(balance);
      } catch (error) {
        showToast(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableBalance();
  }, []);

  return { availableBalance: availableBalance ?? {}, loadingBalance: loading, updateAvailableBalance };
};
