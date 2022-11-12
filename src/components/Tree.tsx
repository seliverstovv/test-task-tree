import { useLayoutEffect, useRef, useState } from "react"
import { SVGRefType, PreparedTreeType } from "types/TreeTypes"
import styles from "styles/tree.module.css"
import Recursive from "./Recursive"

type TreeProps = {
  preparedTree: PreparedTreeType
}

const Tree = ({ preparedTree }: TreeProps) => {
  const [targetRef, setTargetRef] = useState<SVGRefType | null>(null)
  const [targetHeight, setTargetHeight] = useState<number | null>(null)

  const rootSvg = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    setTargetRef(rootSvg)
  }, [rootSvg])

  // todo: come up with an optimal solution to control the scale of the tree
  useLayoutEffect(() => {
    // calculation of the height is necessary to control the scroll,
    // because we don't know how many nodes contains the server respones
    setTargetHeight(targetRef?.current?.getBoundingClientRect().height || null)
  }, [targetRef])

  return (
    <div className={styles.scaleRoot}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svgRoot}
        // for scale to 3.5 (if you change the scale, you need to change calc)
        style={{ height: `${targetHeight! / 3}px` }}
      >
        <g className={styles.svgInside} transform="scale(0.9 0.9)">
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
