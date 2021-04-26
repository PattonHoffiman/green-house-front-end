import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  FiPenTool,
  FiDroplet,
  FiTrash2,
  FiImage,
  FiArrowLeft,
} from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';
import SquareButton from '../../components/SquareButton';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import genericImage from '../../assets/generic-plant.jpg';
import backgroundImage from '../../assets/backgroundImageTwo.jpg';

import {
  Content,
  Container,
  AvatarInput,
  LeftContainer,
  RightContainer,
  CenterContainer,
} from './style';

interface PlantInfoFormData {
  name: string;
  days_to_water: number;
}

interface Plant {
  id: string;
  name: string;
  avatar_url: string;
  days_to_water: number;
}

interface WaterTimes {
  water_last_time: string;
  water_next_time: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [plant, setPlant] = useState<Plant>({} as Plant);
  const [waterTimes, setWaterTimes] = useState<WaterTimes>({} as WaterTimes);

  useEffect(() => {
    async function getPlant(): Promise<void> {
      const id = location.search.replace('?id=', '');
      const response = await api.get(`/plants/profile/${id}`);
      const {
        plant: updatedPlant,
        water_next_time,
        water_last_time,
      } = response.data;

      setPlant(updatedPlant as Plant);
      setWaterTimes({ water_last_time, water_next_time });
    }

    getPlant();
  }, [location]);

  const handleSubmit = useCallback(
    async (data: PlantInfoFormData) => {
      try {
        setDisable(true);
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Please, insert plant's name."),
          days_to_water: Yup.string().required(
            'Please, insert the number of days.',
          ),
        });

        await schema.validate(data, { abortEarly: false });
        const { name, days_to_water } = data;

        const response = await api.put(`plants/profile/${plant.id}`, {
          name,
          days_to_water,
        });

        const { status, message, plant: updatedPlant } = response.data;

        if (status === 'success') {
          addToast({ type: status, title: 'Success', description: message });
          setPlant(updatedPlant as Plant);
          history.push('/dashboard');
        } else if (status === 'error')
          addToast({ type: status, title: 'Error', description: message });
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
    [setPlant, addToast, plant, history, setLoading, setDisable],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);
        api.patch(`/plants/profile/avatar/${plant.id}`, data).then(res => {
          const { status, message, plant: updatedPlant } = res.data;

          if (status === 'success') {
            addToast({
              type: status,
              title: 'Success',
              description: message,
            });
            setPlant(updatedPlant as Plant);
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
    [addToast, setPlant, plant],
  );

  const handleDeletePlant = useCallback(async () => {
    const response = await api.delete(`plants/profile/${plant.id}`);
    const { status, message } = response.data;

    if (status === 'success') {
      addToast({ type: status, title: 'Success', description: message });
      history.push('/dashboard');
    } else if (status === 'error') {
      addToast({ type: status, title: 'Error', description: message });
    }
  }, [addToast, history, plant]);

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
              name: plant.name,
              days_to_water: plant.days_to_water,
            }}
          >
            <AvatarInput>
              <img
                src={plant.avatar_url ? plant.avatar_url : genericImage}
                alt={plant.name}
              />
              <button type="button">
                <label htmlFor="avatar">
                  <FiImage />
                  <input
                    type="file"
                    id="avatar"
                    onChange={handleAvatarChange}
                  />
                </label>
              </button>
            </AvatarInput>
            <Input name="name" icon={FiPenTool} placeholder="Name..." />
            <Input
              type="number"
              icon={FiDroplet}
              name="days_to_water"
              placeholder="Days to Water..."
            />
            <Button type="submit" loading={loading} disable={disable}>
              Update
            </Button>
          </Form>
          <div>
            <h2>
              Next Time to Water: <strong>{waterTimes.water_next_time}</strong>
            </h2>
            {waterTimes.water_last_time !== 'None' && (
              <h2>
                Last Time Watered: <strong>{waterTimes.water_last_time}</strong>
              </h2>
            )}
          </div>
        </CenterContainer>
        <RightContainer>
          <SquareButton
            icon={FiTrash2}
            title={`Delete this ${plant.name}`}
            onClick={handleDeletePlant}
          />
        </RightContainer>
      </Content>
      <Background imagePath={backgroundImage} />
    </Container>
  );
};

export default Profile;
