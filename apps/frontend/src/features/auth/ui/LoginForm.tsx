import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';

import { useLogin } from '../model/hooks/useLogin';

import { User } from '@roadmap/user/types';

export const LoginForm = () => {
  const [form] = Form.useForm();
  const login = useLogin();
  const navigate = useNavigate();

  const onFinish = (values: User) => {
    login.mutate(values, {
      onSuccess: () => {
        navigate('/canvas');
      },
    });
  };

  return (
    <Form
      form={form}
      name="login"
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: 'auto', marginTop: '5rem' }}
    >
      <Typography.Title level={3}>Вход</Typography.Title>

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
          loading={login.isPending}
        >
          Войти
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="link" block onClick={() => navigate('/register')}>
          Нет аккаунта? Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
