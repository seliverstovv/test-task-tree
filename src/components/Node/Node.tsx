import { createPortal } from "react-dom"
import { useAppDispath, useAppSelector } from "store/hooks"
import { CommonPropsType, PreparedNodeType } from "types/TreeTypes"
import { setActiveLeaf, setActiveNodes, setActivePaths } from "features/TreeSlice"
import {
  activeNodesSelector,
  activeLeafSelector,
  activePathSelector,
  activeModeSelector,
} from "features/selectors"
import RenderLine from "components/Node/RenderLine"
import styles from "styles/node.module.css"
import useNodeStyles from "./useNodeStyles"

type NodeProps = CommonPropsType & {
  node: PreparedNodeType
}

const Node = ({ node, rootSvg, path }: NodeProps) => {
  const isLeaf = node.childNodes.length === 0
  const dispatch = useAppDispath()
  const activeNodes = useAppSelector(activeNodesSelector)
  const activeLeaf = useAppSelector(activeLeafSelector)
  const selectMode = useAppSelector(activeModeSelector)
  const activePathElements = useAppSelector(activePathSelector)

  const { color, strokeWith } = useNodeStyles(
    node,
    activePathElements,
    activeLeaf,
    activeNodes,
    selectMode
  )

  return (
    <>
      {rootSvg.current && createPortal(RenderLine({ node }), rootSvg.current)}
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
          stroke={color}
          cx={node.x}
          cy={node.y}
          r="5"
          fill="white"
          className={styles.item}
          strokeWidth={strokeWith}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          fill="black"
          dy=".3em"
          fontSize={5}
          className={styles.item}
        >
          {node.id}
        </text>
      </g>
    </>
  )
}

export default Node
