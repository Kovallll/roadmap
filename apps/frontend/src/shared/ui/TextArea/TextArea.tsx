import { Input } from 'antd';
import cn from 'classnames';

import styles from './styles.module.scss';

import { TextAreaProps } from '@/shared/model';

const { TextArea: AntdTextArea } = Input;

export const TextArea = ({
  value,
  onChange,
  placeholder,
  className,
  data,
}: TextAreaProps) => {
  const fontSize = Number(data?.fontSize);
  const backgroundColor = String(data?.backgroundColor);
  const color = String(data?.color);

  const textAreaStyles = {
    fontSize,
    backgroundColor,
    color,
  };

  return (
    <AntdTextArea
      value={value}
      onChange={onChange}
      className={cn(styles.textarea, 'nodrag', 'nowheel', className)}
      placeholder={placeholder}
      style={textAreaStyles}
    />
  );
};
