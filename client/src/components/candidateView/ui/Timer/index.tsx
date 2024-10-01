import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom"

export default function Timer({ timerMinutes }: { timerMinutes: number }) {
  const timeLimit = timerMinutes * 60
  const navigate = useNavigate()
  const [secondsLeft, setSecondsLeft] = useState(timeLimit)

  useEffect(() => {
    const timerId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => {
        if (prevSecondsLeft <= 0) {
          clearInterval(timerId)
          navigate("/submit")
          return 0
        }
        return prevSecondsLeft - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div className={styles.timer}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.53 3.47032C6.67045 3.61094 6.74934 3.80157 6.74934 4.00032C6.74934 4.19907 6.67045 4.38969 6.53 4.53032L4.03 7.03032C3.88782 7.1628 3.69978 7.23492 3.50548 7.23149C3.31118 7.22806 3.12579 7.14935 2.98838 7.01194C2.85096 6.87453 2.77225 6.68914 2.76882 6.49484C2.7654 6.30054 2.83752 6.11249 2.97 5.97032L5.47 3.47032C5.61062 3.32987 5.80125 3.25098 6 3.25098C6.19875 3.25098 6.38937 3.32987 6.53 3.47032Z"
          fill="#7C5AFF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 4.5C9.74566 4.5 7.58365 5.39553 5.98959 6.98959C4.39553 8.58365 3.5 10.7457 3.5 13C3.5 15.2543 4.39553 17.4164 5.98959 19.0104C7.58365 20.6045 9.74566 21.5 12 21.5C14.2543 21.5 16.4164 20.6045 18.0104 19.0104C19.6045 17.4164 20.5 15.2543 20.5 13C20.5 10.7457 19.6045 8.58365 18.0104 6.98959C16.4164 5.39553 14.2543 4.5 12 4.5ZM12.75 8C12.75 7.80109 12.671 7.61032 12.5303 7.46967C12.3897 7.32902 12.1989 7.25 12 7.25C11.8011 7.25 11.6103 7.32902 11.4697 7.46967C11.329 7.61032 11.25 7.80109 11.25 8V13C11.2499 13.1272 11.2822 13.2522 11.3438 13.3635C11.4054 13.4748 11.4942 13.5685 11.602 13.636L14.602 15.511C14.7707 15.6166 14.9744 15.6508 15.1683 15.6062C15.2643 15.584 15.355 15.5433 15.4353 15.4861C15.5155 15.4289 15.5837 15.3565 15.636 15.273C15.6883 15.1895 15.7236 15.0965 15.7399 14.9993C15.7562 14.9022 15.7533 14.8027 15.7312 14.7067C15.709 14.6107 15.6683 14.52 15.6111 14.4397C15.5539 14.3595 15.4815 14.2913 15.398 14.239L12.75 12.584V8Z"
          fill="#7C5AFF"
        />
        <path
          d="M17.47 4.52985C17.3375 4.38767 17.2654 4.19963 17.2688 4.00532C17.2723 3.81102 17.351 3.62564 17.4884 3.48822C17.6258 3.35081 17.8112 3.2721 18.0055 3.26867C18.1998 3.26524 18.3878 3.33737 18.53 3.46985L21.03 5.96985C21.1625 6.11202 21.2346 6.30007 21.2312 6.49437C21.2277 6.68867 21.149 6.87406 21.0116 7.01147C20.8742 7.14888 20.6888 7.22759 20.4945 7.23102C20.3002 7.23445 20.1122 7.16233 19.97 7.02985L17.47 4.52985Z"
          fill="#7C5AFF"
        />
      </svg>
      {formatTime(secondsLeft)}
    </div>
  )
}
