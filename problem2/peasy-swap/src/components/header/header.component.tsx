import { Container } from 'react-bootstrap';

import logoImage from '../../assets/images/logo.png';
import './header.style.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Container className="header__container">
        <img src={logoImage} alt="logo" />
        <span>PeasySwap</span>
      </Container>
    </header>
  );
};
