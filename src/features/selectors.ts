import { RootState } from "store"

export const activeNodesSelector = ({ treeReducer }: RootState) => treeReducer.activeNodes
export const activeLeafSelector = ({ treeReducer }: RootState) => treeReducer.activeLeaf
export const activeModeSelector = ({ treeReducer }: RootState) => treeReducer.activeMode

export const activePathSelector = ({ treeReducer: { activePaths } }: RootState) => {
  const firstArray = activePaths?.a || []
  const secondArray = activePaths?.b || []

  const firstArrayLastIndex = firstArray.length - 1
  const secondArrayLastIndex = secondArray.length - 1

  const result = [
    firstArray[firstArrayLastIndex] || null,
    secondArray[secondArrayLastIndex] || null,
  ].filter((item) => item !== null)

  return result.length ? result : null
}

export type ActiveNodesType = ReturnType<typeof activeNodesSelector>
export type ActiveLeafType = ReturnType<typeof activeLeafSelector>
export type ActiveModeType = ReturnType<typeof activeModeSelector>
export type ActivePathType = ReturnType<typeof activePathSelector>
