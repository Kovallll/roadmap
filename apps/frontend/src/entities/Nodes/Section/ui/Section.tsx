// import { memo, useEffect, useRef } from 'react';

// import { areNodePropsEqual } from '../../lib';
// import styles from './styles.module.scss';

// import { NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';

// export const SectionNode = memo(({ id, selected }: NodeProps) => {
//   const { getNode, getNodes } = useReactFlow();

//   const prevPositionRef = useRef({ x: 0, y: 0 });
//   const nestedNodeIdsRef = useRef<Set<string>>(new Set());

//   useEffect(() => {
//     const sectionNode = getNode(id);
//     if (!sectionNode) return;

//     const { x, y } = sectionNode.position;
//     const { width = 0, height = 0 } = sectionNode.measured || {};

//     const deltaX = x - prevPositionRef.current.x;
//     const deltaY = y - prevPositionRef.current.y;

//     prevPositionRef.current = { x, y };

//     if (nestedNodeIdsRef.current.size === 0) {
//       const sectionBounds = {
//         left: x,
//         right: x + width,
//         top: y,
//         bottom: y + height,
//       };

//       getNodes().forEach((node) => {
//         if (node.id === id) return;

//         const nodeX = node.position.x;
//         const nodeY = node.position.y;
//         const nodeWidth = node.measured?.width || 0;
//         const nodeHeight = node.measured?.height || 0;

//         const isInside =
//           nodeX >= sectionBounds.left &&
//           nodeX + nodeWidth <= sectionBounds.right &&
//           nodeY >= sectionBounds.top &&
//           nodeY + nodeHeight <= sectionBounds.bottom;

//         if (isInside) nestedNodeIdsRef.current.add(node.id);
//       });
//     }

//     if (!deltaX && !deltaY) return;
//     if (nestedNodeIdsRef.current.size === 0) return;

//     setNodes((nodes) =>
//       nodes.map((node) => {
//         if (nestedNodeIdsRef.current.has(node.id)) {
//           return {
//             ...node,
//             position: {
//               x: node.position.x + deltaX,
//               y: node.position.y + deltaY,
//             },
//           };
//         }
//         return node;
//       })
//     );
//   });

//   return (
//     <div className={styles.section}>
//       {selected && (
//         <div className={styles.resizer}>
//           <NodeResizer isVisible minWidth={150} minHeight={50} />
//         </div>
//       )}
//     </div>
//   );
// }, areNodePropsEqual);
