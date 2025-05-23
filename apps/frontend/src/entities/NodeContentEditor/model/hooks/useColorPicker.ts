import { useEffect, useMemo, useRef, useState } from 'react';

import {
  COLOR_PICKER_HEIGHT,
  COLOR_PICKER_WIDTH,
  transformColor,
} from '../../lib';
import { Position } from '../types';

export const useColorPicker = (
  color: string,
  skipAddingToHistoryStack: boolean,
  onChange?: (value: string, skipHistoryStack: boolean) => void
) => {
  const [selfColor, setSelfColor] = useState(transformColor('hex', color));
  const [inputColor, setInputColor] = useState(color);
  const innerDivRef = useRef(null);

  const saturationPosition = useMemo(
    () => ({
      x: (selfColor.hsv.s / 100) * COLOR_PICKER_WIDTH,
      y: ((100 - selfColor.hsv.v) / 100) * COLOR_PICKER_HEIGHT,
    }),
    [selfColor.hsv.s, selfColor.hsv.v]
  );

  const huePosition = useMemo(
    () => ({
      x: (selfColor.hsv.h / 360) * COLOR_PICKER_WIDTH,
    }),
    [selfColor.hsv]
  );

  const handleClickBasicColor = (basicColor: string) => () => {
    setInputColor(basicColor);
    setSelfColor(transformColor('hex', basicColor));
  };

  const onSetHex = (hex: string) => {
    setInputColor(hex);
    if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      const newColor = transformColor('hex', hex);
      setSelfColor(newColor);
    }
  };

  const onMoveSaturation = ({ x, y }: Position) => {
    const newHsv = {
      ...selfColor.hsv,
      s: (x / COLOR_PICKER_WIDTH) * 100,
      v: 100 - (y / COLOR_PICKER_HEIGHT) * 100,
    };
    const newColor = transformColor('hsv', newHsv);
    setSelfColor(newColor);
    setInputColor(newColor.hex);
  };

  const onMoveHue = ({ x }: Position) => {
    const newHsv = { ...selfColor.hsv, h: (x / COLOR_PICKER_WIDTH) * 360 };
    const newColor = transformColor('hsv', newHsv);

    setSelfColor(newColor);
    setInputColor(newColor.hex);
  };

  useEffect(() => {
    // Check if the dropdown is actually active
    if (innerDivRef.current !== null && onChange) {
      onChange(selfColor.hex, skipAddingToHistoryStack);
      setInputColor(selfColor.hex);
    }
  }, [selfColor, onChange]);

  useEffect(() => {
    if (color === undefined) {
      return;
    }
    const newColor = transformColor('hex', color);
    setSelfColor(newColor);
    setInputColor(newColor.hex);
  }, [color]);

  return {
    inputColor,
    selfColor,
    saturationPosition,
    huePosition,
    onSetHex,
    onMoveSaturation,
    onMoveHue,
    innerDivRef,
    handleClickBasicColor,
  };
};
