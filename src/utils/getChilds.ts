import { PreparedNodeType } from "types/TreeTypes"

const getChildIds = (dataTree: PreparedNodeType) => {
  const childsIds: number[] = []

  const iterator = (tree: PreparedNodeType) => {
    if (tree.childNodes.length === 0) return

    tree.childNodes.forEach((node) => {
      childsIds.push(node.id)
      iterator(node)
    })
  }

  iterator(dataTree)

  return childsIds
}

export default getChildIds
