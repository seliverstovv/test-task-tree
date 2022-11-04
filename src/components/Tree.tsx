import { useCallback, useLayoutEffect, useRef, useState } from "react"
import {
  PreparedNodeType,
  ActiveNodesType,
  SVGRefType,
  TreeType,
  PathType,
} from "types/Tree"
import createDataTree from "utils/createDataTree"
import getChildIds from "utils/getChilds"
import Recursive from "./Recursive"

type TreeProps = { tree: TreeType }

const Tree = ({ tree }: TreeProps) => {
  const preparedTree = createDataTree(tree)
  const [activeNodes, setActiveNodes] = useState<ActiveNodesType>([])
  const [activeLeaf, setActiveLeaf] = useState<null | number>(null)
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)
  const rootSvg = useRef<SVGSVGElement>(null)

  const setActiveNodeHandler = useCallback(
    (node: PreparedNodeType) => {
      setActiveLeaf(null)

      if (node.id === activeNodes[0]) {
        setActiveNodes([])
        return
      }

      const ids = getChildIds(node)
      setActiveNodes([node.id, ...ids])
    },
    [activeNodes]
  )

  const setActiveLeafHandler = useCallback((id: number, path: PathType) => {
    setActiveLeaf(id)
    setActiveNodes(path)
  }, [])

  useLayoutEffect(() => {
    setTargetRef(rootSvg)
  }, [rootSvg])

  return (
    <div
      style={{
        fontSize: "10px",
        paddingBottom: "92%",
      }}
      className="scaling-svg-container"
    >
      <svg
        viewBox="0 -10 500 500"
        xmlns="http://www.w3.org/2000/svg"
        className="scaling-svg"
      >
        <g className="svgLinesGroup" ref={rootSvg} width="500" height="500" />
        {targetRef && (
          <Recursive
            preparedTree={preparedTree}
            rootSvg={targetRef}
            activeNodes={activeNodes}
            activeLeaf={activeLeaf}
            nodeClickHandler={setActiveNodeHandler}
            leafClickHandler={setActiveLeafHandler}
            path={[]}
          />
        )}
      </svg>
    </div>
  )
}

export default Tree
