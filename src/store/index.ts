import { combineReducers, configureStore } from "@reduxjs/toolkit"
import treeReducer from "features/TreeSlice"

const rootReducer = combineReducers({
  treeReducer,
})

const setupStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]

export default setupStore
