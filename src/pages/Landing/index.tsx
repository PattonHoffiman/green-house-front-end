import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/Logo';
import Background from '../../components/Background';
import LargeButton from '../../components/LargeButton';
import { Container, Content, ButtonArea } from './style';
import backgroundImage from '../../assets/backgroundImageOne.jpg';

const Landing: React.FC = () => (
  <Container>
    <Background imagePath={backgroundImage} />
    <Content>
      <Logo />
      <ButtonArea>
        <Link to="/signin" id="signin">
          <LargeButton>SignIn</LargeButton>
        </Link>
        <Link to="/signup" id="signup">
          <LargeButton>SignUp</LargeButton>
        </Link>
      </ButtonArea>
    </Content>
  </Container>
);

export default Landing;
