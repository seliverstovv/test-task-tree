import { RootState } from "store"

export const activeNodes = (state: RootState) => state.treeReducer.activeNodes
export const activeLeaf = (state: RootState) => state.treeReducer.activeLeaf
export const activePath = (state: RootState) => state.treeReducer.activePaths

export const activeItemsPathSelector = ({
  treeReducer: { activePaths },
}: RootState) => {
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

export type ActiveItemsPathType = ReturnType<typeof activeItemsPathSelector>
