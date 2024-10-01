import { useCallback, useEffect, useRef, useState } from "react"
import SpeechRecognition from "react-speech-recognition"
import { toPng } from "html-to-image"
import { getImage, uploadImage } from "../api/apiService"
import { Comment, CommentData, MockCommentData } from "../interfaces/types"
import { useDispatch, useSelector } from "react-redux"
import {
  setCommentData,
  setInputPosition,
  setInputValue,
  setInputVisible,
  setSelectedRectIndex,
  setViewCommentOnClick,
  setRecentImageUrl,
  setS3ImageUri,
} from "../features/clientFlow/clientFlowSlice"
import { AppDispatch, RootState } from "../store"

export function useDraggableArea(commentMode: boolean) {
  const dispatch = useDispatch<AppDispatch>()
  const {
    inputVisible,
    inputPosition,
    inputValue,
    selectedRectIndex,
    viewCommentOnClick,
    currentQuestion,
    commentData,
    recentImageUrl,
    s3ImageUri
  } = useSelector((state: RootState) => state.clientFlow)

  const [currentRect, setCurrentRect] = useState<Comment | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [endPosition, setEndPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [rectIndex, setRectIndex] = useState<number>(0)
  const [imageUploaded, setImageUploaded] = useState(false)
  const screenshotRef = useRef<HTMLDivElement>(null)
  const devicePixelRatio = window.devicePixelRatio || 1
  const mouseDownIndex = useRef<number>(0)
  const mouseUpIndex = useRef<number>(0)

  useEffect(() => {
    const existingIndex: number = commentData.data.findIndex(
      (item: CommentData) => item.index === currentQuestion
    )
    if (existingIndex === -1) {
      const newCommentData: MockCommentData = {
        ...commentData,
        data: [
          ...commentData.data,
          { index: currentQuestion, commentData: [] },
        ],
      }
      dispatch(setCommentData(newCommentData))
    }
  }, [currentQuestion, commentData, dispatch])

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement
      const inputArea = target.closest(".input-area")
      const viewCommentArea = target.closest("view-comment-area")
      const draggable: HTMLElement | null = target.closest(
        '[data-draggable="true"]'
      )
      if (!draggable) return

      mouseDownIndex.current = Number(draggable.dataset.index)

      if (!viewCommentArea) {
        dispatch(setViewCommentOnClick(false))
      }

      // Click outside input field
      if (!inputArea) {
        if (inputVisible) {
          // there was an input field open
          if (inputValue.trim() !== "") {
            submitComment(inputValue) // Submit if there's text
          } else {
            // Optionally handle empty input cases, e.g., removing an unfinished rectangle
            if (selectedRectIndex != null) {
              const updatedCommentData = {
                ...commentData,
                data: commentData.data.map((item: CommentData) =>
                  item.index === currentQuestion
                    ? {
                        ...item,
                        commentData: item.commentData.filter(
                          (_: any, idx: number) => idx !== selectedRectIndex
                        ),
                      }
                    : item
                ),
              }
              dispatch(setCommentData(updatedCommentData))
            }
          }

          dispatch(setInputVisible(false))
          setCurrentRect(null)
          dispatch(setInputValue(""))
          dispatch(setSelectedRectIndex(null))
        } else {
          // When no input field in open (User about to drag to comment)
          const rect = e.currentTarget.getBoundingClientRect()
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop
          const scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft
          setStartPosition({
            x: e.clientX - rect.left - scrollLeft,
            y: e.clientY - rect.top - scrollTop,
          })
          setEndPosition({
            x: e.clientX - rect.left - scrollLeft,
            y: e.clientY - rect.top - scrollTop,
          })
          setIsDragging(true)
          setCurrentRect(null) // Reset current rectangle
          SpeechRecognition.stopListening()
        }
      }
    },
    [inputVisible, inputValue, setInputVisible, setInputValue, dispatch]
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !startPosition) return

      const target = e.target as Element
      const draggable: HTMLElement | null = target.closest(
        '[data-draggable="true"]'
      )
      if (!draggable) return

      if (commentMode) {
        const containerRect = draggable.getBoundingClientRect()
        const rect = e.currentTarget.getBoundingClientRect()
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft
        const currentX = e.clientX - rect.left - scrollLeft
        const currentY = e.clientY - rect.top - scrollTop
        const width = Math.abs(currentX - startPosition.x)
        const height = Math.abs(currentY - startPosition.y)

        setEndPosition({ x: e.clientX, y: e.clientY })

        if (width > 12 || height > 12) {
          setCurrentRect({
            x: startPosition.x + scrollLeft,
            y: startPosition.y + scrollTop,
            relativePositionLeft: Math.abs(
              containerRect.left - startPosition.x
            ),
            relativePositionTop: Math.abs(containerRect.top - startPosition.y),
            width: width,
            height: height,
            index: rectIndex,
            displayOrder: rectIndex,
            imageUrl: "",
            s3ImageUri: "",
            comment: "",
            lastUpdated: Date.now(),
            commentOnImageIndex: 0,
          })
        }
      } else {
        window.scrollBy(e.movementX, 0)
      }
    },
    [isDragging, startPosition]
  )

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!startPosition || !endPosition) return

      const rect = e.currentTarget.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft
      const target = e.target as Element
      const draggable: HTMLElement | null = target.closest(
        '[data-draggable="true"]'
      )
      const width = Math.abs(endPosition.x - startPosition.x)
      const height = Math.abs(endPosition.y - startPosition.y)
      if (draggable) {
        mouseUpIndex.current = Number(draggable.dataset.index)
      }

      if (!draggable || mouseDownIndex.current !== mouseUpIndex.current) {
        console.error("ERROR: cannot drag across multiple images")
        setCurrentRect(null)
        setIsDragging(false)
        return
      }

      if (
        startPosition &&
        Math.abs(mouseX - startPosition.x) < 12 &&
        Math.abs(mouseY - startPosition.y) < 12
      ) {
        console.error("ERROR: please drag and select a larger area")
      } else if (currentRect && startPosition) {
        takeScreenshot()

        const updatedRectangle: Comment = {
          ...currentRect,
          x: startPosition.x + scrollLeft,
          y: startPosition.y + scrollTop,
          width: width,
          height: height,
          comment: inputValue,
          lastUpdated: Date.now(),
          commentOnImageIndex: mouseUpIndex.current,
        }

        dispatch(
          setCommentData({
            ...commentData,
            data: commentData.data.map((d: CommentData) =>
              d.index === currentQuestion
                ? { ...d, commentData: [...d.commentData, updatedRectangle] }
                : d
            ),
          })
        )

        dispatch(
          setSelectedRectIndex(
            commentData.data[currentQuestion].commentData.length
          )
        )

        dispatch(
          setInputPosition({
            x: e.clientX - e.currentTarget.getBoundingClientRect().left,
            y: e.clientY - e.currentTarget.getBoundingClientRect().top,
          })
        )
        dispatch(setInputVisible(true))
        dispatch(setInputValue("")) // Clear input after setting
        setRectIndex(rectIndex + 1)
      }
      setIsDragging(false)
      setStartPosition(null)
    },
    [
      currentRect,
      inputValue,
      setInputValue,
      commentData,
      rectIndex,
      setRectIndex,
      dispatch,
    ]
  )

  const takeScreenshot = useCallback(async () => {
    if (
      !screenshotRef.current ||
      !currentRect ||
      !startPosition ||
      !endPosition
    )
      return

    const rect = screenshotRef.current.getBoundingClientRect()
    const offsetX =
      (Math.min(startPosition.x, endPosition.x) - rect.left) * devicePixelRatio
    const offsetY =
      (Math.min(startPosition.y, endPosition.y) - rect.top) * devicePixelRatio
    const width =
      Math.abs(endPosition.x - startPosition.x + 4) * devicePixelRatio
    const height =
      Math.abs(endPosition.y - startPosition.y + 4) * devicePixelRatio

    const dataUrl = await toPng(screenshotRef.current)
    const cropCanvas = document.createElement("canvas")
    const ctx = cropCanvas.getContext("2d")
    if (ctx) {
      const img = new Image()
      img.onload = async () => {
        cropCanvas.width = width
        cropCanvas.height = height
        ctx.drawImage(img, offsetX, offsetY, width, height, 0, 0, width, height)
        cropCanvas.toBlob(async (blob) => {
          if (blob) {
            try {
              const data = await uploadImage(blob)
              if (data && data.result && data.result.data && data.result.data.uri) {
                dispatch(setS3ImageUri(data.result.data.uri))
                setImageUploaded(true) // Set the flag when upload is successful

                const imageUrl = await getImage(data.result.data.uri)
                if (imageUrl != "") {
                  dispatch(setRecentImageUrl(imageUrl))
                }
              } else {
                console.error("Error uploading image to S3")
              }
            } catch (error) {
              console.error("Error uploading image to S3:", error)
              setImageUploaded(false)
            }
          }
        }, "image/png")
      }
      img.src = dataUrl
    } else {
      throw new Error("Failed to get drawing context from canvas")
    }
  }, [screenshotRef, currentRect, startPosition, endPosition, devicePixelRatio])

  const submitComment = useCallback(
    (inputValue: string) => {
      if (inputValue.trim() !== "" && selectedRectIndex !== null) {
        // Directly find and update the rectangle in the Redux state
        const updatedCommentData = {
          ...commentData,
          data: commentData.data.map((item: CommentData) => {
            if (item.index === currentQuestion) {
              // Map through the commentData to find and update the specific rectangle
              const updatedCommentData = item.commentData.map(
                (rect: Comment, index: number) => {
                  if (index === selectedRectIndex) {
                    return {
                      ...rect,
                      comment: inputValue,
                      time: Date.now(),
                      imageUrl: recentImageUrl,
                      s3ImageUri: s3ImageUri
                    }
                  }
                  return rect
                }
              )
              return { ...item, commentData: updatedCommentData }
            }
            return item
          }),
        }

        // Dispatch updated comment data to Redux
        dispatch(setCommentData(updatedCommentData))

        // Reset UI related states
        dispatch(setInputVisible(false))
        setCurrentRect(null)
        setImageUploaded(false)
        dispatch(setInputValue("")) // Clear the input field after submitting
      }
    },
    [
      dispatch,
      commentData,
      selectedRectIndex,
      currentQuestion,
      imageUploaded,
      recentImageUrl,
      setInputVisible,
      setCurrentRect,
      setImageUploaded,
      setInputValue,
    ]
  )

  const showInputOnClick = useCallback(
    (index: number) => {
      const rect = commentData.data[currentQuestion].commentData[index]
      if (rect) {
        dispatch(setViewCommentOnClick(false))
        dispatch(
          setInputPosition({
            x: +rect.x + +rect.width,
            y: +rect.y + +rect.height,
          })
        )
        dispatch(setInputVisible(true))
        dispatch(setSelectedRectIndex(index))
        dispatch(setInputValue(rect.comment)) // Set inputValue when an existing rectangle is clicked
      }
    },
    [
      commentData,
      setInputVisible,
      setInputValue,
      setSelectedRectIndex,
      dispatch,
    ]
  )

  return {
    currentRect,
    setCurrentRect,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    inputVisible,
    setInputVisible,
    inputPosition,
    submitComment,
    showInputOnClick,
    inputValue,
    setInputValue,
    selectedRectIndex,
    setSelectedRectIndex,
    screenshotRef,
    commentData,
    viewCommentOnClick,
    setViewCommentOnClick,
    takeScreenshot,
  }
}
