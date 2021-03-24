import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import backgroundImage from '../../assets/backgroundImageOne.jpg';

import { Content, Container, LeftContainer, CenterContainer } from './style';

interface SendMailFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SendMailFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Please, insert your e-mail.')
            .email('Invalid e-mail.'),
        });

        await schema.validate(data, { abortEarly: false });
        const { email } = data;

        const response = await api.post('/users/password', {
          email,
        });

        const { message, status } = response.data;

        if (status === 'success') {
          history.push('/mail-notification');
          addToast({ type: status, title: 'Success', description: message });
        } else if (status === 'error') {
          addToast({
            type: status,
            title: 'Error!',
            description: message,
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background imagePath={backgroundImage} />
      <Content>
        <LeftContainer>
          <Link to="/signin">
            <FiArrowLeft />
          </Link>
        </LeftContainer>
        <CenterContainer>
          <Logo />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Please, insert your e-mail</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail..." />
            <Button type="submit" loading={loading}>
              Send
            </Button>
          </Form>
        </CenterContainer>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
