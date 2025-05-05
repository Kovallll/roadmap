import cn from 'classnames';

import styles from './styles.module.scss';

import { colors } from '@/shared/styles/theme';
import {
  BaseEdge as FlowBaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from '@xyflow/react';

export const BaseEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  ...props
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const textColor = String(data?.color) || colors.black;
  const strokeWidth = Number(data?.strokeWidth) || 2;
  const strokeColor = String(data?.strokeColor) || colors.black;
  const label = String(data?.label) || '';

  const edgeStyles = {
    strokeWidth,
    stroke: strokeColor,
  };

  const labelStyles = {
    left: `${labelX}px`,
    top: `${labelY}px`,
    color: textColor,
  };

  return (
    <>
      <FlowBaseEdge id={id} path={edgePath} {...props} style={edgeStyles} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={labelStyles}
            className={cn(
              styles.label,
              'edge-label-renderer__custom-edge nodrag nopan'
            )}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
