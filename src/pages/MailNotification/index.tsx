import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { Content, Container, CenterContainer } from './style';

const MailNotification: React.FC = () => (
  <Container>
    <Content>
      <CenterContainer>
        <Logo />
        <h1>An e-mail was sent to your mailbox.</h1>
        <h2>Please check it...</h2>
        <Link to="/signin">
          <Button>OK</Button>
        </Link>
      </CenterContainer>
    </Content>
  </Container>
);

export default MailNotification;
