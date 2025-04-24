import { useRef } from 'react';
import { Node } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

export const useId = () => {
  const id = useRef(0);
  return () => `node_${id.current++}`;
};

export const createNode = (
  type: string,
  position: { x: number; y: number }
): Node => ({
  id: uuidv4(),
  type,
  data: { label: `${type} Node` },
  position,
});
