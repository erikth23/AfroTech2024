import styles from "./styles.module.css"

interface LoadingIndicatorProps {
  text?: string
}

export default function LoadingIndicator({ text }: LoadingIndicatorProps) {
  return (
    <div className={styles.loadingIndicator}>
      <div className={styles.spinner}></div>
      {text && <div className={styles.loadingText}>{text}</div>}
    </div>
  )
}
