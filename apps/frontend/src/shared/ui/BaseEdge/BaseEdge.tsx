import cn from 'classnames';

import styles from './styles.module.scss';

import { getEdgePath } from '@/shared/lib';
import { colors } from '@/shared/styles/theme';
import { useSelectedEdgeStore } from '@/widgets/EdgeSidebar/model';
import {
  BaseEdge as FlowBaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
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
  const selectedEdge = useSelectedEdgeStore.use.selectedEdge();
  const type = String(data?.type);
  const { path, labelX, labelY } = getEdgePath(type, {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const textColor = String(data?.color) || colors.black;
  const strokeWidth = Number(data?.strokeWidth);
  const strokeColor = String(data?.strokeColor ?? colors.primary);
  const label = String(data?.label ?? '');

  const getEdgeColor = () => {
    if (selectedEdge?.id === id) {
      return colors.secondary;
    } else return strokeColor;
  };

  const edgeStyles = {
    strokeWidth,
    stroke: getEdgeColor(),
  };

  const labelStyles = {
    left: labelX,
    top: labelY,
    color: textColor,
  };
  return (
    <>
      <FlowBaseEdge id={id} path={path} {...props} style={edgeStyles} />
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
