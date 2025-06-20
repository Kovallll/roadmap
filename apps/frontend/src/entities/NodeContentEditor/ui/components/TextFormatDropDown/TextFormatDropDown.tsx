import { DropDown } from '../DropDown';
import { DropDownItem } from '../DropDownItem';
import styles from './styles.module.scss';

import {
  FormatDropDownProps,
  useToolbar,
} from '@/entities/NodeContentEditor/model';

export const TextFormatDropDown = ({ activeEditor }: FormatDropDownProps) => {
  const { textFormatOptions } = useToolbar();

  return (
    <DropDown
      buttonAriaLabel="Formatting options for additional text styles"
      buttonIconClassName={styles.icon}
      iconComponent={<span className={styles.icon}>Aa</span>}
    >
      {textFormatOptions.map((item) => (
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(
              item.dispatchCommand.type,
              item.dispatchCommand.payload
            );
          }}
          item={item}
        />
      ))}
    </DropDown>
  );
};
