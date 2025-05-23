import { Button } from 'antd';
import cn from 'classnames';

import styles from './styles.module.scss';

import {
  HistoryControlsProps,
  useToolbar,
} from '@/entities/NodeContentEditor/model';

export const HistoryControls = ({ activeEditor }: HistoryControlsProps) => {
  const { historyControls } = useToolbar();

  return (
    <>
      {historyControls.map(
        ({ Icon, ariaLabel, dispatchCommand, isActive, title }) => (
          <Button
            disabled={!isActive}
            onClick={() => {
              activeEditor.dispatchCommand(
                dispatchCommand.type,
                dispatchCommand.payload
              );
            }}
            title={title}
            className={cn(styles.control, { [styles.disabled]: !isActive })}
            aria-label={ariaLabel}
          >
            {Icon}
          </Button>
        )
      )}
    </>
  );
};
