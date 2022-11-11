import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NodeIdType, NodeIdsType, PreparedNodeType } from "types/TreeTypes"
import getChildIds from "utils/getChilds"
import getPathBetweenNodes from "utils/getPathBetweenNodes"

export type TreeStateType = {
  activeNodes: NodeIdsType
  activeLeaf: NodeIdType | null
  activePaths: NodeIdsType[] | null
}

const initialState: TreeStateType = {
  activeNodes: [],
  activeLeaf: null,
  activePaths: null,
}

type SetActiveLeaftType = PayloadAction<{ id: NodeIdType; path: NodeIdsType }>

const treeSlice = createSlice({
  name: "treeSlice",
  initialState,
  reducers: {
    setActiveNodes(state, { payload }: PayloadAction<PreparedNodeType>) {
      state.activePaths = null
      state.activeLeaf = null

      if (payload.id === state.activeNodes[0]) {
        state.activeNodes = []
        return
      }

      const ids = getChildIds(payload)
      state.activeNodes = [payload.id, ...ids]
    },

    setActiveLeaf(state, { payload }: SetActiveLeaftType) {
      state.activePaths = null

      if (payload.id === state.activeLeaf) {
        state.activeLeaf = null
        state.activeNodes = []
        return
      }

      state.activeLeaf = payload.id
      state.activeNodes = payload.path
    },

    setActivePaths(state, { payload }: PayloadAction<NodeIdsType>) {
      state.activeLeaf = null

      const perevState = state.activePaths
      const newState = perevState ? [payload, perevState[0]] : [payload]
      state.activePaths = newState

      if (newState?.length === 2) {
        state.activeNodes = getPathBetweenNodes(newState[0], newState[1])
        return
      }

      if (newState?.length === 1) {
        state.activeNodes = newState[0]
      }
    },
  },
})

export const { setActiveNodes, setActiveLeaf, setActivePaths } =
  treeSlice.actions

export default treeSlice.reducer
