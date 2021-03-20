import React from 'react';
import { Container } from './style';
import logoImage from '../../assets/logo.svg';

const Logo: React.FC = () => (
  <Container>
    <img src={logoImage} alt="GreenHouse" />
  </Container>
);

export default Logo;
