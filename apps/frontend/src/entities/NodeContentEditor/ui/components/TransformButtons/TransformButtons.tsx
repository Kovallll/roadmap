import { useCallback } from 'react';
import { Button, Flex } from 'antd';
import cn from 'classnames';

import styles from './styles.module.scss';

import { sanitizeUrl } from '@/entities/NodeContentEditor/lib';
import {
  TransformButtonsProps,
  TransformButtonType,
  useToolbar,
} from '@/entities/NodeContentEditor/model';

export const TransformButtons = ({
  activeEditor,
  setIsLinkEditMode,
}: TransformButtonsProps) => {
  const { transformButtons } = useToolbar();

  const handleClickTranformButton =
    (
      type: TransformButtonType['type'],
      dispatchCommand: TransformButtonType['dispatchCommand'],
      isActive: TransformButtonType['isActive']
    ) =>
    () => {
      if (type === 'link') {
        insertLink(isActive, dispatchCommand);
      } else {
        activeEditor.dispatchCommand(
          dispatchCommand.type,
          dispatchCommand.payload
        );
      }
    };

  const insertLink = useCallback(
    (
      isActive: boolean,
      dispatchCommand: TransformButtonType['dispatchCommand']
    ) => {
      if (!isActive) {
        setIsLinkEditMode(true);
        activeEditor.dispatchCommand(
          dispatchCommand.type,
          sanitizeUrl('https://')
        );
      } else {
        setIsLinkEditMode(false);
        activeEditor.dispatchCommand(
          dispatchCommand.type,
          dispatchCommand.payload
        );
      }
    },
    [activeEditor, setIsLinkEditMode]
  );

  return (
    <>
      {transformButtons.map(
        ({ Icon, dispatchCommand, isActive, title, ariaLabel, type }) => (
          <Button
            onClick={handleClickTranformButton(type, dispatchCommand, isActive)}
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
