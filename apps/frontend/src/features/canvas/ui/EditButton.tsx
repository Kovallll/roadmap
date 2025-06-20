import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { EditButtonProps } from '../model';

import { RoutePath, useAuthStore } from '@/shared/model';
import { useCanvasStore } from '@/shared/model/store/canvasStore';

export const EditButton = ({ canvasId }: EditButtonProps) => {
  const setIsEdit = useCanvasStore.use.setIsEdit();
  const token = useAuthStore.use.refreshToken();
  const navigate = useNavigate();

  const handleEditCanvas = () => {
    navigate(`${RoutePath.MAP}/${canvasId}?token=${token}`);
    setIsEdit(true);
  };

  return <Button onClick={handleEditCanvas}>Редактировать</Button>;
};
