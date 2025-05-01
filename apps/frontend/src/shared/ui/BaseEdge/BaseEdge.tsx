import { EdgeProps, getBezierPath } from '@xyflow/react';

export const BaseEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const strokeColor = data?.strokeColor || '#000';
  const strokeWidth = data?.strokeWidth || 2;
  const label = data?.label || '';

  const labelStyle = {
    fontSize: data?.fontSize || 12,
    fill: data?.fontColor || '#000',
    background: data?.labelBackground || 'transparent',
    padding: '2px 4px',
    borderRadius: '4px',
  };

  return (
    <>
      <path
        id={id}
        style={{
          stroke: strokeColor,
          strokeWidth,
          ...style,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        fill="none"
      />
      {label && (
        <foreignObject
          width={100}
          height={40}
          x={labelX - 50}
          y={labelY - 20}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div
            style={{
              ...labelStyle,
              width: '100%',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {label}
          </div>
        </foreignObject>
      )}
    </>
  );
};
