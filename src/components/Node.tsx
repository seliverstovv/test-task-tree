import { useCallback } from "react"
import { createPortal } from "react-dom"
import { useAppDispath, useAppSelector } from "store/hooks"
import { CommonPropsType, PreparedNodeType } from "types/TreeTypes"
import {
  setActiveLeaf,
  setActiveNodes,
  setActivePaths,
} from "features/TreeSlice"
import {
  activeNodes,
  activeLeaf,
  activePathFirstItemsSelector,
} from "features/selectors"

type NodeProps = CommonPropsType & {
  node: PreparedNodeType
}

const Node = ({ node, rootSvg, path }: NodeProps) => {
  const isLeaf = node.childNodes.length === 0
  const dispatch = useAppDispath()
  const activeNodesState = useAppSelector(activeNodes)
  const activeLeafState = useAppSelector(activeLeaf)
  const activePathElements = useAppSelector(activePathFirstItemsSelector)

  const getActiveNodeColor = () => {
    switch (true) {
      case activePathElements.includes(node.id):
        return "pink"
      case activeLeafState === node.id:
        return "tomato"
      case activeNodesState.includes(node.id):
        return "lime"
      default:
        return "gray"
    }
  }

  const renderLine = useCallback(
    (n: PreparedNodeType) => {
      let isActiveLine = false
      switch (true) {
        case Boolean(activePathElements): {
          const withoutFirst = activeNodesState.slice(1)
          isActiveLine = withoutFirst.includes(n.id)
          break
        }
        case Boolean(activeLeaf):
          isActiveLine = activeNodesState.includes(n.id)
          break
        default:
          isActiveLine = activeNodesState.includes(n.parent_id || 0)
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
    [activeNodesState, activePathElements]
  )

  return (
    <>
      {rootSvg.current && createPortal(renderLine(node), rootSvg.current)}
      <g
        onClick={(e) => {
          if (e.shiftKey) {
            dispatch(setActivePaths(path))
            return
          }

          if (isLeaf) {
            dispatch(setActiveLeaf({ id: node.id, path }))
            return
          }

          dispatch(setActiveNodes(node))
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
