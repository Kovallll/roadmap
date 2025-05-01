import { useState } from 'react';
import { Button, Flex, Input, Modal } from 'antd';

import { SettingButtonProps, useSaveCanvas } from '../model';

export const SettingButton = ({ canvas }: SettingButtonProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { mutate: saveCanvas, isPending: isUpdating } = useSaveCanvas(
    canvas.id
  );

  const openEditModal = () => {
    setEditTitle(canvas.title);
    setEditDescription(canvas?.description ?? '');
    setIsEditModalOpen(true);
  };

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

  return (
    <>
      <Button onClick={() => openEditModal()}>Настроить</Button>
      <Modal
        title="Настройка карты"
        open={isEditModalOpen}
        onCancel={handleCloseModal}
        onOk={handleEditModalOk}
        confirmLoading={isUpdating}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Flex vertical gap={16}>
          <Input
            placeholder="Введите новое название"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <Input
            placeholder="Введите новое описание"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </Flex>
      </Modal>
    </>
  );
};
