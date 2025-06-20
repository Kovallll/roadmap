import { useState } from 'react';
import { Button, Modal } from 'antd';

import styles from './styles.module.scss';

import { useUserStore } from '@/features/user/model';
import { useAuthStore, useTheme } from '@/shared/model';
import { QueryClient } from '@tanstack/react-query';

export const LogoutButton = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const logout = useAuthStore.use.logout();
  const clear = useUserStore.use.clear();
  const queryClient = new QueryClient();
  const { defaults } = useTheme();

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
    clear();
    queryClient.removeQueries();
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const cancelButtonStyles = { style: { color: defaults.black } };

  return (
    <>
      <Modal
        className={styles.modal}
        title="Подтверждение выхода"
        open={isLogoutModalOpen}
        onOk={confirmLogout}
        onCancel={cancelLogout}
        okText="Выйти"
        cancelText="Отмена"
        cancelButtonProps={cancelButtonStyles}
      >
        <p>Вы действительно хотите выйти из системы?</p>
      </Modal>
      <Button onClick={handleLogout} className={styles.button}>
        Выход
      </Button>
    </>
  );
};
