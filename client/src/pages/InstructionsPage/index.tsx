import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import { rubricCriteria } from "../../mockData/rubricCriteria"
import { RootState } from "../../store"
import { useSelector } from "react-redux"

export default function InstructionsPage() {
  const navigate = useNavigate()
  const { userData } = useSelector((state: RootState) => state.clientFlow)

  function navigateToTestPage() {
    navigate("/assessment")
  }

  function getFirstName() {
    const firstName = userData.preferredName.trim().split(/\s+/)[0]
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
  }

  return (
    <div className={styles.instructionsPage}>
      <div className={styles.messageSection}>
        <span onClick={() => (window.location.href = "/")}>
          <img
            className="logo"
            src="/DesignScout-Main-Logo.png"
            alt="design scout logo"
          />
        </span>
        <h1>Hello {getFirstName()}!</h1>
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
        <h3>Before you start the assessment</h3>
        <p>
          This tutorial video provides an overview of what to expect from the
          DesignScout assessment. Watch this brief guide to ensure you're fully
          prepared to demonstrate your best work.
        </p>
        <div className={styles.timeLimitCard}>
          <div>
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16.5" r="16" fill="#333333" />
              <path
                d="M16 24C20.1421 24 23.5 20.6421 23.5 16.5C23.5 12.3579 20.1421 9 16 9C11.8579 9 8.5 12.3579 8.5 16.5C8.5 20.6421 11.8579 24 16 24Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 12V16.5L19 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.limitText}>
            <strong>
              <p>25 minutes time limit</p>
            </strong>
            <p>You will be unable to pause the test, once started.</p>
          </div>
        </div>

        <button
          className="primary size-md"
          onClick={() => navigateToTestPage()}
        >
          Start the assessment
        </button>
      </div>
      <div className={styles.rubricSection}>
        <h3>Assessment skills criteria</h3>
        <p>
          Before starting the assessment, please review the key skills that will
          be evaluated. These criteria will guide how your work will be assessed
          and provide clarity on what we are looking for.
        </p>
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
