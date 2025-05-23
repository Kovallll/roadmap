import type { JSX } from 'react';
import { Flex, Input, Typography } from 'antd';
import classNames from 'classnames';

import styles from './styles.module.scss';

import { TextInputProps } from '@/entities/NodeContentEditor/model';

export function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  'data-test-id': dataTestId,
  type = 'text',
  labelClassName,
  containerClassName,
  ...rest
}: TextInputProps): JSX.Element {
  return (
    <Flex justify="space-between" align="center" className={containerClassName}>
      <Typography.Text className={classNames(styles.label, labelClassName)}>
        {label}
      </Typography.Text>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        data-test-id={dataTestId}
        className={styles.input}
        {...rest}
      />
    </Flex>
  );
}
