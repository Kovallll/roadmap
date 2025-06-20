import { Button, Flex, Form, Input, Switch, Typography } from 'antd';

import { useUpdateUser } from '../modal';
import styles from './styles.module.scss';

import { useUserStore } from '@/features/user/model';
import { ETheme } from '@/shared/model';
import { Spinner } from '@/shared/ui/Spinner/ui/Spinner';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const EditProfile = () => {
  const user = useUserStore.use.user();

  const [form] = Form.useForm();
  const initialValues = {
    username: user?.username,
  };

  const { mutate } = useUpdateUser(user?.id ?? '');

  const handleSave = async () => {
    const values = await form.validateFields();

    const theme = values.isDarkTheme ? ETheme.DARK : ETheme.LIGHT;
    mutate({ username: values.username, theme });
  };

  if (!user) return <Spinner />;

  return (
    <Flex vertical className={styles.editProfilePage}>
      <Title level={2} className={styles.pageTitle}>
        Редактирование профиля
      </Title>
      <Form form={form} initialValues={initialValues} layout="vertical">
        <Form.Item label="Имя пользователя" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Тема по умолчанию" name="isDarkTheme">
          <Switch
            className={styles.switch}
            checkedChildren={<MoonOutlined className={styles.switchDarkIcon} />}
            unCheckedChildren={
              <SunOutlined className={styles.switchLightIcon} />
            }
            defaultChecked={user.theme === ETheme.DARK}
          />
        </Form.Item>
        <Button onClick={handleSave}>Сохранить</Button>
      </Form>
    </Flex>
  );
};
