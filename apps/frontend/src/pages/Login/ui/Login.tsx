import { Layout } from 'antd';

import styles from './styles.module.scss';

import { LoginForm } from '@/features/auth/ui/LoginForm';

const LoginPage = () => {
  return (
    <Layout className={styles.container}>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
