import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { EditButtonProps } from '../model';

import { RoutePath } from '@/app/router/constants';

export const EditButton = ({ canvas }: EditButtonProps) => {
  const { id } = canvas;
  const navigate = useNavigate();

  const handleEditCanvas = () => {
    navigate(`${RoutePath.MAP}/${id}`);
  };

  return (
    <Button type="primary" onClick={handleEditCanvas}>
      Редактировать
    </Button>
  );
};
