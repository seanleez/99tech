import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { postConvertCurrenciesAPI } from '../../apis';
import { CurrencyDropdown, NumberInput, Spinner, SVGIcon } from '../../components';
import { CURRENCIES } from '../../const';
import { useToast } from '../../contexts';
import { useMockBalance } from '../../hooks';
import { formatCurrency } from '../../util';
import { createCurrencySwapSchema, TCurrencySwapFormData } from './currency-swap.schema';
import './currency-swap.style.scss';

const classNamePrefix = 'currency-swap-page';

export const CurrencySwapPage: React.FC = React.memo(() => {
  const { showToast } = useToast();
  const { availableBalance, loadingBalance, updateAvailableBalance } = useMockBalance();

  const { formState, control, setValue, getValues, watch, handleSubmit } = useForm<TCurrencySwapFormData>({
    resolver: zodResolver(createCurrencySwapSchema(availableBalance)),
    reValidateMode: 'onChange',
    defaultValues: {
      fromCurrencyInfo: CURRENCIES[0],
      fromCurrencyAmt: 0,
      toCurrencyInfo: CURRENCIES[1],
      toCurrencyAmt: 0
    }
  });

  const fromCurrencyInfo = watch('fromCurrencyInfo');
  const toCurrencyInfo = watch('toCurrencyInfo');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const totalBalanceInUSD = useMemo(() => {
    return Object.entries(availableBalance).reduce((acc, [currency, balance]) => {
      const currencyInfo = CURRENCIES.find(cur => cur.currency === currency);
      return acc + ((balance as number) * (currencyInfo?.price ?? 0) || 0);
    }, 0);
  }, [availableBalance]);

  const isAbleToInterchangeCurrencies = useMemo(() => {
    return [fromCurrencyInfo.currency, toCurrencyInfo.currency].every(cur => !!availableBalance[cur]);
  }, [fromCurrencyInfo.currency, toCurrencyInfo.currency, availableBalance]);

  const handleInterchangeCurrencies = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const _tempInfo = getValues('fromCurrencyInfo');
    const _tempAmt = getValues('fromCurrencyAmt');

    setValue('fromCurrencyInfo', getValues('toCurrencyInfo'));
    setValue('toCurrencyInfo', _tempInfo);
    setValue('fromCurrencyAmt', getValues('toCurrencyAmt') ?? 0);
    setValue('toCurrencyAmt', _tempAmt);
  };

  const handleFromCurrencyAmtChange = (value: number, onChange: (value: number) => void) => {
    onChange(value);

    if (!value) {
      setValue('toCurrencyAmt', 0);
    } else {
      const fromCurrencyInfo = getValues('fromCurrencyInfo');
      const toCurrencyInfo = getValues('toCurrencyInfo');
      const convertedAmount = (value * (fromCurrencyInfo.price ?? 1)) / (toCurrencyInfo.price ?? 1);
      setValue('toCurrencyAmt', convertedAmount);
    }
  };

  const handleToCurrencyAmtChange = (value: number, onChange: (value: number) => void) => {
    onChange(value);

    if (!value) {
      setValue('fromCurrencyAmt', 0);
    } else {
      const fromCurrencyInfo = getValues('fromCurrencyInfo');
      const toCurrencyInfo = getValues('toCurrencyInfo');
      const convertedAmount = (value * (toCurrencyInfo.price ?? 1)) / (fromCurrencyInfo.price ?? 1);
      setValue('fromCurrencyAmt', convertedAmount);
    }
  };

  const handleSwapCurrencies = async (data: TCurrencySwapFormData) => {
    const { fromCurrencyInfo, toCurrencyInfo, fromCurrencyAmt, toCurrencyAmt } = data;

    setIsLoading(true);

    try {
      await postConvertCurrenciesAPI({
        currentCurrencyCode: fromCurrencyInfo.currency,
        targetCurrencyCode: toCurrencyInfo.currency,
        currentCurrencyAmount: fromCurrencyAmt ?? 0,
        targetCurrencyAmount: toCurrencyAmt ?? 0
      });

      const newBalance = {
        ...availableBalance,
        [fromCurrencyInfo.currency]: (availableBalance[fromCurrencyInfo.currency] as number) - (fromCurrencyAmt ?? 0),
        [toCurrencyInfo.currency]: ((availableBalance[toCurrencyInfo.currency] as number) ?? 0) + (toCurrencyAmt ?? 0)
      };

      updateAvailableBalance(newBalance);

      setValue('fromCurrencyAmt', 0);
      setValue('toCurrencyAmt', 0);
      showToast('Swap successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Swap failed!', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classNamePrefix}>
      <div className={`${classNamePrefix}__container`}>
        <div className={`${classNamePrefix}__balance`}>
          <div className={`${classNamePrefix}__balance-header`}>
            <div className={`${classNamePrefix}__balance-header-title`}>Balance</div>
            <div className={`${classNamePrefix}__balance-header-total`}>
              {!loadingBalance && formatCurrency(totalBalanceInUSD, { symbol: '$', precision: 0 })}
            </div>
          </div>
          <div className={`${classNamePrefix}__balance-body`}>
            {loadingBalance ? (
              <Spinner variant="box" text="Loading..." />
            ) : (
              <>
                {Object.entries(availableBalance).map(([currency, balance]) => {
                  const currencyInfo = CURRENCIES.find(cur => cur.currency === currency);
                  const balanceInUSD = (balance as number) * (currencyInfo?.price ?? 0) || 0;

                  return (
                    <div key={currency} className={`${classNamePrefix}__balance-item`}>
                      <div className={`${classNamePrefix}__balance-item-currency`}>
                        <SVGIcon name={currency} />
                        <span>{currency}</span>
                      </div>
                      <div className={`${classNamePrefix}__balance-item-amount`}>
                        <span className={`${classNamePrefix}__balance-item-amount-origin`}>{formatCurrency(balance as number)}</span>
                        <span className={`${classNamePrefix}__balance-item-amount-usd`}>
                          ~ {formatCurrency(balanceInUSD, { symbol: '$', precision: 0 })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        <form className={`${classNamePrefix}__form`} onSubmit={handleSubmit(handleSwapCurrencies)}>
          <div className={`${classNamePrefix}__form-ribbon`}>
            <label htmlFor="amount" className="form-label">
              From
            </label>
            <div className={`${classNamePrefix}__form-ribbon-body`}>
              <Controller
                name="fromCurrencyAmt"
                control={control}
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    onChange={e => {
                      const value = parseFloat(e.target.value) || 0;
                      handleFromCurrencyAmtChange(value, field.onChange);
                    }}
                  />
                )}
              />
              <CurrencyDropdown
                currenciesList={CURRENCIES.filter(cur => Object.keys(availableBalance).includes(cur.currency))}
                selectedCurrency={fromCurrencyInfo}
                onSelectCurrency={cur => setValue('fromCurrencyInfo', cur)}
              />
            </div>
          </div>
          <div className={`${classNamePrefix}__form-ribbon`}>
            <label htmlFor="amount" className="form-label">
              To
            </label>
            <div className={`${classNamePrefix}__form-ribbon-body`}>
              <Controller
                name="toCurrencyAmt"
                control={control}
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    onChange={e => {
                      const value = parseFloat(e.target.value) || 0;
                      handleToCurrencyAmtChange(value, field.onChange);
                    }}
                  />
                )}
              />
              <CurrencyDropdown selectedCurrency={toCurrencyInfo} onSelectCurrency={cur => setValue('toCurrencyInfo', cur)} />
            </div>
          </div>

          <div className={`${classNamePrefix}__form-note`}>
            <span>{`1 ${fromCurrencyInfo.currency} = ${formatCurrency(
              fromCurrencyInfo.price / toCurrencyInfo.price
            )} ${toCurrencyInfo.currency}`}</span>
            <i className="bi bi-arrow-down-up"></i>
          </div>

          <button
            className={`${classNamePrefix}__form-swap-btn btn btn-dark ${formState.errors.fromCurrencyAmt ? 'is-error' : ''}`}
            disabled={!isAbleToInterchangeCurrencies}
            onClick={event => handleInterchangeCurrencies(event)}
          >
            <i className="bi bi-arrow-down-up"></i>
          </button>

          <button type="submit" className="btn btn-warning">
            Swap
          </button>
        </form>
      </div>

      {isLoading && <Spinner variant="global" />}
    </div>
  );
});
