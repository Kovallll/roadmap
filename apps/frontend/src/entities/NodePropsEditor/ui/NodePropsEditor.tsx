import { ColorPicker, InputNumber, Typography } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';

import { additionalEditors, NodePropsEditorProps } from '../model';
import styles from './styles.module.scss';

import { colors, fontSizes } from '@/shared/styles/theme';
import { StatusSelect } from '@/shared/ui/StatusSelect/ui/StatusSelect';

export const NodePropsEditor = ({
  selectedNode,
  handleUpdate,
}: NodePropsEditorProps) => {
  if (!selectedNode) return null;

  const fontSize = (selectedNode.data?.fontSize as number) || fontSizes.xs;
  const textColor = (selectedNode.data?.color as string) || colors.black;
  const bgColor =
    (selectedNode.data?.backgroundColor as string) || colors.white;

  const handleChangeFontSize = (value: number | null) => {
    handleUpdate('fontSize', value);
  };

  const handleChangeTextColor = (color: AggregationColor) => {
    handleUpdate('color', color.toHexString());
  };

  const handleChangeBgColor = (color: AggregationColor) => {
    handleUpdate('backgroundColor', color.toHexString());
  };

  return (
    <>
      {additionalEditors.map(
        (item) => selectedNode?.type === item.type && item.editor
      )}
      <div className={styles.field}>
        <Typography.Text className={styles.label}>
          Размер шрифта
        </Typography.Text>
        <InputNumber
          value={fontSize}
          onChange={handleChangeFontSize}
          className={styles.numberInput}
        />
      </div>
      <div className={styles.field}>
        <Typography.Text className={styles.label}>Цвет текста</Typography.Text>
        <ColorPicker value={textColor} onChange={handleChangeTextColor} />
      </div>
      <div className={styles.field}>
        <Typography.Text className={styles.label}>Цвет фона</Typography.Text>
        <ColorPicker value={bgColor} onChange={handleChangeBgColor} />
      </div>
      <div className={styles.field}>
        <Typography.Text className={styles.label}>Статус</Typography.Text>
        <StatusSelect />
      </div>
    </>
  );
};
