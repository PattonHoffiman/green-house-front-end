import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../components/Logo';
import Button from '../../components/Button';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { Content, Container, CenterContainer } from './style';

const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const { addToast } = useToast();

  useEffect(() => {
    async function confirm(): Promise<void> {
      const token = location.search.replace('?token=', '');
      const response = await api.patch('users/confirm', {
        token,
      });

      const { message, status } = response.data;

      if (status === 'success') {
        addToast({ type: status, title: 'Success', description: message });
      } else if (status === 'error') {
        addToast({ type: status, title: 'Error', description: message });
      }
    }

    confirm();
  }, [addToast, location]);

  return (
    <Container>
      <Content>
        <CenterContainer>
          <Logo />
          <h1>Now you can sign in!</h1>
          <Link to="/signin">
            <Button>OK</Button>
          </Link>
        </CenterContainer>
      </Content>
    </Container>
  );
};

export default ConfirmEmail;
