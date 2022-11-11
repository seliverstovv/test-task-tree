import { createSlice } from "@reduxjs/toolkit"

export type TreeStateType = {
  test: string
}

const initialState = {
  test: "",
}

const treeSlice = createSlice({
  name: "treeSlice",
  initialState,
  reducers: {},
})

export default treeSlice.reducer
