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
  betweenPathHandler,
  activeNodes,
  activeLeaf,
  activePaths,
  path,
}: NodeProps) => {
  const isLeaf = node.childNodes.length === 0

  const getActiveNodeColor = () => {
    const pathA = activePaths?.[0] || []
    const pathB = activePaths?.[1] || []
    const activeElements = [pathA[pathA.length - 1], pathB[pathB.length - 1]]

    switch (true) {
      case activeElements.includes(node.id):
        return "pink"
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
      let isActiveLine = false
      switch (true) {
        case Boolean(activeLeaf):
          isActiveLine = activeNodes.includes(n.id)
          break
        case Boolean(activePaths): {
          const withoutFirst = activeNodes.slice(1)
          isActiveLine = withoutFirst.includes(n.id)
          break
        }
        default:
          isActiveLine = activeNodes.includes(n.parent_id || 0)
          break
      }

      return (
        n.parent_id &&
        n.parent_xy && (
          <line
            x1={n.x}
            y1={n.y}
            x2={n.parent_xy.x}
            y2={n.parent_xy.y}
            stroke={isActiveLine ? "aqua" : "black"}
          />
        )
      )
    },
    [activeLeaf, activeNodes, activePaths]
  )

  return (
    <>
      {rootSvg.current && createPortal(renderLine(node), rootSvg.current)}
      <g
        onClick={(e) => {
          if (e.shiftKey) {
            betweenPathHandler(path)
            return
          }

          if (isLeaf) {
            leafClickHandler(node.id, path)
            return
          }

          nodeClickHandler(node)
        }}
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
