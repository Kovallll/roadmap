import { useContext, useEffect, useRef } from 'react';
import { Button, Flex, Typography } from 'antd';
import classNames from 'classnames';

import styles from './styles.module.scss';

import {
  DropDownContext,
  DropDownItemProps,
} from '@/entities/NodeContentEditor/model';

export function DropDownItem({
  item,
  className,
  onClick,
  ...props
}: DropDownItemProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { Icon, ariaLabel, isActive, title, shortcut } = item;
  const dropDownContext = useContext(DropDownContext);

  if (dropDownContext === null) {
    throw new Error('DropDownItem must be used within a DropDown');
  }

  const { registerItem } = dropDownContext;

  useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);

  return (
    <Button
      className={classNames(className, styles.item, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
      ref={ref}
      title={title}
      aria-label={ariaLabel}
      {...props}
    >
      <Flex align="center" justify="space-between" className={styles.content}>
        <Flex align="center">
          {Icon && <div className={styles.dropIcon}>{Icon}</div>}
          <Typography.Text className={styles.text}>{title}</Typography.Text>
        </Flex>
        {shortcut && (
          <Typography.Text className={styles.shortcut}>
            {shortcut}
          </Typography.Text>
        )}
      </Flex>
    </Button>
  );
}
