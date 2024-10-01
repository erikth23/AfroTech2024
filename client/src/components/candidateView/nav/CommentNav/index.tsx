import styles from "./styles.module.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../store"
import {
  setCurrentQuestion,
  setSelectedRectIndex,
  setViewCommentOnClick,
} from "../../../../features/clientFlow/clientFlowSlice"
import { Comment, CommentData } from "../../../../interfaces/types"
import SafeHtml from "../../ui/SafeHtml"

export default function CommentNav({ commentMode }: { commentMode: boolean }) {
  const dispatch = useDispatch<AppDispatch>()
  const { commentData } = useSelector((state: RootState) => state.clientFlow)

  const calculateElapsedMinutes = (startTime: number) => {
    const currentTime = Date.now()
    const elapsedMilliseconds = currentTime - startTime
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60))
    return elapsedMinutes
  }

  function openSelectedComment(index: number, selectedQuestion: number) {
    dispatch(setCurrentQuestion(selectedQuestion))
    dispatch(setSelectedRectIndex(index))
    dispatch(setViewCommentOnClick(true))
  }

  return (
    commentMode && (
      <div className={styles.commentNav}>
        <div className={styles.navHeader}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83333 7.08333H10M5.83333 10H12.5M5.83333 15V16.9463C5.83333 17.3903 5.83333 17.6123 5.92436 17.7263C6.00352 17.8255 6.12356 17.8832 6.25045 17.8831C6.39636 17.8829 6.56973 17.7442 6.91646 17.4668L8.90434 15.8765C9.31043 15.5517 9.51347 15.3892 9.73957 15.2737C9.94017 15.1712 10.1537 15.0963 10.3743 15.051C10.6231 15 10.8831 15 11.4031 15H13.5C14.9001 15 15.6002 15 16.135 14.7275C16.6054 14.4878 16.9878 14.1054 17.2275 13.635C17.5 13.1002 17.5 12.4001 17.5 11V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V11.6667C2.5 12.4416 2.5 12.8291 2.58519 13.147C2.81635 14.0098 3.49022 14.6836 4.35295 14.9148C4.67087 15 5.05836 15 5.83333 15Z"
              stroke="#101828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4>Your Comments</h4>
        </div>

        <div className={styles.allComments}>
          {commentData.data &&
            commentData.data.map((entry: CommentData, index: number) => {
              return (
                commentData.data[index]?.commentData?.length > 0 && (
                  <div key={index} className={styles.commentModule}>
                    {/* <h4>Question {entry.index + 1}:</h4> */}
                    {entry.commentData.map(
                      (comment: Comment, innerIndex: number) => (
                        <div
                          key={innerIndex}
                          className={styles.commentEntry}
                          onClick={() => openSelectedComment(innerIndex, index)}
                        >
                          {comment.imageUrl && (
                            <div className={styles.imgAndTimeContainer}>
                              <div className={styles.imageDiv}>
                                <img src={comment.imageUrl} alt="" />
                              </div>
                              <p className={styles.elapsedTime}>
                                {calculateElapsedMinutes(comment.lastUpdated)}{" "}
                                minutes ago
                              </p>
                            </div>
                          )}
                          <p className={styles.comment}>
                            <SafeHtml htmlString={comment.comment} />
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )
              )
            })}
        </div>
      </div>
    )
  )
}
