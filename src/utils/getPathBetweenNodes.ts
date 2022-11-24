import { NodeIdsType } from "types/TreeTypes"

const getPathBetweenNodes = (pathA: NodeIdsType, pathB: NodeIdsType) => {
  let rootElement = 0
  const lastIndexA = pathA.length - 1
  const lastIndexB = pathB.length - 1

  if (lastIndexA < 0 || lastIndexB < 0) return []

  let cursor = 0

  while (cursor < lastIndexA || cursor < lastIndexB) {
    if (pathA[cursor] !== pathB[cursor]) {
      break
    }

    rootElement = pathA[cursor]

    cursor += 1
  }

  const result = [rootElement, ...pathA.slice(cursor), ...pathB.slice(cursor)]

  return result
}

export default getPathBetweenNodes
