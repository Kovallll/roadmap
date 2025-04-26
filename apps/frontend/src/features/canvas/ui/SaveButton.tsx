import { Button } from 'antd';

import { SaveButtonProps, useSaveCanvas } from '../model';

export const SaveButton = ({ canvas }: SaveButtonProps) => {
  const { mutate } = useSaveCanvas(canvas.id);

  const handleSave = () => {
    mutate(canvas);
  };

  return (
    <Button type="primary" onClick={handleSave}>
      Сохранить карту
    </Button>
  );
};
