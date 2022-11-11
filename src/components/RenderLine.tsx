import { useAppSelector } from "store/hooks"
import { activeNodesSelector, selectModeSelector } from "features/selectors"
import { PreparedNodeType } from "types/TreeTypes"

type RenderLineProps = {
  node: PreparedNodeType
}

const RenderLine = ({ node }: RenderLineProps) => {
  const selectMode = useAppSelector(selectModeSelector)
  const activeNodes = useAppSelector(activeNodesSelector)

  const { id, x, y, parent_id, parent_xy } = node

  const getLineColor = () => {
    const disabledColor = "gray"
    switch (true) {
      case selectMode === "path": {
        const withoutFirst = activeNodes.slice(1)
        const isActive = withoutFirst.includes(id)
        return isActive ? "palevioletred" : disabledColor
      }

      case selectMode === "leaf": {
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
      <line x1={x} y1={y} x2={parent_xy.x} y2={parent_xy.y} stroke={getLineColor()} />
    )
  )
}

export default RenderLine
