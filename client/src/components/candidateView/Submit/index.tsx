import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { useEffect, useRef, useState } from "react"
import { submitTestResponses } from "../../../api/apiService"
import {
  EvaluationCriteriaType,
  EvaluationResponseType,
} from "../../../interfaces/types"
import LoadingIndicator from "../ui/LoadingIndicator"

export default function Submit() {
  const navigate = useNavigate()
  const { userData, commentData } = useSelector(
    (state: RootState) => state.clientFlow
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [evaluationResponse, setEvaluationResponse] =
    useState<EvaluationResponseType | null>(null)
  const hasSubmitted = useRef(false)

  useEffect(() => {
    const submitData = async () => {
      const payload = assemblePayloadForEvaluation()

      if (payload.comments.length === 0) {
        const emptyData: EvaluationResponseType = {
          overallScore: 0,
          overallComment: "-",
          specificCriteria: [
            { criteria: "-", score: 0, positives: "-", negatives: "-" },
          ],
        }
        setIsLoading(false)
        setEvaluationResponse(emptyData)
        throw console.error("No comments submitted")
      }

      try {
        const result = await submitTestResponses(payload)
        setEvaluationResponse(result.data.evaluation)
        setIsLoading(false)
      } catch (error) {
        console.error("Error submitting test responses", error)
      }
    }

    if (!hasSubmitted.current) {
      submitData()
      hasSubmitted.current = true
    }
  }, [navigate])

  const assemblePayloadForEvaluation = () => {
    const comments = commentData.data.flatMap((item) =>
      item.commentData.map((comment) => ({
        imageS3Uri: comment.s3ImageUri?.length
          ? comment.s3ImageUri
          : "https://designscout-images.s3.us-east-2.amazonaws.com/IMG_1054.PNG",
        questionId: item.index?.toString() || 0,
        displayOrder: comment.displayOrder?.toString() || 0,
        indexOfImageCommentedOn: comment.commentOnImageIndex || 0,
        createdAt: comment.lastUpdated?.toString() || new Date().toISOString(),
        comment: comment.comment,
      }))
    )

    return {
      email: userData.email,
      createdAt: commentData.lastUpdated.toString(),
      comments: comments,
      userData: {
        preferredName: userData.preferredName?.trim() || "-",
        role: userData.role?.trim() || "-",
        seniority: userData.seniority?.trim() || "-",
        currentCompany: userData.currentCompany?.trim() || "-",
        country: userData.selectedCountry?.trim() || "-",
      },
    }
  }

  function navigateToLeaderboardPage() {
    navigate("/leaderboard")
  }

  return (
    <div className={styles.submitPage}>
      <div className={styles.messageSection}>
        <span onClick={() => (window.location.href = "/")}>
          <img
            className="logo"
            src="/DesignScout-Main-Logo.png"
            alt="design scout logo"
          />
        </span>
        <h1>Submitted! 🎉</h1>
        <p>
          {isLoading
            ? "Your results will be ready soon. It may take up to 1 minute."
            : "Thank you for taking our assessment. Please take some time to leave feedback."}
        </p>

        {!isLoading && (
          <div className={styles.submitPageButtonContainer}>
            <button
              className="primary size-md"
              onClick={() =>
                window.open("https://forms.gle/Ue8vuHysc7aPehud9", "_blank")
              }
            >
              Take Our Survey
            </button>
            <button
              className="secondary size-md"
              onClick={() => navigateToLeaderboardPage()}
            >
              View Leaderboard
            </button>
          </div>
        )}
      </div>
      <div className={styles.evaluationSection}>
        {isLoading ? (
          <div className={styles.loadingSection}>
            <LoadingIndicator text="Analyzing your solutions" />
          </div>
        ) : (
          evaluationResponse && (
            <div className={styles.evaluationCriteria}>
              <div className={styles.totalScoreContainer}>
                <div className={styles.totalScoreComments}>
                  <h4>Overall Score:</h4>
                  <p>{evaluationResponse.overallComment}</p>
                </div>
                <p className={styles.totalScore}>
                  {evaluationResponse.overallScore}
                </p>
              </div>
              {evaluationResponse.specificCriteria?.map(
                (criteria: EvaluationCriteriaType, index: number) => {
                  return (
                    <div key={index} className={styles.evaluationCriteriaCard}>
                      <div className={styles.scoreSubHeader}>
                        <h4>{criteria.criteria}</h4>
                        <p>{criteria.score}</p>
                      </div>
                      <div className={styles.scoreComment}>
                        <p>
                          <strong>What You did Well: </strong>
                          {criteria.positives}
                        </p>
                        <p>
                          <strong>Areas for Improvement: </strong>
                          {criteria.negatives}
                        </p>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
