import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NodeIdType, NodeIdsType, PreparedNodeType } from "types/TreeTypes"
import getChildIds from "utils/getChilds"
import getPathBetweenNodes from "utils/getPathBetweenNodes"

export type SelectModeType = "path" | "leaf" | "node"

type SelectPathType = { select: NodeIdType; path: NodeIdsType }

export type TreeStateType = {
  activeNodes: NodeIdsType
  activeLeaf: NodeIdType | null
  activePaths: {
    a: SelectPathType | null
    b: SelectPathType | null
  } | null
  activeMode: SelectModeType
}

const initialState: TreeStateType = {
  activeNodes: [],
  activeLeaf: null,
  activePaths: null,
  activeMode: "node",
}

type SetActiveLeaftType = PayloadAction<{ id: NodeIdType; path: NodeIdsType }>

const treeSlice = createSlice({
  name: "treeSlice",
  initialState,
  reducers: {
    setActiveNodes(state, { payload }: PayloadAction<PreparedNodeType>) {
      state.activeMode = "node"
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
      state.activeMode = "leaf"
      state.activePaths = null

      if (payload.id === state.activeLeaf) {
        state.activeLeaf = null
        state.activeNodes = []
        return
      }

      state.activeLeaf = payload.id
      state.activeNodes = payload.path
    },

    setActivePaths(state, { payload }: PayloadAction<SelectPathType>) {
      state.activeMode = "path"
      state.activeLeaf = null

      if (state.activePaths?.a && !state.activePaths?.b) {
        const oldStateA = state.activePaths.a

        if (oldStateA.select === payload.select) {
          state.activePaths.a = null
          state.activeNodes = []
          return
        }

        state.activeNodes = getPathBetweenNodes(oldStateA.path, payload.path)
        state.activePaths.a = payload
        state.activePaths.b = oldStateA
        return
      }

      if (state.activePaths?.a && state.activePaths?.b) {
        const oldStateA = state.activePaths.a
        const oldStateB = state.activePaths.b

        if (oldStateA.select === payload.select) {
          state.activeNodes = state.activePaths.b.path
          state.activePaths.a = state.activePaths.b
          state.activePaths.b = null
          return
        }

        if (oldStateB.select === payload.select) {
          state.activePaths.b = null
          state.activeNodes = state.activePaths.a.path
          return
        }

        state.activeNodes = getPathBetweenNodes(oldStateA.path, payload.path)
        state.activePaths.a = payload
        state.activePaths.b = oldStateA
        return
      }

      state.activePaths = {
        a: payload,
        b: null,
      }
      state.activeNodes = payload.path
    },
  },
})

export const { setActiveNodes, setActiveLeaf, setActivePaths } = treeSlice.actions

export default treeSlice.reducer
