import { useLayoutEffect, useRef, useState } from "react"
import { SVGRefType, PreparedTreeType } from "types/TreeTypes"
import Recursive from "./Recursive"

type TreeProps = { preparedTree: PreparedTreeType }

const Tree = ({ preparedTree }: TreeProps) => {
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)

  const rootSvg = useRef<SVGSVGElement>(null)

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
            path={[]}
          />
        )}
      </svg>
    </div>
  )
}

export default Tree
