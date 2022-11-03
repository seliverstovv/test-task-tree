import { useCallback } from "react"
import { createPortal } from "react-dom"
import { CommonPropsType, PreparedNodeType } from "types/Tree"

interface NodeProps extends CommonPropsType {
  node: PreparedNodeType
}

const Node = ({ node, rootSvg, clickHandler, activeNodes }: NodeProps) => {
  const renderLine = useCallback(
    (n: PreparedNodeType) =>
      n.parent_id &&
      n.parent_xy && (
        <line
          x1={n.x}
          y1={n.y}
          x2={n.parent_xy.x}
          y2={n.parent_xy.y}
          stroke={activeNodes.includes(n.parent_id) ? "aqua" : "black"}
        />
      ),
    [activeNodes]
  )

  return (
    <>
      {rootSvg.current && createPortal(renderLine(node), rootSvg.current)}
      <g onClick={() => clickHandler(node)}>
        <circle
          stroke={activeNodes.includes(node.id) ? "lime" : "gray"}
          cx={node.x}
          cy={node.y}
          r="5"
          fill="white"
          style={{ cursor: "pointer" }}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          fill="black"
          dy=".3em"
          fontSize={5}
          style={{ cursor: "pointer" }}
        >
          {node.id}
        </text>
      </g>
    </>
  )
}

export default Node
