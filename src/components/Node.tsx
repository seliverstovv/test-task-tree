import { useCallback } from "react"
import { createPortal } from "react-dom"
import { CommonPropsType, PreparedNodeType } from "types/Tree"

interface NodeProps extends CommonPropsType {
  node: PreparedNodeType
}

const Node = ({
  node,
  rootSvg,
  nodeClickHandler,
  leafClickHandler,
  activeNodes,
  activeLeaf,
  path,
}: NodeProps) => {
  const isLeaf = node.childNodes.length === 0

  const getActiveNodeColor = () => {
    switch (true) {
      case activeLeaf === node.id:
        return "tomato"
      case activeNodes.includes(node.id):
        return "lime"
      default:
        return "gray"
    }
  }

  const renderLine = useCallback(
    (n: PreparedNodeType) => {
      const isSelectPath = activeLeaf
      const targetId = isSelectPath ? n.id : n.parent_id || -1

      return (
        n.parent_id &&
        n.parent_xy && (
          <line
            x1={n.x}
            y1={n.y}
            x2={n.parent_xy.x}
            y2={n.parent_xy.y}
            stroke={activeNodes.includes(targetId) ? "aqua" : "black"}
          />
        )
      )
    },
    [activeLeaf, activeNodes]
  )

  return (
    <>
      {rootSvg.current && createPortal(renderLine(node), rootSvg.current)}
      <g
        onClick={() =>
          isLeaf ? leafClickHandler(node.id, path) : nodeClickHandler(node)
        }
      >
        <circle
          stroke={getActiveNodeColor()}
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
