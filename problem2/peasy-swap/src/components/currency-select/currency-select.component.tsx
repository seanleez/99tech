import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { CURRENCIES } from '../../const';
import { TCurrency } from '../../type';
import { SVGIcon } from '../svg-icon';
import './currency-select.style.scss';

const classNamePrefix = 'currency-select';

export interface ICurrencyDropdownProps {
  title?: string;
  selectedCurrency: TCurrency;
  currenciesList?: TCurrency[];
  onSelectCurrency: (currency: TCurrency) => void;
}

export const CurrencyDropdown: React.FC<ICurrencyDropdownProps> = props => {
  const { selectedCurrency, currenciesList = CURRENCIES, title = 'From', onSelectCurrency } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = useMemo(() => {
    return currenciesList
      .filter(currency => currency.currency.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.currency.localeCompare(b.currency));
  }, [currenciesList, searchTerm]);

  const handleCurrencySelect = (currency: TCurrency) => {
    onSelectCurrency(currency);
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchTerm('');
  };

  return (
    <>
      <Button className={`${classNamePrefix}__button`} onClick={() => setIsModalOpen(true)}>
        <SVGIcon name={selectedCurrency.currency} />
        {selectedCurrency.currency}
      </Button>

      <Modal
        show={isModalOpen}
        onHide={handleCloseModal}
        centered
        className={`${classNamePrefix}__modal`}
        backdropClassName={`${classNamePrefix}__modal-backdrop`}
      >
        <Modal.Header className={`${classNamePrefix}__modal-header`} closeButton>
          <Modal.Title className={`${classNamePrefix}__modal-title`}>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className={`${classNamePrefix}__modal-body`}>
          <div className={`${classNamePrefix}__search-container`}>
            <input
              type="text"
              placeholder="Search name"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={`${classNamePrefix}__search-input`}
            />
          </div>

          <div className={`${classNamePrefix}__currency-list`}>
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency, index) => (
                <div
                  key={index}
                  className={`${classNamePrefix}__currency-item ${
                    currency.currency === selectedCurrency.currency ? `${classNamePrefix}__currency-item--selected` : ''
                  }`}
                  onClick={() => handleCurrencySelect(currency)}
                >
                  <div className={`${classNamePrefix}__currency-icon`}>
                    <SVGIcon name={currency.currency} />
                  </div>
                  <div className={`${classNamePrefix}__currency-info`}>
                    <div className={`${classNamePrefix}__currency-symbol`}>{currency.currency}</div>
                    <div className={`${classNamePrefix}__currency-description`}>{currency.currency}</div>
                  </div>
                  <div className={`${classNamePrefix}__currency-actions`}>
                    <i className="bi bi-chevron-right" />
                  </div>
                </div>
              ))
            ) : (
              <div className={`${classNamePrefix}__empty-state`}>
                <div className={`${classNamePrefix}__empty-state-icon`}>
                  <i className="bi bi-search" />
                </div>
                <div className={`${classNamePrefix}__empty-state-text`}>No currencies found matching "{searchTerm}"</div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
