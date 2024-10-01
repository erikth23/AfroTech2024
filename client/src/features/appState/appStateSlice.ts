import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AppState {
  currentScale: number
}

const initialState: AppState = {
  currentScale: 100,
}

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setCurrentScale(state, action: PayloadAction<number>) {
      state.currentScale = action.payload
    },
  },
})

export const { setCurrentScale } = appStateSlice.actions
export default appStateSlice.reducer
