import { useEffect, useRef } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

import { getStatusColor, textAlignMap } from '@/shared/lib';
import {
  AlignTypes,
  NodeStatus,
  Styles,
  TextAreaProps,
  useCanvasStore,
} from '@/shared/model';
import { colors, fontSizes } from '@/shared/styles/theme';

export const TextArea = ({
  value,
  onChange,
  className,
  data,
  style,
}: TextAreaProps) => {
  const isEdit = useCanvasStore.use.isEdit();
  const ref = useRef<HTMLDivElement>(null);

  const fontSize = Number(data?.fontSize ?? fontSizes.lg);
  const backgroundColor = String(data?.backgroundColor);
  const status = String(data?.status);
  const justifyContent = String(data?.justifyContent ?? AlignTypes.START);
  const alignItems = String(data?.alignItems ?? AlignTypes.START);
  const customColor = String(data?.color ?? colors.black);

  const color =
    status === NodeStatus.PENDING || status === NodeStatus.CLOSE
      ? customColor
      : getStatusColor(status);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText;
    onChange?.(value);
  };

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = String(value ?? '');
    }
  }, [value]);

  const stylesObj: Styles = {
    justifyContent,
    alignItems,
    fontSize,
    backgroundColor,
    color,
    textAlign: textAlignMap[justifyContent],
    pointerEvents: isEdit ? 'all' : 'none',
  };

  return (
    <div
      ref={ref}
      contentEditable={isEdit}
      onInput={handleInput}
      className={cn(styles.editable, className, 'nodrag', 'nowheel', {
        [styles.crossed]:
          status === NodeStatus.CLOSE || status === NodeStatus.DONE,
      })}
      style={{ ...stylesObj, ...style }}
      suppressContentEditableWarning
    />
  );
};
