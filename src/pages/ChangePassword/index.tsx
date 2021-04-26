import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
import backgroundImage from '../../assets/backgroundImageTwo.jpg';

import { Content, Container, LeftContainer, CenterContainer } from './style';

interface ChangePasswordFormData {
  password: string;
  new_password: string;
  confirm_password: string;
}

const ChangePassword: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = useCallback(
    async (data: ChangePasswordFormData) => {
      try {
        setDisable(true);
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Please, insert your password.'),
          new_password: Yup.string().required(
            'Please, insert your new password',
          ),
          confirm_password: Yup.string().required(
            'Please, insert the password confirmation.',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, new_password, confirm_password } = data;

        const response = await api.patch('/users/profile', {
          password,
          new_password,
          confirm_password,
        });

        const { message, status } = response.data;

        if (status === 'success') {
          history.push('/profile');
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
        setDisable(false);
      }
    },
    [addToast, history, setLoading, setDisable],
  );

  return (
    <Container>
      <Content>
        <LeftContainer>
          <Link to="/profile">
            <FiArrowLeft />
          </Link>
        </LeftContainer>
        <CenterContainer>
          <Logo />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Password..."
            />
            <Input
              name="new_password"
              type="password"
              icon={FiLock}
              placeholder="New Password..."
            />
            <Input
              name="confirm_password"
              type="password"
              icon={FiCheck}
              placeholder="Password Confirmation..."
            />
            <Button type="submit" loading={loading} disable={disable}>
              Change
            </Button>
          </Form>
        </CenterContainer>
      </Content>
      <Background imagePath={backgroundImage} />
    </Container>
  );
};

export default ChangePassword;
