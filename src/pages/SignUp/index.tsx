import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import backgroundImage from '../../assets/backgroundImageOne.jpg';

import { Content, Container, LeftContainer, CenterContainer } from './style';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        setDisable(true);
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Please, insert your name.'),
          email: Yup.string()
            .required('Please, insert your e-mail.')
            .email('Invalid e-mail.'),
          password: Yup.string().required('Please, insert your password.'),
        });

        await schema.validate(data, { abortEarly: false });
        const { name, email, password } = data;

        const response = await api.post('/users', {
          name,
          email,
          password,
        });

        const { message, status } = response.data;

        if (status === 'success') {
          addToast({ type: status, title: 'Success', description: message });
        } else if (status === 'error') {
          addToast({
            type: status,
            title: 'Error!',
            description: message,
          });
        }

        const sendConfirmation = await api.post('users/confirm', {
          email,
        });

        if (sendConfirmation.data.status === 'success') {
          addToast({
            title: 'Success',
            type: sendConfirmation.data.status,
            description: sendConfirmation.data.message,
          });

          history.push('/mail-notification');
        } else if (sendConfirmation.data.status === 'error') {
          addToast({
            title: 'Error!',
            type: sendConfirmation.data.status,
            description: sendConfirmation.data.message,
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      } finally {
        setLoading(false);
        setDisable(false);
      }
    },
    [addToast, history, setLoading, setDisable],
  );

  return (
    <Container>
      <Background imagePath={backgroundImage} />
      <Content>
        <LeftContainer>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </LeftContainer>
        <CenterContainer>
          <Logo />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} placeholder="Name..." />
            <Input name="email" icon={FiMail} placeholder="E-mail..." />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password..."
            />
            <Button type="submit" loading={loading} disable={disable}>
              Register
            </Button>
          </Form>
        </CenterContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
