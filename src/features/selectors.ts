import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "store"

export const activeNodesSelector = ({ treeReducer }: RootState) => treeReducer.activeNodes
export const activeLeafSelector = ({ treeReducer }: RootState) => treeReducer.activeLeaf
export const activeModeSelector = ({ treeReducer }: RootState) => treeReducer.activeMode
export const activePathSelector = ({ treeReducer }: RootState) => treeReducer.activePaths

export const activePathLeafSelector = createSelector([activePathSelector], (activePaths) => {
  const leafA = activePaths?.a?.select || null
  const leafB = activePaths?.b?.select || null

  const result = [leafA, leafB]

  return result
})

export type ActiveNodesType = ReturnType<typeof activeNodesSelector>
export type ActiveLeafType = ReturnType<typeof activeLeafSelector>
export type ActiveModeType = ReturnType<typeof activeModeSelector>
export type ActivePathType = ReturnType<typeof activePathLeafSelector>
