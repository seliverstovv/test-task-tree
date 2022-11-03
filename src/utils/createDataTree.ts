import { PreparedTreeType, TreeType } from "types/Tree"

const createDataTree = (flatTree: TreeType) => {
  const hashTable: PreparedTreeType = Object.create(null)

  flatTree.forEach((node) => {
    hashTable[node.id] = { ...node, childNodes: [] }
  })

  const dataTree: PreparedTreeType = []

  flatTree.forEach((node) => {
    if (node.parent_id) {
      hashTable[node.id].parent_xy = {
        x: hashTable[node.parent_id].x,
        y: hashTable[node.parent_id].y,
      }
      hashTable[node.parent_id].childNodes.push(hashTable[node.id])
    } else {
      dataTree.push(hashTable[node.id])
    }
  })

  return dataTree
}

export default createDataTree
