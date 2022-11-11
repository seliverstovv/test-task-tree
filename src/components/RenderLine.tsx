import { ActiveItemsPathType } from "features/selectors"
import { NodeIdsType, NodeIdType, PreparedNodeType } from "types/TreeTypes"

type RenderLineProps = {
  node: PreparedNodeType
  activePathElements: ActiveItemsPathType
  activeNodes: NodeIdsType
  activeLeaf: NodeIdType | null
}

const RenderLine = (props: RenderLineProps) => {
  const { node, activeNodes, activeLeaf, activePathElements } = props
  const { id, x, y, parent_id, parent_xy } = node

  const getLineColor = () => {
    const disabledColor = "gray"
    switch (true) {
      case Boolean(activePathElements): {
        const withoutFirst = activeNodes.slice(1)
        const isActive = withoutFirst.includes(id)
        return isActive ? "palevioletred" : disabledColor
      }

      case Boolean(activeLeaf): {
        const isActive = activeNodes.includes(id)
        return isActive ? "yellowgreen" : disabledColor
      }

      default: {
        const isActive = activeNodes.includes(parent_id || -1)
        return isActive ? "lightgreen" : disabledColor
      }
    }
  }

  return (
    parent_id &&
    parent_xy && (
      <line
        x1={x}
        y1={y}
        x2={parent_xy.x}
        y2={parent_xy.y}
        stroke={getLineColor()}
      />
    )
  )
}

export default RenderLine
