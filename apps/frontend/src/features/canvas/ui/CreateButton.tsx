import { useState } from 'react';
import { Button, Flex, Input, Modal } from 'antd';

import { CreateButtonProps } from '../model';
import { useCreateCanvas } from '../model';
import styles from './styles.module.scss';

import { gaps } from '@/shared/styles/theme';

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

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => setIsModalOpen(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <Button onClick={handleCreate} className={styles.createButton}>
        Создать карту
      </Button>
      <Modal
        title="Создание новой карты"
        open={isModalOpen}
        onOk={handleOkModal}
        onCancel={onCancel}
        confirmLoading={isPending}
        okText="Создать"
        cancelText="Отмена"
        okButtonProps={{ type: 'default' }}
      >
        <Flex vertical gap={gaps.md}>
          <Input
            placeholder="Введите название карты"
            value={title}
            onChange={handleChangeTitle}
          />
          <Input
            placeholder="Введите описание карты"
            value={description}
            onChange={handleChangeDescription}
          />
        </Flex>
      </Modal>
    </>
  );
};
