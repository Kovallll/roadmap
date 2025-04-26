import { useState } from 'react';
import { Button, Card, Flex, Input, Modal } from 'antd';

import { UserMapsProps } from '../model';

import { useCanvases } from '@/features/canvas/model/hooks/useCanvases';
import { useCreateCanvas } from '@/features/canvas/model/hooks/useCreateCanvas';
import { EditButton } from '@/features/canvas/ui/EditButton';

export const UserMaps = ({ user }: UserMapsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { data: canvases, isLoading, isError } = useCanvases(user?.id);
  const { mutate, isPending } = useCreateCanvas();

  const handleOkModal = () => {
    if (!title.trim()) return;
    mutate({ title, description, userId: user.id });
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  if (isLoading || !user) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке карт.</div>;

  const canvasList = Array.isArray(canvases) ? canvases : [];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {canvasList.length > 0 ? (
        canvasList.map((canvas) => (
          <Card key={canvas.id} hoverable style={{ width: 240 }}>
            <Card.Meta title={canvas.title} description={canvas.description} />
            <EditButton canvas={canvas} />
          </Card>
        ))
      ) : (
        <>Нет карт</>
      )}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
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
    </div>
  );
};
