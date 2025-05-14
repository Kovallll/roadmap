import { useContext, useEffect, useRef } from 'react';
import { Button } from 'antd';

import { DropDownContext } from '@/entities/NodeContentEditor/model';

export function DropDownItem({
  children,
  className,
  onClick,
  title,
}: {
  children: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

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
    <Button className={className} onClick={onClick} ref={ref} title={title}>
      {children}
    </Button>
  );
}
