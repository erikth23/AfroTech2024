import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MockCommentData } from "../../interfaces/types"

interface ClientState {
  userData: {
    preferredName: string
    email: string
    role: any
    seniority: any
    currentCompany: string
    selectedCountry: any
  }
  inputVisible: boolean
  inputValue: string
  inputPosition: { x: number; y: number }
  selectedRectIndex: number | null
  viewCommentOnClick: boolean
  currentQuestion: number
  commentData: MockCommentData
  s3ImageUri: string
  recentImageUrl: string
}

const initialState: ClientState = {
  userData: {
    preferredName: "",
    email: "",
    role: "",
    seniority: "",
    currentCompany: "",
    selectedCountry: "",
  },
  inputVisible: false,
  inputValue: "",
  inputPosition: { x: 0, y: 0 },
  selectedRectIndex: null,
  viewCommentOnClick: false,
  currentQuestion: 0,
  commentData: {
    lastUpdated: Date.now(),
    devicePixelRatio: 1,
    displayDimensions: {
      width: 1920,
      height: 1080,
    },
    data: [],
  },
  s3ImageUri: "",
  recentImageUrl: "",
}

const clientFlowSlice = createSlice({
  name: "clientFlow",
  initialState,
  reducers: {
    setUserData(
      state: ClientState,
      action: PayloadAction<{
        preferredName: string
        email: string
        role: any
        seniority: any
        currentCompany: string
        selectedCountry: any
      }>
    ) {
      state.userData = action.payload
    },
    setInputVisible(state: ClientState, action: PayloadAction<boolean>) {
      state.inputVisible = action.payload
    },
    setInputValue(state: ClientState, action: PayloadAction<string>) {
      state.inputValue = action.payload
    },
    setInputPosition(
      state: ClientState,
      action: PayloadAction<{ x: number; y: number }>
    ) {
      state.inputPosition = action.payload
    },
    setSelectedRectIndex(
      state: ClientState,
      action: PayloadAction<number | null>
    ) {
      state.selectedRectIndex = action.payload
    },
    setViewCommentOnClick(state: ClientState, action: PayloadAction<boolean>) {
      state.viewCommentOnClick = action.payload
    },
    setCurrentQuestion(state: ClientState, action: PayloadAction<number>) {
      state.currentQuestion = action.payload
    },
    setCommentData(state: ClientState, action: PayloadAction<MockCommentData>) {
      state.commentData = action.payload
    },
    setS3ImageUri(state: ClientState, action: PayloadAction<string>) {
      state.s3ImageUri = action.payload
    },
    setRecentImageUrl(state: ClientState, action: PayloadAction<string>) {
      state.recentImageUrl = action.payload
    },
  },
})

export const {
  setUserData,
  setInputVisible,
  setInputValue,
  setInputPosition,
  setSelectedRectIndex,
  setViewCommentOnClick,
  setCurrentQuestion,
  setCommentData,
  setS3ImageUri,
  setRecentImageUrl,
} = clientFlowSlice.actions

export default clientFlowSlice.reducer
