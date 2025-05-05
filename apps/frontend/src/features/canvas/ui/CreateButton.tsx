import { useState } from 'react';
import { Button, Flex, Input, Modal } from 'antd';

import { CreateButtonProps } from '../model';
import { useCreateCanvas } from '../model/hooks/useCreateCanvas';
import styles from './styles.module.scss';

export const CreateButton = ({ userId }: CreateButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutate, isPending } = useCreateCanvas();

  const handleOkModal = () => {
    if (!title.trim()) return;
    mutate({ title, description, userId });
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        className={styles.createButton}
      >
        Создать карту
      </Button>
      <Modal
        title="Создание новой карты"
        open={isModalOpen}
        onOk={handleOkModal}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isPending}
        okText="Создать"
        cancelText="Отмена"
      >
        <Flex vertical gap={16}>
          <Input
            placeholder="Введите название карты"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Введите описание карты"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Flex>
      </Modal>
    </>
  );
};
