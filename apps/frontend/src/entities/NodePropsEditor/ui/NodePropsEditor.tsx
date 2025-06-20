import { useState } from 'react';
import {
  Button,
  ColorPicker,
  Divider,
  Drawer,
  Flex,
  InputNumber,
  Typography,
} from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';

import { NodePropsEditorProps } from '../model';
import styles from './styles.module.scss';

import { NodeContentEditor } from '@/entities/NodeContentEditor/ui/NodeContentEditor';
import { defaultNodeHeight, defaultNodeWidth } from '@/shared/lib';
import {
  AlignType,
  AlignTypes,
  useSelectedNodeStore,
  useTheme,
} from '@/shared/model';
import { fontSizes, gaps } from '@/shared/styles/theme';
import { Align } from '@/shared/ui/Align/ui';
import { StatusSelect } from '@/shared/ui/StatusSelect/ui/StatusSelect';

export const NodePropsEditor = ({
  handleUpdate,
  onCloseDrawer,
}: NodePropsEditorProps) => {
  const { defaults, colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selectedNode = useSelectedNodeStore.use.selectedNode();
  if (!selectedNode) return null;

  const handleChangeFontSize = (value: number | null) => {
    if (!value) return;
    handleUpdate('fontSize', value);
  };

  const handleChangeTextColor = (color: AggregationColor) => {
    handleUpdate('color', color.toHexString());
  };

  const handleChangeBgColor = (color: AggregationColor) => {
    handleUpdate('backgroundColor', color.toHexString());
  };

  const handleChangeHorizontalAlignment = (value: AlignType) => {
    handleUpdate('justifyContent', value);
  };

  const handleChangeVerticalAlignment = (value: AlignType) => {
    handleUpdate('alignItems', value);
  };

  const handleChangeWidth = (value: number | null) => {
    if (!value) return;
    handleUpdate('width', value);
  };

  const handleChangeHeight = (value: number | null) => {
    if (!value) return;
    handleUpdate('height', value);
  };

  const handleSetAutoHeight = () => {
    handleUpdate('height', 'auto');
  };

  const showDrawer = () => {
    onCloseDrawer();
    setTimeout(() => setIsOpen(true), 400);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  const fontSize = (selectedNode.data?.fontSize as number) ?? fontSizes.lg;
  const textColor = (selectedNode.data?.color as string) ?? defaults.black;
  const bgColor =
    (selectedNode.data?.backgroundColor as string) ?? defaults.white;
  const justifyContent =
    (selectedNode.data?.justifyContent as AlignType) ?? AlignTypes.CENTER;
  const alignItems =
    (selectedNode.data?.alignItems as AlignType) ?? AlignTypes.CENTER;
  const width = (selectedNode.data?.width as number) ?? defaultNodeWidth;
  const height =
    (selectedNode.data?.height as number | string) ?? defaultNodeHeight;

  const ButtonColor = height === 'auto' ? colors.secondary : defaults.black;
  const buttonAutoHeightStyles = {
    border: `2px solid ${ButtonColor}`,
    color: ButtonColor,
  };

  const rootElement = document.getElementById('root') as HTMLElement;

  return (
    <>
      <Typography.Title level={2}>Редактирование узла</Typography.Title>
      <Divider />
      <Button onClick={showDrawer} className={styles.contentButton}>
        Добавить описание
      </Button>
      <Flex vertical className={styles.section}>
        <Typography.Text className={styles.label}>
          Размер шрифта
        </Typography.Text>
        <InputNumber
          value={fontSize}
          onChange={handleChangeFontSize}
          className={styles.input}
        />
      </Flex>
      <Flex vertical className={styles.section}>
        <Typography.Text className={styles.label}>
          Выравнивание текста
        </Typography.Text>
        <Align>
          <Align.Horizontal
            justifyContent={justifyContent}
            handleChange={handleChangeHorizontalAlignment}
          />
          <Align.Vertical
            alignItems={alignItems}
            handleChange={handleChangeVerticalAlignment}
          />
        </Align>
      </Flex>
      <Flex vertical className={styles.section}>
        <Typography.Text className={styles.label}>Ширина</Typography.Text>
        <InputNumber
          type="number"
          value={width}
          onChange={handleChangeWidth}
          className={styles.input}
        />
      </Flex>
      <Flex vertical className={styles.section}>
        <Typography.Text className={styles.label}>Высота</Typography.Text>
        <Flex gap={gaps.sm}>
          <InputNumber
            type="number"
            value={Number(height)}
            onChange={handleChangeHeight}
            className={styles.input}
          />
          <Button style={buttonAutoHeightStyles} onClick={handleSetAutoHeight}>
            Auto
          </Button>
        </Flex>
      </Flex>
      <Flex vertical className={styles.section}>
        <Typography.Text className={styles.label}>Статус</Typography.Text>
        <StatusSelect />
      </Flex>
      <Flex vertical className={styles.section}>
        <Typography.Text className={styles.label}>Цвет текста</Typography.Text>
        <ColorPicker
          value={textColor}
          onChange={handleChangeTextColor}
          className={styles.picker}
        />
      </Flex>
      <Flex vertical className={styles.section}>
        <Typography.Text className={styles.label}>Цвет фона</Typography.Text>
        <ColorPicker
          value={bgColor}
          onChange={handleChangeBgColor}
          className={styles.picker}
        />
      </Flex>
      <Drawer
        placement={'top'}
        closable={false}
        onClose={onClose}
        open={isOpen}
        className={styles.drawer}
        getContainer={() => rootElement}
      >
        <NodeContentEditor onCloseDrawer={onClose} />
      </Drawer>
    </>
  );
};
