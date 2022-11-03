import { useCallback, useLayoutEffect, useRef, useState } from "react"
import {
  PreparedNodeType,
  ActiveNodeType,
  SVGRefType,
  TreeType,
} from "types/Tree"
import createDataTree from "utils/createDataTree"
import getChildIds from "utils/getChilds"
import Recursive from "./Recursive"

type TreeProps = { tree: TreeType }

const Tree = ({ tree }: TreeProps) => {
  const preparedTree = createDataTree(tree)
  const [activeNodes, setActiveNodes] = useState<ActiveNodeType>([])
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)
  const rootSvg = useRef<SVGSVGElement>(null)

  const setActiveNodeHandler = useCallback((node: PreparedNodeType) => {
    const ids = getChildIds(node)
    setActiveNodes([node.id, ...ids])
  }, [])

  useLayoutEffect(() => {
    setTargetRef(rootSvg)
  }, [rootSvg])

  return (
    <div style={{ width: "500px", height: "500px", fontSize: "10px" }}>
      <svg viewBox="0 -10 500 500" xmlns="http://www.w3.org/2000/svg">
        <svg
          ref={rootSvg}
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        />
        {targetRef && (
          <Recursive
            preparedTree={preparedTree}
            rootSvg={targetRef}
            activeNodes={activeNodes}
            clickHandler={setActiveNodeHandler}
          />
        )}
      </svg>
    </div>
  )
}

export default Tree
