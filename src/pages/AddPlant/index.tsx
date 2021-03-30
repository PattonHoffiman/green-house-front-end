import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiDroplet, FiPenTool, FiArrowLeft } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import backgroundImage from '../../assets/backgroundImageTwo.jpg';

import { Content, Container, LeftContainer, CenterContainer } from './style';

interface CreateFormData {
  name: string;
  days_to_water: number;
}

const AddPlant: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Please, insert the plant's name."),
          days_to_water: Yup.string().required(
            'Please, insert the number of days to water your plant.',
          ),
        });

        await schema.validate(data, { abortEarly: false });
        const { name, days_to_water } = data;

        const response = await api.post('/plants', {
          name,
          days_to_water,
        });

        const { message, status } = response.data;

        if (status === 'success') {
          addToast({ type: status, title: 'Success', description: message });
          history.push('/dashboard');
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
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <LeftContainer>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </LeftContainer>
        <CenterContainer>
          <Logo />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiPenTool} placeholder="Name..." />
            <Input
              min={1}
              type="number"
              icon={FiDroplet}
              name="days_to_water"
              placeholder="Days to Water..."
            />
            <Button type="submit">Add</Button>
          </Form>
        </CenterContainer>
      </Content>
      <Background imagePath={backgroundImage} />
    </Container>
  );
};

export default AddPlant;
