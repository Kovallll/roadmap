import { Layout } from 'antd';

import styles from './styles.module.scss';

import { RegisterForm } from '@/features/register/ui/RegisterForm';

const RegisterPage = () => {
  return (
    <Layout className={styles.container}>
      <RegisterForm />;
    </Layout>
  );
};

export default RegisterPage;
