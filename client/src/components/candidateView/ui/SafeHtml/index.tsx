import DOMPurify from "dompurify"
import styles from "./styles.module.css"

const SafeHtml = ({ htmlString }: { htmlString: string }) => {
  const safeHtml = DOMPurify.sanitize(htmlString)

  return (
    <div
      className={styles.safeHtml}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}

export default SafeHtml
