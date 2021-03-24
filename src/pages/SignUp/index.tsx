import React, { useCallback, useRef } from 'react';
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

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
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

        const { message } = response.data;
        history.push('/signin');
        addToast({ type: 'success', title: message });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Error in Authentication!',
            description: 'This e-mail already exists! Try another',
          });
        }
      }
    },
    [addToast, history],
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
              autoComplete="on"
            />
            <Button type="submit">Register</Button>
          </Form>
        </CenterContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
