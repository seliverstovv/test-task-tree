import { Fragment } from "react"
import { CommonPropsType, PreparedTreeType } from "types/TreeTypes"
import Node from "./Node"

type TreeProps = CommonPropsType & {
  preparedTree: PreparedTreeType
}

const Recursive = ({ preparedTree, rootSvg, path }: TreeProps) => {
  return (
    <>
      {preparedTree.map((node) => (
        <Fragment key={node.id}>
          <Node node={node} rootSvg={rootSvg} path={[...path, node.id]} />
          {node.childNodes.length !== 0 && (
            <Recursive
              preparedTree={node.childNodes}
              rootSvg={rootSvg}
              path={[...path, node.id]}
            />
          )}
        </Fragment>
      ))}
    </>
  )
}

export default Recursive
