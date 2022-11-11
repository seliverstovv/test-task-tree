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
  activeItemsPathSelector,
} from "features/selectors"
import RenderLine from "components/RenderLine"

type NodeProps = CommonPropsType & {
  node: PreparedNodeType
}

const Node = ({ node, rootSvg, path }: NodeProps) => {
  const isLeaf = node.childNodes.length === 0
  const dispatch = useAppDispath()
  const activeNodesState = useAppSelector(activeNodes)
  const activeLeafState = useAppSelector(activeLeaf)
  const activePathElements = useAppSelector(activeItemsPathSelector)

  const getNodeColor = () => {
    switch (true) {
      case activePathElements?.includes(node.id):
        return "pink"
      case activeLeafState === node.id:
        return "tomato"
      case activeNodesState.includes(node.id):
        return "lightgreen"
      default:
        return "gray"
    }
  }

  return (
    <>
      {rootSvg.current &&
        createPortal(
          RenderLine({
            node,
            activeNodes: activeNodesState,
            activeLeaf: activeLeafState,
            activePathElements,
          }),
          rootSvg.current
        )}
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
          stroke={getNodeColor()}
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
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {node.id}
        </text>
      </g>
    </>
  )
}

export default Node
