import { useLayoutEffect, useRef, useState } from "react"
import { SVGRefType, PreparedTreeType } from "types/TreeTypes"
import { useAppSelector } from "store/hooks"
import { scaleValueSelector } from "features/selectors"
import styles from "styles/tree.module.css"
import Recursive from "./Recursive"

type TreeProps = {
  preparedTree: PreparedTreeType
}

const Tree = ({ preparedTree }: TreeProps) => {
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)
  const scaleValue = useAppSelector(scaleValueSelector)

  const rootSvg = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    setTargetRef(rootSvg)
  }, [rootSvg])

  return (
    <div className={styles.scaleRoot} style={{ transform: `scale(${scaleValue})` }}>
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.svgRoot}>
        <g className={styles.svgInside}>
          <g ref={rootSvg} className={styles.svgLinesGroup} />
          <g>
            {targetRef && (
              <Recursive preparedTree={preparedTree} rootSvg={targetRef} path={[]} />
            )}
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Tree
