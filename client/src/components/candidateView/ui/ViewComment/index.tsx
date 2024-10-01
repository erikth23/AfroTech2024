import { useState } from "react"
import styles from "./styles.module.css"
import { useDraggableArea } from "../../../../hooks/useDraggableArea"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../store"
import { setCommentData } from "../../../../features/clientFlow/clientFlowSlice"
import { CommentData } from "../../../../interfaces/types"
import SafeHtml from "../SafeHtml"

export default function ViewComment({
  index,
  data,
  commentMode,
}: {
  index: number
  data: any
  commentMode: boolean
}) {
  const dispatch = useDispatch<AppDispatch>()
  const { currentQuestion, commentData } = useSelector(
    (state: RootState) => state.clientFlow
  )

  const [openCrudOptions, setOpenCrudOptions] = useState(false)

  const { showInputOnClick } = useDraggableArea(commentMode)

  function editComment(index: number) {
    showInputOnClick(index)
  }

  function deleteComment(index: number) {
    // Create a new array that excludes the comment at the given index
    const updatedCommentData = commentData.data.map((item: CommentData) => {
      if (item.index === currentQuestion) {
        return {
          ...item,
          commentData: item.commentData.filter(
            (_: any, idx: number) => idx !== index
          ),
        }
      }
      return item
    })

    // Dispatch the updated comment data to the Redux store
    dispatch(
      setCommentData({
        ...commentData,
        data: updatedCommentData,
      })
    )
  }

  return (
    <div className={styles.viewComment}>
      <div className={styles.topBar}>
        <p>Your response</p>
        <svg
          onClick={() => setOpenCrudOptions(!openCrudOptions)}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {openCrudOptions && (
        <div className={styles.crudOptions}>
          <p onClick={() => editComment(index)}>Edit</p>
          <p onClick={() => deleteComment(index)}>Delete</p>
        </div>
      )}
      <p className={styles.comment}>
        <SafeHtml htmlString={data.comment} />
      </p>
    </div>
  )
}
