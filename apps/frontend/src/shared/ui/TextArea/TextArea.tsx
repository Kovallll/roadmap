import { useState } from 'react';
import { Input } from 'antd';
import cn from 'classnames';

import styles from './styles.module.scss';

import { getStatusColor } from '@/shared/lib';
import {
  NodeStatus,
  Styles,
  TextAreaProps,
  useCanvasStore,
} from '@/shared/model';

const { TextArea: AntdTextArea } = Input;

export const TextArea = ({
  value,
  onChange,
  placeholder,
  className,
  data,
}: TextAreaProps) => {
  const [isHover, setIsHover] = useState(false);

  const isEdit = useCanvasStore.use.isEdit();

  const fontSize = Number(data?.fontSize);
  const backgroundColor = String(data?.backgroundColor);
  const status = String(data?.status);
  const textAlign = String(data?.textAlign);
  console.log(textAlign, 'textAlign');
  const customColor = String(data?.color ?? 'inherit');
  const color =
    status === NodeStatus.PENDING || status === NodeStatus.CLOSE
      ? customColor
      : getStatusColor(status);

  const handleMouseOver = () => {
    setIsHover(isEdit ? true : false);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const textAreaStyles: Styles = {
    fontSize,
    backgroundColor,
    color,
    textAlign,
    pointerEvents: isEdit ? 'all' : 'none',
  };

  return (
    <AntdTextArea
      value={value}
      onChange={onChange}
      className={cn(styles.textarea, 'nodrag', 'nowheel', className, {
        [styles.hover]: isHover,
        [styles.crossed]:
          status === NodeStatus.CLOSE || status === NodeStatus.DONE,
      })}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      placeholder={placeholder}
      style={textAreaStyles}
    />
  );
};
