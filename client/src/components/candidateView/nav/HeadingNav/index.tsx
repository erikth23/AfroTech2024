import styles from "./styles.module.css"

export default function HeadingNav({
  assessmentName,
}: {
  assessmentName: string
}) {
  return <div className={styles.headingNav}>{assessmentName}</div>
}
