import { Button, Flex } from 'antd';
import cn from 'classnames';

import styles from './styles.module.scss';

import {
  FormatDropDownProps,
  useToolbar,
} from '@/entities/NodeContentEditor/model';

export const TextFormatButtons = ({ activeEditor }: FormatDropDownProps) => {
  const { textFormatOptions } = useToolbar();

  return (
    <>
      {textFormatOptions.map(
        ({ Icon, ariaLabel, dispatchCommand, isActive, title }) => (
          <Button
            onClick={() =>
              activeEditor.dispatchCommand(
                dispatchCommand.type,
                dispatchCommand.payload
              )
            }
            className={cn(styles.button, {
              [styles.active]: isActive,
            })}
            title={title}
            aria-label={ariaLabel}
          >
            <Flex className={styles.icon}>{Icon}</Flex>
          </Button>
        )
      )}
    </>
  );
};
