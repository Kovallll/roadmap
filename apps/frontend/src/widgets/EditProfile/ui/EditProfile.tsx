import { toast } from 'react-toastify';
import { Button, Form, Input, Typography } from 'antd';

import { useUpdateUser } from '../modal';
import styles from './styles.module.scss';

import { useUserStore } from '@/features/user/model';
import { Spinner } from '@/shared/ui/Spinner/ui/Spinner';

const { Title } = Typography;

export const EditProfile = () => {
  const user = useUserStore.use.user();
  const [form] = Form.useForm();
  const { mutate } = useUpdateUser(user?.id ?? '');
  const handleSave = async () => {
    const values = await form.validateFields();
    mutate(values);
  };

  if (!user) return <Spinner />;

  return (
    <div className={styles.editProfilePage}>
      <Title level={2} className={styles.pageTitle}>
        Редактирование профиля
      </Title>
      <Form
        form={form}
        initialValues={{
          username: user.username,
        }}
        layout="vertical"
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Form>
    </div>
  );
};
