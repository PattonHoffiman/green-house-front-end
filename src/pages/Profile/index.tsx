import React, { useCallback, useRef, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  FiMail,
  FiUser,
  FiTrash2,
  FiCamera,
  FiArrowLeft,
} from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';
import SquareButton from '../../components/SquareButton';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import genericImage from '../../assets/generic-user.png';
import backgroundImage from '../../assets/backgroundImageTwo.jpg';

import {
  Content,
  Container,
  AvatarInput,
  LeftContainer,
  RightContainer,
  CenterContainer,
} from './style';

interface ProfileFormData {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { updateUser, signOut, user } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Please, insert your name.'),
          email: Yup.string()
            .required('Please, insert your e-mail.')
            .email('Invalid e-mail.'),
        });

        await schema.validate(data, { abortEarly: false });
        const { name, email } = data;

        const response = await api.put('users/profile', {
          name,
          email,
        });

        const { status, message, user: updatedUser } = response.data;

        if (status === 'success') {
          updateUser(updatedUser);
          addToast({ type: status, title: 'Success', description: message });
        } else if (status === 'error')
          addToast({ type: status, title: 'Error', description: message });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [updateUser, addToast],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);
        api.patch('/users/profile/avatar', data).then(res => {
          const { status, message, user: updatedUser } = res.data;

          if (status === 'success') {
            updateUser(updatedUser);
            addToast({
              type: status,
              title: 'Success',
              description: message,
            });
          } else if (status === 'error') {
            addToast({
              type: status,
              title: 'Error',
              description: message,
            });
          }
        });
      }
    },
    [addToast, updateUser],
  );

  const handleDeleteAccount = useCallback(async () => {
    const response = await api.delete('users/profile');
    const { status, message } = response.data;

    if (status === 'success') {
      addToast({ type: status, title: 'Success', description: message });
      signOut();
      history.push('/');
    } else if (status === 'error') {
      addToast({ type: status, title: 'Error', description: message });
    }
  }, [addToast, signOut, history]);

  return (
    <Container>
      <Content>
        <LeftContainer>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </LeftContainer>
        <CenterContainer>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: user.name,
              email: user.email,
            }}
          >
            <AvatarInput>
              <img
                src={user.avatar_url ? user.avatar_url : genericImage}
                alt={user.name}
              />
              <button type="button">
                <label htmlFor="avatar">
                  <FiCamera />
                  <input
                    type="file"
                    id="avatar"
                    onChange={handleAvatarChange}
                  />
                </label>
              </button>
            </AvatarInput>
            <Input name="name" icon={FiUser} placeholder="Name..." />
            <Input name="email" icon={FiMail} placeholder="E-mail..." />
            <Button type="submit">Update</Button>
            <Link to="/change-password">
              <Button type="button">Change Password</Button>
            </Link>
          </Form>
        </CenterContainer>
        <RightContainer>
          <SquareButton
            icon={FiTrash2}
            title="Delete your Account"
            onClick={handleDeleteAccount}
          />
        </RightContainer>
      </Content>
      <Background imagePath={backgroundImage} />
    </Container>
  );
};

export default Profile;
