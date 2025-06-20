import { useNavigate } from 'react-router-dom';
import { Button, Flex, Form, Input, Typography } from 'antd';

import { useRegister } from '../model';
import styles from './styles.module.scss';

import { User } from '@roadmap/user/types';

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const register = useRegister();
  const navigate = useNavigate();

  const onFinish = (values: User) => {
    register.mutate(values, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <Flex>
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
      >
        <Typography.Title level={3}>Регистрация</Typography.Title>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={register.isPending}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
