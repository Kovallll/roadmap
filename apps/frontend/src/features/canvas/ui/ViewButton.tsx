import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { ViewButtonProps } from '../model';

import { RoutePath } from '@/shared/model';
import { useCanvasStore } from '@/shared/model/store/canvasStore';

export const ViewButton = ({ canvasId }: ViewButtonProps) => {
  const setIsEdit = useCanvasStore.use.setIsEdit();

  const navigate = useNavigate();

  const handleEditCanvas = () => {
    navigate(`${RoutePath.MAP}/${canvasId}`);
    setIsEdit(false);
  };

  return <Button onClick={handleEditCanvas}>Просмотреть</Button>;
};
