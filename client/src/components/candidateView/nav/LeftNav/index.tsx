import styles from "./styles.module.css"
import { LeftNavProps } from "../../../../interfaces/types"
import DropdownMenu from "../../ui/DropdownMenu"
import toggleMenuIcon from "../../../../../public/toggle-menu-icon.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../store"
import { setCurrentQuestion } from "../../../../features/clientFlow/clientFlowSlice"

export default function LeftNav({ productBrief, questions }: LeftNavProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { currentQuestion } = useSelector(
    (state: RootState) => state.clientFlow
  )

  const [toggleToMinimize, setToggleToMinimize] = useState(false)

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      dispatch(setCurrentQuestion(currentQuestion + 1))
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      dispatch(setCurrentQuestion(currentQuestion - 1))
    }
  }

  const handleSubmit = () => {
    navigate("/submit")
  }

  return (
    <div
      className={`${styles.leftNav} ${
        toggleToMinimize ? styles.leftNavCollapsed : null
      }`}
    >
      <div className={styles.toggleSection}>
        <DropdownMenu />
        <button
          className={`${styles.toggleMenuIcon} ${
            toggleToMinimize ? styles.toggleMenuActive : null
          }`}
          onClick={() => {
            setToggleToMinimize(!toggleToMinimize)
          }}
        >
          <img src={toggleMenuIcon} alt="" />
        </button>
      </div>
      <div className={styles.questions}>
        <div className={styles.questionsSection}>
          <h4>{questions[currentQuestion].question}</h4>
          {questions.length > 0 && (
            <div className={styles.buttonContainer}>
              {currentQuestion !== 0 && (
                <button onClick={handleBack}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.25 13.5L6.75 9L11.25 4.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={
                  currentQuestion === questions.length - 1
                    ? handleSubmit
                    : handleNext
                }
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Test"
                  : "Next"}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 13.5L11.25 9L6.75 4.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        {!toggleToMinimize && (
          <div className={styles.briefSection}>
            <h4>Product Brief</h4>
            <div>
              <h5>Background</h5>
              {productBrief.background.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
            <div>
              <h5>Target Users</h5>
              <ul>
                {productBrief.targetUsers.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Business Goals</h5>
              <ul>
                {productBrief.businessGoals.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Challenges</h5>
              <ul>
                {productBrief.challenges.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {productBrief.research && (
              <div>
                <h5>Past Research</h5>
                <ul>
                  {productBrief.research.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {productBrief.userInfo && (
              <div>
                <h5>User Information</h5>
                <ul>
                  {productBrief.userInfo.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {productBrief.team && (
              <div>
                <h5>Team</h5>
                <p>{productBrief.team.description}</p>
                <ul>
                  {productBrief.team.roles.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
