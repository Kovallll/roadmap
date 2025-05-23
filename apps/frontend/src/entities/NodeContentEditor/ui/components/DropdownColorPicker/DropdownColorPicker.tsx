import { ColorPicker } from '../ColorPicker';
import { DropDown } from '../DropDown';
import styles from './styles.module.scss';

import { DropdownColorPickerProps } from '@/entities/NodeContentEditor/model';

export function DropdownColorPicker({
  disabled = false,
  stopCloseOnClickSelf = true,
  color,
  iconComponent,
  onChange,
  ...rest
}: DropdownColorPickerProps) {
  return (
    <DropDown
      {...rest}
      buttonClassName={styles.container}
      disabled={disabled}
      stopCloseOnClickSelf={stopCloseOnClickSelf}
      iconComponent={iconComponent}
    >
      <ColorPicker color={color} onChange={onChange} />
    </DropDown>
  );
}
