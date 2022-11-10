import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import {
  PreparedNodeType,
  ActiveNodesType,
  SVGRefType,
  TreeType,
  PathType,
  NodeClickHandlerType,
  CommonClickHandlerType,
} from "types/Tree"
import createDataTree from "utils/createDataTree"
import getChildIds from "utils/getChilds"
import getPathBetweenNodes from "utils/getPathBetweenNodes"
import Recursive from "./Recursive"

type TreeProps = { tree: TreeType }

const Tree = ({ tree }: TreeProps) => {
  const preparedTree = createDataTree(tree)
  const [activeNodes, setActiveNodes] = useState<ActiveNodesType>([])
  const [activeLeaf, setActiveLeaf] = useState<null | number>(null)
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)
  const [activePaths, setActivePaths] = useState<PathType[] | null>(null)
  const [activeElements, setActiveElements] = useState<number[] | null>(null)

  const rootSvg = useRef<SVGSVGElement>(null)

  const setBetweenNodePath = useCallback<CommonClickHandlerType>((id, path) => {
    setActiveLeaf(null)
    setActiveElements((prev) => {
      if (!prev) {
        return [id]
      }

      return [id, prev[0]]
    })

    setActivePaths((prev) => {
      if (!prev) {
        return [path]
      }

      return [path, prev[0]]
    })
  }, [])

  const setActiveNodeHandler = useCallback<NodeClickHandlerType>(
    (node) => {
      setActiveElements(null)
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

  const setActiveLeafHandler = useCallback<CommonClickHandlerType>(
    (id, path) => {
      setActiveElements(null)
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
            activeElements={activeElements}
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
