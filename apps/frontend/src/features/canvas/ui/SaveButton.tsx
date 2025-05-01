import { Button } from 'antd';

import { SaveButtonProps, useSaveCanvas } from '../model';

export const SaveButton = ({ canvas, ...props }: SaveButtonProps) => {
  const { mutate } = useSaveCanvas(canvas.id);

  const handleSave = () => {
    mutate(canvas);
  };

  return (
    <Button onClick={handleSave} {...props}>
      Сохранить карту
    </Button>
  );
};
