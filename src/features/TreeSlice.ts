import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NodeIdType, NodeIdsType, PreparedNodeType } from "types/TreeTypes"
import getChildIds from "utils/getChilds"
import getPathBetweenNodes from "utils/getPathBetweenNodes"

export type SelectModeType = "path" | "leaf" | "node"

export type TreeStateType = {
  activeNodes: NodeIdsType
  activeLeaf: NodeIdType | null
  activePaths: {
    a: NodeIdsType | null
    b: NodeIdsType | null
  } | null
  selectMode: SelectModeType
}

const initialState: TreeStateType = {
  activeNodes: [],
  activeLeaf: null,
  activePaths: null,
  selectMode: "node",
}

type SetActiveLeaftType = PayloadAction<{ id: NodeIdType; path: NodeIdsType }>

const treeSlice = createSlice({
  name: "treeSlice",
  initialState,
  reducers: {
    setActiveNodes(state, { payload }: PayloadAction<PreparedNodeType>) {
      state.selectMode = "node"
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
      state.selectMode = "leaf"
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
      state.selectMode = "path"
      state.activeLeaf = null

      if (state.activePaths?.a) {
        const oldState = state.activePaths.a
        state.activeNodes = getPathBetweenNodes(oldState, payload)
        state.activePaths.a = payload
        state.activePaths.b = oldState
        return
      }

      state.activePaths = {
        a: payload,
        b: null,
      }
      state.activeNodes = payload
    },
  },
})

export const { setActiveNodes, setActiveLeaf, setActivePaths } = treeSlice.actions

export default treeSlice.reducer
