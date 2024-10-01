import styles from "./styles.module.css"
import { recruiterProfileResponse } from "../../mockData/recruiterProfileResponse"
import { useNavigate } from "react-router-dom"

export default function TestDashboardPage() {
  const navigate = useNavigate()

  function openInstructionsPage(assessmentId: string) {
    navigate(`/instructions/${assessmentId}`)
  }

  return (
    <div className={styles.assessmentsPage}>
      <div className={styles.headerSection}>
        <h1>Assessments</h1>
        <p className="smallText faded">
          Pick a test you'd like to evaluate yourself on.
        </p>
      </div>
      <div className={styles.activeAssessmentsSection}>
        <div className={styles.assessmentsContainer}>
          {recruiterProfileResponse.assessmentsList.activeAssessments.map(
            (assessmentInfo: any) => (
              <div
                key={assessmentInfo.index}
                className={styles.assessmentInfoCard}
              >
                <div className={styles.cardHeaderSection}>
                  <div className={styles.headingRow}>
                    <h3>{assessmentInfo.title}</h3>
                    <div className={styles.tag}>{assessmentInfo.tags}</div>
                  </div>
                  <p className="smallText">
                    {assessmentInfo.teamName} | {assessmentInfo.organization}
                  </p>
                </div>
                <div className={styles.cardFooterSection}>
                  <button
                    className={styles.smallRoundButton}
                    onClick={() =>
                      openInstructionsPage(assessmentInfo.assessmentId)
                    }
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 9L15 9M15 9L10.5 4.5M15 9L10.5 13.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
