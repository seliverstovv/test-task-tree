import { Fragment } from "react"
import { CommonPropsType, PreparedTreeType } from "types/Tree"
import Node from "./Node"

interface TreeProps extends CommonPropsType {
  preparedTree: PreparedTreeType
  isSelectedChilds: boolean
}

const Recursive = ({
  preparedTree,
  rootSvg,
  clickHandler,
  selectNode,
  isSelectedChilds,
}: TreeProps) => {
  return (
    <>
      {preparedTree.map((node) => (
        <Fragment key={node.id}>
          <Node
            node={node}
            rootSvg={rootSvg}
            selectNode={selectNode}
            clickHandler={clickHandler}
            isSelectedChilds={isSelectedChilds}
          />
          {node.childNodes.length !== 0 && (
            <Recursive
              preparedTree={node.childNodes}
              rootSvg={rootSvg}
              selectNode={selectNode}
              clickHandler={clickHandler}
              isSelectedChilds={
                selectNode === node.id || selectNode === node.parent_id
              }
            />
          )}
        </Fragment>
      ))}
    </>
  )
}

export default Recursive
