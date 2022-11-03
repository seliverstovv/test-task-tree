import { Fragment } from "react"
import { CommonPropsType, PreparedTreeType } from "types/Tree"
import Node from "./Node"

interface TreeProps extends CommonPropsType {
  preparedTree: PreparedTreeType
}

const Recursive = ({
  preparedTree,
  rootSvg,
  clickHandler,
  activeNodes,
}: TreeProps) => {
  return (
    <>
      {preparedTree.map((node) => (
        <Fragment key={node.id}>
          <Node
            node={node}
            rootSvg={rootSvg}
            activeNodes={activeNodes}
            clickHandler={clickHandler}
          />
          {node.childNodes.length !== 0 && (
            <Recursive
              preparedTree={node.childNodes}
              rootSvg={rootSvg}
              activeNodes={activeNodes}
              clickHandler={clickHandler}
            />
          )}
        </Fragment>
      ))}
    </>
  )
}

export default Recursive
