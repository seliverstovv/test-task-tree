import { useLayoutEffect, useRef, useState } from "react"
import { SVGRefType, PreparedTreeType } from "types/TreeTypes"
import styles from "styles/tree.module.css"
import Recursive from "./Recursive"

type TreeProps = {
  preparedTree: PreparedTreeType
}

const Tree = ({ preparedTree }: TreeProps) => {
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)

  const rootSvg = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    setTargetRef(rootSvg)
  }, [rootSvg])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="15 -10 150 100" width="100%">
      <g ref={rootSvg} className={styles.svgLinesGroup} />
      <g>
        {targetRef && <Recursive preparedTree={preparedTree} rootSvg={targetRef} path={[]} />}
      </g>
    </svg>
  )
}

export default Tree
