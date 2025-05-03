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
  return (
    <AntdTextArea
      value={value}
      onChange={onChange}
      className={cn(styles.textarea, 'nodrag', 'nowheel', className)}
      placeholder={placeholder}
      style={{
        fontSize: Number(data?.fontSize),
        backgroundColor: String(data?.backgroundColor),
        color: String(data?.color),
      }}
    />
  );
};
