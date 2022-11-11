import { RootState } from "store"

export const activeNodesSelector = ({ treeReducer }: RootState) => treeReducer.activeNodes
export const activeLeafSelector = ({ treeReducer }: RootState) => treeReducer.activeLeaf
export const activePathSelector = ({ treeReducer }: RootState) => treeReducer.activePaths
export const selectModeSelector = ({ treeReducer }: RootState) => treeReducer.selectMode

export const activeItemsPathSelector = ({ treeReducer: { activePaths } }: RootState) => {
  const firstArray = activePaths?.[0] || []
  const secondArray = activePaths?.[1] || []

  const firstArrayLastIndex = firstArray.length - 1
  const secondArrayLastIndex = secondArray.length - 1

  const result = [
    firstArray[firstArrayLastIndex] || null,
    secondArray[secondArrayLastIndex] || null,
  ].filter((item) => item !== null)

  return result.length ? result : null
}
