import React from 'react';
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
        <Button type="button" onClick={window.close}>
          OK
        </Button>
      </CenterContainer>
    </Content>
  </Container>
);

export default MailNotification;
