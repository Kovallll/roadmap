import type { FC, JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Flex, Typography } from 'antd';
import cn from 'classnames';
import { isDOMNode } from 'lexical';
import ChevronDown from 'public/images/icons/chevron-down.svg?react';

import { DropDownItems } from '../DropDownItems';
import styles from './styles.module.scss';

import { dropDownPadding } from '@/entities/NodeContentEditor/lib';
import { DropDownProps } from '@/entities/NodeContentEditor/model';
import { useTheme } from '@/shared/model';

export function DropDown({
  disabled = false,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
  stopCloseOnClickSelf,
  iconComponent,
}: DropDownProps): JSX.Element {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const { colors } = useTheme();
  const handleClose = () => {
    setShowDropDown(false);
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    const dropDown = dropDownRef.current;

    if (showDropDown && button !== null && dropDown !== null) {
      const { top, left } = button.getBoundingClientRect();
      dropDown.style.top = `${top + button.offsetHeight + dropDownPadding}px`;
      dropDown.style.left = `${Math.min(
        left,
        window.innerWidth - dropDown.offsetWidth - 20
      )}px`;
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target;
        if (!isDOMNode(target)) {
          return;
        }
        if (stopCloseOnClickSelf) {
          if (dropDownRef.current && dropDownRef.current.contains(target)) {
            return;
          }
        }
        if (!button.contains(target)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }

    return undefined;
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);

  useEffect(() => {
    const handleButtonPositionUpdate = () => {
      if (showDropDown) {
        const button = buttonRef.current;
        const dropDown = dropDownRef.current;
        if (button !== null && dropDown !== null) {
          const { top } = button.getBoundingClientRect();
          const newPosition = top + button.offsetHeight + dropDownPadding;
          if (newPosition !== dropDown.getBoundingClientRect().top) {
            dropDown.style.top = `${newPosition}px`;
          }
        }
      }
    };

    document.addEventListener('scroll', handleButtonPositionUpdate);

    return () => {
      document.removeEventListener('scroll', handleButtonPositionUpdate);
    };
  }, [buttonRef, dropDownRef, showDropDown]);

  return (
    <>
      <Button
        disabled={disabled}
        aria-label={buttonAriaLabel || buttonLabel}
        className={cn(styles.dropdown, buttonClassName)}
        onClick={() => setShowDropDown(!showDropDown)}
        ref={buttonRef}
      >
        <Flex className={cn(styles.icon, buttonIconClassName)}>
          {iconComponent}
        </Flex>

        {buttonLabel && (
          <Typography.Text className={styles.text}>
            {buttonLabel}
          </Typography.Text>
        )}
        <div className={styles.arrowIcon}>
          <ChevronDown
            fill={showDropDown ? colors.secondary : colors.contrPrimary}
          />
        </div>
      </Button>

      {showDropDown &&
        createPortal(
          <DropDownItems dropDownRef={dropDownRef} onClose={handleClose}>
            {children}
          </DropDownItems>,
          document.body
        )}
    </>
  );
}
