import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

export default function WelcomePage() {
  const navigate = useNavigate()

  function navigateToLeaderboardPage() {
    navigate("/leaderboard")
  }

  function navigateToAboutYouPage() {
    navigate("/aboutYou")
  }

  return (
    <div className={styles.welcomePage}>
      <span onClick={() => (window.location.href = "/")}>
        <img
          className="logo"
          src="/DesignScout-Main-Logo.png"
          alt="design scout logo"
        />
      </span>
      <h1 className="h1">Welcome to DesignScout</h1>
      <div className={styles.welcomeVideoContainer}>
        <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/GWylUENAxEY?si=LKmitjHjnOly4mNL"
            title="DesignScout: Instructions"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={navigateToLeaderboardPage}
          className="secondary size-md"
        >
          Check leaderboard
        </button>
        <button onClick={navigateToAboutYouPage} className="primary size-md">
          Next
        </button>
      </div>
    </div>
  )
}
