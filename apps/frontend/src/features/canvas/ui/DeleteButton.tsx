import { useState } from 'react';
import { Button, Modal } from 'antd';

import { DeleteButtonProps, useDeleteCanvas } from '../model';
import styles from './styles.module.scss';

import { DeleteOutlined } from '@ant-design/icons';

export const DeleteButton = ({ canvasId }: DeleteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useDeleteCanvas();

  const handleDelete = () => {
    mutate(canvasId);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={() => setIsModalOpen(true)}
        className={styles.deleteButton}
      >
        <DeleteOutlined />
      </Button>

      <Modal
        title="Удаление карты"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={isPending}
        okText="Удалить"
        cancelText="Отмена"
        okButtonProps={{ danger: true }}
      >
        Вы действительно хотите удалить эту карту? Это действие необратимо.
      </Modal>
    </>
  );
};
