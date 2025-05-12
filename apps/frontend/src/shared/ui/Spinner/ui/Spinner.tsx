import { FC } from 'react';
import { Flex, Spin } from 'antd';

import styles from './styles.module.scss';

import { LoadingOutlined } from '@ant-design/icons';

export const Spinner: FC = () => (
  <Flex
    align="center"
    justify="center"
    gap="middle"
    className={styles.container}
  >
    <Spin indicator={<LoadingOutlined spin />} size="large" />
  </Flex>
);
