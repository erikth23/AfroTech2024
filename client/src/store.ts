import { configureStore } from "@reduxjs/toolkit"
import appStateReducer from "./features/appState/appStateSlice"
import clientFlowReducer from "./features/clientFlow/clientFlowSlice"

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    clientFlow: clientFlowReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
