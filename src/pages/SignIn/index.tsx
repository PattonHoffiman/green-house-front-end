import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import backgroundImage from '../../assets/backgroundImageOne.jpg';

import {
  Content,
  Container,
  LeftContainer,
  RightContainer,
  CenterContainer,
} from './style';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { signIn, info } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setDisable(true);
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Please, insert your e-mail.')
            .email('Invalid e-mail.'),
          password: Yup.string().required('Please, insert your password.'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        if (info.status === 'success') {
          history.push('/dashboard');
          addToast({ type: info.status, title: info.message });
        } else if (info.status === 'error') {
          addToast({
            type: info.status,
            title: 'Error!',
            description: info.message,
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
    [signIn, addToast, history, info, setLoading, setDisable],
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
            <Input name="email" icon={FiMail} placeholder="E-mail..." />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password..."
            />
            <Button type="submit" loading={loading} disable={disable}>
              Enter
            </Button>
          </Form>
        </CenterContainer>
        <RightContainer>
          <Link to="forgot-password">Forgot your Password?</Link>
        </RightContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
