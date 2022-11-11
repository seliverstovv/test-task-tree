import {
  ActivePathType,
  ActiveLeafType,
  ActiveModeType,
  ActiveNodesType,
} from "features/selectors"
import { PreparedNodeType } from "types/TreeTypes"

const useNodeStyles = (
  node: PreparedNodeType,
  activePathElements: ActivePathType,
  activeLeaf: ActiveLeafType,
  activeNodes: ActiveNodesType,
  selectMode: ActiveModeType
) => {
  switch (true) {
    case activePathElements?.includes(node.id):
      return {
        color: "pink",
        strokeWith: 2,
      }
    case activeLeaf === node.id:
      return {
        color: "tomato",
        strokeWith: 2,
      }
    case activeNodes.includes(node.id): {
      const firstItem = activeNodes[0]
      const isSelectFirstItem = firstItem === node.id && selectMode === "node"

      return {
        color: "lightgreen",
        strokeWith: isSelectFirstItem ? 2 : 1,
      }
    }
    default:
      return {
        color: "gray",
        strokeWith: 1,
      }
  }
}

export default useNodeStyles
