import type { JSX } from 'react';
import { HTMLInputTypeAttribute } from 'react';
import { Flex, Input, Typography } from 'antd';

import styles from './styles.module.scss';

type Props = Readonly<{
  'data-test-id'?: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
}>;

export function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  'data-test-id': dataTestId,
  type = 'text',
}: Props): JSX.Element {
  return (
    <Flex justify="space-between" align="center">
      <Typography.Text className={styles.label}>{label}</Typography.Text>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        data-test-id={dataTestId}
        className={styles.input}
      />
    </Flex>
  );
}
