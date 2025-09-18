import clsx from 'clsx';
import React, { forwardRef, useEffect, useState } from 'react';

import { INumberInputProps } from './number-input.type';

const DECIMAL_SEPARATOR = '.';

export const NumberInput = forwardRef<HTMLInputElement, INumberInputProps>(
  ({ className, error, errorMessage, onChange, value, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>(value?.toString() || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      // Only allow numbers and one period
      if (!/^[0-9]*\.?[0-9]*$/.test(inputValue)) return;

      setDisplayValue(inputValue);

      let actualValue = inputValue;

      if (inputValue === `0${DECIMAL_SEPARATOR}`) {
        actualValue = '0';
      } else if (inputValue.endsWith(DECIMAL_SEPARATOR)) {
        actualValue = inputValue.slice(0, -1);
      } else {
        actualValue = inputValue.replace(/^0+(?=\d)/, '') || '0';
      }

      onChange?.({ ...event, target: { ...event.target, value: actualValue } });
    };

    useEffect(() => {
      setDisplayValue(value?.toString() || '');
    }, [value]);

    return (
      <div className="input-wrapper">
        <input
          type="text"
          ref={ref}
          className={clsx('form-control', { 'is-invalid': error }, className)}
          value={displayValue}
          onChange={handleChange}
          {...props}
        />
        {error && errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
      </div>
    );
  }
);
