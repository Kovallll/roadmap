import { colors } from '@/shared/styles/theme/theme';
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
  const label = data?.label || '';

  return (
    <>
      <FlowBaseEdge
        id={id}
        path={edgePath}
        {...props}
        style={{ strokeWidth, stroke: strokeColor }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              left: `${labelX}px`,
              top: `${labelY}px`,
              transform: 'translate(-50%, -50%)',
              color: textColor,
              whiteSpace: 'nowrap',
              fontSize: 12,
              background: 'white',
              padding: '2px 4px',
              borderRadius: 4,
              pointerEvents: 'none',
            }}
            className="edge-label-renderer__custom-edge nodrag nopan"
          >
            {String(label)}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
