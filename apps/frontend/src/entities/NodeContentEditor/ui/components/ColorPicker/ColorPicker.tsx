import { type JSX, useRef } from 'react';
import { Button } from 'antd';
import cn from 'classnames';

import { TextInput } from '../TextInput';
import { MoveWrapper } from './MoveWrapper';
import styles from './styles.module.scss';

import {
  basicColors,
  COLOR_PICKER_WIDTH,
} from '@/entities/NodeContentEditor/lib';
import { ColorPickerProps } from '@/entities/NodeContentEditor/model';
import { useColorPicker } from '@/entities/NodeContentEditor/model/hooks/useColorPicker';

export function ColorPicker({
  color,
  onChange,
}: Readonly<ColorPickerProps>): JSX.Element {
  const skipAddingToHistoryStack = useRef(false);
  const {
    huePosition,
    innerDivRef,
    inputColor,
    onMoveHue,
    onMoveSaturation,
    onSetHex,
    saturationPosition,
    selfColor,
    handleClickBasicColor,
  } = useColorPicker(color, skipAddingToHistoryStack.current, onChange);

  return (
    <div
      className={styles.container}
      style={{ width: COLOR_PICKER_WIDTH }}
      ref={innerDivRef}
    >
      <TextInput
        label="Hex"
        onChange={onSetHex}
        value={inputColor}
        className={styles.input}
        labelClassName={styles.label}
        containerClassName={styles.inputContainer}
      />
      <div className={styles.basicColors}>
        {basicColors.map((basicColor) => (
          <Button
            className={cn({
              [styles.active]: basicColor === selfColor.hex,
            })}
            key={basicColor}
            style={{ backgroundColor: basicColor }}
            onClick={handleClickBasicColor(basicColor)}
          />
        ))}
      </div>
      <MoveWrapper
        className={styles.saturation}
        style={{ backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)` }}
        onChange={onMoveSaturation}
        skipAddingToHistoryStack={skipAddingToHistoryStack}
      >
        <div
          className={styles.saturationCursor}
          style={{
            backgroundColor: selfColor.hex,
            left: saturationPosition.x,
            top: saturationPosition.y,
          }}
        />
      </MoveWrapper>
      <MoveWrapper
        className={styles.hue}
        onChange={onMoveHue}
        skipAddingToHistoryStack={skipAddingToHistoryStack}
      >
        <div
          className={styles.hueCursor}
          style={{
            backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)`,
            left: huePosition.x,
          }}
        />
      </MoveWrapper>
      <div
        className={styles.colorBar}
        style={{ backgroundColor: selfColor.hex }}
      />
    </div>
  );
}
