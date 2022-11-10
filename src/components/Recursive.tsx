import { Fragment } from "react"
import { CommonPropsType, PreparedTreeType } from "types/Tree"
import Node from "./Node"

interface TreeProps extends CommonPropsType {
  preparedTree: PreparedTreeType
}

const Recursive = ({
  preparedTree,
  rootSvg,
  nodeClickHandler,
  leafClickHandler,
  betweenPathHandler,
  activeNodes,
  activeLeaf,
  activeElements,
  path,
}: TreeProps) => {
  return (
    <>
      {preparedTree.map((node) => (
        <Fragment key={node.id}>
          <Node
            node={node}
            rootSvg={rootSvg}
            activeNodes={activeNodes}
            activeLeaf={activeLeaf}
            activeElements={activeElements}
            nodeClickHandler={nodeClickHandler}
            leafClickHandler={leafClickHandler}
            betweenPathHandler={betweenPathHandler}
            path={[...path, node.id]}
          />
          {node.childNodes.length !== 0 && (
            <Recursive
              preparedTree={node.childNodes}
              rootSvg={rootSvg}
              activeNodes={activeNodes}
              activeLeaf={activeLeaf}
              activeElements={activeElements}
              nodeClickHandler={nodeClickHandler}
              leafClickHandler={leafClickHandler}
              betweenPathHandler={betweenPathHandler}
              path={[...path, node.id]}
            />
          )}
        </Fragment>
      ))}
    </>
  )
}

export default Recursive
