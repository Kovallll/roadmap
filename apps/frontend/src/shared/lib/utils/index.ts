import { Node } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { nodeStatuses } from '../constants';
import { colors } from '@/shared/styles/theme';

export const createNode = (
  type: string,
  position: { x: number; y: number }
): Node => {
  if (type === 'section') {
    return {
      id: uuidv4(),
      type,
      data: { label: `${type}` },
      position,
      connectable: false,
    };
  }
  return {
    id: uuidv4(),
    type,
    data: { label: `${type}` },
    position,
  };
};

export const getStatusColor = (status: string) => {
  return (
    nodeStatuses.find((node) => status === node.value)?.color ?? colors.black
  );
};

export const capitalizeText = (text: string) => {
  return text[0].toUpperCase() + text.slice(1);
};
