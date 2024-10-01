import { useEffect, useState } from "react"
import { LeaderboardDataType } from "../../interfaces/types"
import styles from "./styles.module.css"
import { fetchLeaderboardData } from "../../api/apiService"
import LoadingIndicator from "../../components/candidateView/ui/LoadingIndicator"

export default function LeaderboardPage() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAndSortLeaderboardData = async () => {
      try {
        const result = await fetchLeaderboardData()
        const sortedData = result.sort(
          (a: LeaderboardDataType, b: LeaderboardDataType) =>
            b.scores.totalScore - a.scores.totalScore
        )
        setData(sortedData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
      }
    }

    fetchAndSortLeaderboardData()
  }, [])

  return (
    <div className={styles.leaderboardPage}>
      <div className={styles.leaderboardPageContainer}>
        <div className={styles.header}>
          <span onClick={() => (window.location.href = "/")}>
            <img
              className="logo"
              src="/DesignScout-Main-Logo.png"
              alt="design scout logo"
            />
          </span>
          <button
            className="primary size-md"
            onClick={() => (window.location.href = "/")}
          >
            Take the test
          </button>
        </div>
        <h1>Leaderboard</h1>
        <p>See how people around the whole have performed on this test.</p>
        <div className={styles.leaderboardTableContainer}>
          {isLoading ? (
            <div>
              <LoadingIndicator text="Fetching scores" />
            </div>
          ) : (
            <table className={styles.leaderboardTable}>
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Seniority</th>
                  <th>Company</th>
                  <th>Country</th>
                  {/* <th>Attempted On</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((item: LeaderboardDataType, index: number) => (
                  <tr
                    key={index}
                    className={index < 5 ? styles.topScoreRows : ""}
                  >
                    <td className={styles.scoreTooltip}>
                      <div
                        className={`${index < 5 ? styles.topTotalScore : ""} ${
                          styles.totalScore
                        }`}
                      >
                        {item.scores.totalScore}
                      </div>
                      {
                        <div className={styles.tooltip}>
                          <ul>
                            <li>
                              Design Strategy: {item.scores.designStrategy}
                            </li>
                            <li>
                              Problem Solving: {item.scores.problemSolving}
                            </li>
                            <li>
                              Customer-Centric: {item.scores.customerCentric}
                            </li>
                          </ul>
                        </div>
                      }
                    </td>
                    <td>{item.preferredFirstName}</td>
                    <td>{item.role}</td>
                    <td>{item.seniority}</td>
                    <td>{item.currentCompany}</td>
                    <td>{item.selectedCountry}</td>
                    {/* <td>{formatDate(item.lastUpdated)}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
