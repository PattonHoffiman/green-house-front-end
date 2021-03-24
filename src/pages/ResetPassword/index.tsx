import React, { useCallback, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLock, FiCheck, FiArrowLeft } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import backgroundImage from '../../assets/backgroundImageOne.jpg';

import { Content, Container, LeftContainer, CenterContainer } from './style';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Please, insert your password.'),
          password_confirmation: Yup.string().required(
            'Please, insert the password confirmation.',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        const response = await api.patch('/users/password', {
          token,
          password,
          password_confirmation,
        });

        const { message, status } = response.data;

        if (status === 'success') {
          history.push('/signin');
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
      }
    },
    [addToast, history, location],
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
            <h1>Now you can change your password!</h1>
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Password..."
            />
            <Input
              name="password_confirmation"
              type="password"
              icon={FiCheck}
              placeholder="Password Confirmation..."
            />
            <Button type="submit">Reset</Button>
          </Form>
        </CenterContainer>
      </Content>
    </Container>
  );
};

export default ResetPassword;
