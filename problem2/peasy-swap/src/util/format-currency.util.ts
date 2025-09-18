import currency from 'currency.js';

export const formatCurrency = (value: number | string, options?: currency.Options) => {
  return currency(value, {
    symbol: '',
    separator: ',',
    decimal: '.',
    precision: 6,
    ...options
  })
    .format()
    .replace(/\.?0+$/, '');
};
