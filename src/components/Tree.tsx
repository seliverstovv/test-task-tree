import { useLayoutEffect, useRef, useState } from "react"
import { SVGRefType, TreeType } from "types/Tree"
import createDataTree from "utils/createDataTree"
import Recursive from "./Recursive"

type TreeProps = { tree: TreeType }

const Tree = ({ tree }: TreeProps) => {
  const preparedTree = createDataTree(tree)
  const [selectNode, setSelectNode] = useState<number | false>(false)
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)
  const rootSvg = useRef<SVGSVGElement>(null)

  const selectNodeHandler = (nodeId: number) => {
    setSelectNode((prev) => (prev === nodeId ? false : nodeId))
  }

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
            selectNode={selectNode}
            clickHandler={selectNodeHandler}
            isSelectedChilds={false}
          />
        )}
      </svg>
    </div>
  )
}

export default Tree
