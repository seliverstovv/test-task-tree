import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "store"

export const activeNodes = (state: RootState) => state.treeReducer.activeNodes
export const activeLeaf = (state: RootState) => state.treeReducer.activeLeaf
export const activePath = (state: RootState) => state.treeReducer.activePaths

export const activePathFirstItemsSelector = createSelector(
  activePath,
  (state) => {
    const firstArray = state?.[0] || []
    const secondArray = state?.[1] || []

    const firstArrayLastIndex = firstArray.length - 1
    const secondArrayLastIndex = secondArray.length - 1

    const result = [
      firstArray[firstArrayLastIndex] || null,
      secondArray[secondArrayLastIndex] || null,
    ].filter((item) => item !== null)

    return result.length ? result : null
  }
)

export type ActivePathElementsType = ReturnType<
  typeof activePathFirstItemsSelector
>
