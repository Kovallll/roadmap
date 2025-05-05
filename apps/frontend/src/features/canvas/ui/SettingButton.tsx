import { useState } from 'react';
import { Button, Flex, Input, Modal } from 'antd';

import { SettingButtonProps, useSaveCanvas } from '../model';

import { gaps } from '@/shared/styles/theme';

export const SettingButton = ({ canvas }: SettingButtonProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(canvas.title);
  const [editDescription, setEditDescription] = useState(
    canvas?.description ?? ''
  );

  const { mutate: saveCanvas, isPending: isUpdating } = useSaveCanvas(
    canvas.id
  );

  const handleEditModalOk = () => {
    if (!editTitle.trim()) return;
    saveCanvas({
      ...canvas,
      title: editTitle,
      description: editDescription,
    });
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };
  const handleEditDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDescription(e.target.value);
  };

  return (
    <>
      <Button onClick={handleEditModal}>Настроить</Button>
      <Modal
        title="Настройка карты"
        open={isEditModalOpen}
        onCancel={handleCloseModal}
        onOk={handleEditModalOk}
        confirmLoading={isUpdating}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Flex vertical gap={gaps.md}>
          <Input
            placeholder="Введите новое название"
            value={editTitle}
            onChange={handleEditTitle}
          />
          <Input
            placeholder="Введите новое описание"
            value={editDescription}
            onChange={handleEditDescription}
          />
        </Flex>
      </Modal>
    </>
  );
};
