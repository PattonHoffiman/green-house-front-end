import React, { useCallback, useRef } from 'react';
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
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
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

        history.push('/dashboard');
        addToast({ type: 'success', title: 'Welcome!' });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Error in Authentication!',
            description: 'Incorrect e-mail/password combination.',
          });
        }
      }
    },
    [signIn, addToast, history],
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
              autoComplete="on"
            />
            <Button type="submit">Enter</Button>
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
