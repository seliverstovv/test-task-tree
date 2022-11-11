import { NodeIdsType } from "types/TreeTypes"

const getPathBetweenNodes = (pathA: NodeIdsType, pathB: NodeIdsType) => {
  let rootElement = 0
  const lastIndexA = pathA.length - 1
  const lastIndexB = pathB.length - 1

  if (lastIndexA < 0 || lastIndexB < 0) return []

  let cursorA = 0
  let cursorB = 0

  while (cursorA < lastIndexA || cursorB < lastIndexB) {
    if (pathA[cursorA] !== pathB[cursorB]) {
      break
    }

    rootElement = pathA[cursorA]

    cursorA += 1
    cursorB += 1
  }

  const result = [rootElement, ...pathA.slice(cursorA), ...pathB.slice(cursorB)]

  return result
}

export default getPathBetweenNodes
