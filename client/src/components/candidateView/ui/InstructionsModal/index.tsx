import React from "react"
import styles from "./styles.module.css"
import { rubricCriteria } from "../../../../mockData/rubricCriteria"

interface InstructionsModalProps {
  isOpen: boolean
  onClose: () => void
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>Instructions</h2>

        <div className={styles.instructionVideoContainer}>
          <iframe
            width="400"
            height="245"
            src="https://www.youtube.com/embed/GWylUENAxEY?si=LKmitjHjnOly4mNL"
            title="DesignScout: Instructions"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <h3>Assessment skills criteria</h3>

        <div className={styles.rubricCriteria}>
          {rubricCriteria.map((rubric, index) => (
            <div key={index} className={styles.rubricCard}>
              <p className={styles.rubricHeading}>{rubric.heading}</p>
              <div>
                <p className={styles.definitionLabel}>Definition:</p>
                <p>{rubric.definition}</p>
              </div>
              <div>
                <p className={styles.criteriaLabel}>Criteria:</p>
                <ul className={styles.criteria}>
                  {rubric.criteria.map((criterion, index) => (
                    <li key={index} className={styles.criterion}>
                      <strong>{criterion.subHeading}: </strong>
                      {criterion.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InstructionsModal
