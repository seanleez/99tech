import clsx from 'clsx';
import { useCallback } from 'react';

import './spinner.style.scss';

interface SpinnerProps {
  variant?: 'inline' | 'box' | 'global';
  text?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ variant = 'inline', text = 'Loading...' }) => {
  const renderInlineSpinner = useCallback(
    () => (
      <>
        <div className="spinner-border text-warning" role="status"></div>
      </>
    ),
    []
  );

  const renderSpinner = useCallback(() => {
    switch (variant) {
      case 'inline':
        return renderInlineSpinner();
      case 'box':
        return (
          <>
            {renderInlineSpinner()}
            <span className="spinner-text">{text}</span>
          </>
        );

      case 'global':
        return (
          <div className="spinner-content">
            {renderInlineSpinner()}
            <div className="spinner-text">{text}</div>
          </div>
        );

      default:
        return renderInlineSpinner();
    }
  }, [renderInlineSpinner, text, variant]);

  return <div className={clsx('spinner', `spinner--${variant}`)}>{renderSpinner()}</div>;
};
