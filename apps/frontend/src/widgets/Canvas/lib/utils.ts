import { colors } from '@/shared/styles/theme';
import { Node } from '@xyflow/react';

export const nodeColor = (node: Node) => {
  switch (node.type) {
    default:
      return colors.secondary;
  }
};
