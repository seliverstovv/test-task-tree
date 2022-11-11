import { useCallback, useLayoutEffect, useRef, useState } from "react"
import {
  ActiveNodesType,
  SVGRefType,
  PathType,
  NodeClickHandlerType,
  LeafClickHandlerType,
  PathClickHandlerType,
  PreparedTreeType,
} from "types/Tree"
import getChildIds from "utils/getChilds"
import getPathBetweenNodes from "utils/getPathBetweenNodes"
import Recursive from "./Recursive"

type TreeProps = { preparedTree: PreparedTreeType }

const Tree = ({ preparedTree }: TreeProps) => {
  const [activeNodes, setActiveNodes] = useState<ActiveNodesType>([])
  const [activeLeaf, setActiveLeaf] = useState<null | number>(null)
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)
  const [activePaths, setActivePaths] = useState<PathType[] | null>(null)

  const rootSvg = useRef<SVGSVGElement>(null)

  const setBetweenNodePath = useCallback<PathClickHandlerType>((path) => {
    setActiveLeaf(null)

    setActivePaths((prev) => {
      if (!prev) {
        return [path]
      }

      return [path, prev[0]]
    })
  }, [])

  const setActiveNodeHandler = useCallback<NodeClickHandlerType>(
    (node) => {
      setActivePaths(null)

      const setSelectChilds = () => {
        const ids = getChildIds(node)
        setActiveNodes([node.id, ...ids])
      }

      if (activeLeaf) {
        setActiveLeaf(null)
        setSelectChilds()
        return
      }

      if (node.id === activeNodes[0]) {
        setActiveNodes([])
        return
      }

      setSelectChilds()
    },
    [activeLeaf, activeNodes]
  )

  const setActiveLeafHandler = useCallback<LeafClickHandlerType>(
    (id, path) => {
      setActivePaths(null)

      if (id === activeLeaf) {
        setActiveLeaf(null)
        setActiveNodes([])
        return
      }

      setActiveLeaf(id)
      setActiveNodes(path)
    },
    [activeLeaf]
  )

  useLayoutEffect(() => {
    setTargetRef(rootSvg)

    if (activePaths?.length === 2) {
      setActiveNodes(() => getPathBetweenNodes(activePaths[0], activePaths[1]))
    } else if (activePaths?.length === 1) {
      setActiveNodes(activePaths[0])
    }
  }, [activePaths, rootSvg])

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
            activePaths={activePaths}
            nodeClickHandler={setActiveNodeHandler}
            leafClickHandler={setActiveLeafHandler}
            betweenPathHandler={setBetweenNodePath}
            path={[]}
          />
        )}
      </svg>
    </div>
  )
}

export default Tree
