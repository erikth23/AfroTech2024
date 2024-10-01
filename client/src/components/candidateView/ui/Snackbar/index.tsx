import React, { useState, useEffect } from "react"
import styles from "./styles.module.css"

interface SnackbarProps {
  type: "success" | "error" | "warning"
  message: string
  duration?: number // duration in seconds
  closeButton?: boolean
}

const Snackbar: React.FC<SnackbarProps> = ({
  type,
  message,
  duration = 5,
  closeButton = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
    const timer = setTimeout(() => {
      setIsOpen(false)
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [message, duration])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className={`${styles.snackbar} ${styles[type]}`}>
      <span className={styles.messagePart}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9V13M12 16V16.01M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {message}
      </span>
      {closeButton && (
        <button
          onClick={handleClose}
          style={{ marginLeft: "20px", cursor: "pointer" }}
        >
          x
        </button>
      )}
    </div>
  )
}

export default Snackbar
