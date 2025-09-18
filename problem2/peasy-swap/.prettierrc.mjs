import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  printWidth: 140,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  semi: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')]
};
